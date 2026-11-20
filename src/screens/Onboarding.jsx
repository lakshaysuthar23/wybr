import React, { useEffect, useState } from 'react'
import { supabase, isLive } from '../lib/supabase.js'
import { INTENTS, INTERESTS, AXES, USERS, MONTHS, daysIn, ageOf } from '../data.js'
import { Wordmark, Icon, Progress, Face, useTween, Chip, Seg, Wheel } from '../ui.jsx'

const N = 8
const enter = (fn, ok) => (e) => { if (e.key === 'Enter') { e.preventDefault(); if (ok) fn() } }
function Shell({ i, back, children }) {
  return (
    <div className="scroll">
      {i > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 10px 4px' }}>
          <button className="iconbtn" onClick={back} aria-label="Back" style={back ? undefined : { visibility: 'hidden' }}><Icon name="back" /></button>
          <div style={{ flex: 1 }}><Progress p={i / N} /></div><span style={{ width: 20 }} />
        </div>
      )}
      <div className="pad" style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export default function Onboarding({ s, set }) {
  const [otp, setOtp] = useState('')
  const [scan, setScan] = useState('idle')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [conf, setConf] = useState(false)
  const phoneRef = React.useRef(null), otpRef = React.useRef(null), nameRef = React.useRef(null)
  useEffect(() => { const r = { phone: phoneRef, otp: otpRef, you: nameRef }[s.stage]; const id = setTimeout(() => r?.current?.focus(), 120); return () => clearTimeout(id) }, [s.stage])
  const dob = s.dob || { d: 15, m: 5, y: 2000 }
  const maxY = new Date().getFullYear() - 18
  const setDob = (k, v) => { const n = { ...dob, [k]: v }; n.d = Math.min(n.d, daysIn(n.m, n.y)); set({ dob: n, age: String(ageOf(n)) }) }
  const validPhone = /^[6-9]\d{9}$/.test(s.phone)
  const p = useTween(scan === 'busy', 1500)
  useEffect(() => { if (scan === 'busy' && p >= 1) setScan('done') }, [p, scan])
  const toggle = (key, v, max) => set({ [key]: s[key].includes(v) ? s[key].filter((x) => x !== v) : s[key].length < max ? [...s[key], v] : s[key] })

  async function sendCode() {
    setErr('')
    if (!isLive) return set({ stage: 'otp' })
    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({ phone: '+91' + s.phone })
    setBusy(false)
    if (error) return setErr('We could not send the code. Check the number and try again in a minute.')
    set({ stage: 'otp' })
  }
  async function verify() {
    setErr('')
    if (!isLive) return set({ stage: 'you' })
    setBusy(true)
    const { data, error } = await supabase.auth.verifyOtp({ phone: '+91' + s.phone, token: otp, type: 'sms' })
    if (error || !data?.user) { setBusy(false); return setErr('That code is wrong or expired. Request a new one.') }
    const { data: prof } = await supabase.from('profiles').select('first_name,gender,age,intents,interests,vibe,bio,trust_level').maybeSingle()
    setBusy(false)
    if (prof) return set({ stage: 'app', tab: 'home', name: prof.first_name, gender: prof.gender, age: String(prof.age), intents: prof.intents, interests: prof.interests, vibe: prof.vibe, bio: prof.bio || '', trust: prof.trust_level })
    set({ stage: 'you' })
  }
  async function finish() {
    if (isLive) {
      setBusy(true)
      const { data: u } = await supabase.auth.getUser()
      let { error } = await supabase.from('profiles').insert({ id: u.user.id, first_name: s.name.trim(), gender: s.gender, age: Number(s.age), intents: s.intents, interests: s.interests, vibe: s.vibe })
      if (error && error.code === '23505') ({ error } = await supabase.from('profiles').update({ first_name: s.name.trim(), age: Number(s.age), intents: s.intents, interests: s.interests, vibe: s.vibe }).eq('id', u.user.id))
      setBusy(false)
      if (error) return setErr('We could not save your profile. Try again.')
    }
    set({ stage: 'app', tab: 'home' })
  }

  if (s.stage === 'welcome') return (
    <Shell i={0}>
      <div style={{ textAlign: 'center', paddingTop: 10 }}><Wordmark size={46} /></div>
      <div className="fan" aria-hidden="true">
        <div className="f1"><Face f={USERS[1].face} /></div><div className="f3"><Face f={USERS[2].face} /></div><div className="f2"><Face f={USERS[0].face} /></div>
        <span className="bub" style={{ left: 28, top: 10, background: '#0a8f6c' }}><Icon name="chat" size={20} /></span>
        <span className="bub" style={{ right: 30, top: 24, background: '#0dd19d' }}><Icon name="heart" size={20} filled /></span>
      </div>
      <h1 style={{ textAlign: 'center' }}>Find people who match your <span className="grad-text">vibe</span>.</h1>
      <p className="lead" style={{ textAlign: 'center' }}>Love, movie buddies, sports partners, co-founders. Meet real people in your city.</p>
      <div className="grow"><button className="btn" onClick={() => set({ stage: 'phone' })}>Get started</button><p className="fine" style={{ textAlign: 'center' }}>Bangalore first. Free during the pilot. 18+ only.</p></div>
    </Shell>
  )
  if (s.stage === 'phone') return (
    <Shell i={1} back={() => set({ stage: 'welcome' })}>
      <h1>What's your number?</h1>
      <p className="lead">One account per person. Nobody ever sees your number.</p>
      <div className="phone"><b>+91</b><input className="field" inputMode="numeric" maxLength={10} placeholder="Mobile number" value={s.phone} onChange={(e) => set({ phone: e.target.value.replace(/\D/g, '') })} aria-label="Mobile number" ref={phoneRef} enterKeyHint="next" onKeyDown={enter(sendCode, validPhone && !busy)} /></div>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="grow"><button className="btn" disabled={!validPhone || busy} onClick={sendCode}>{busy ? 'Sending…' : 'Send code'}</button></div>
    </Shell>
  )
  if (s.stage === 'otp') return (
    <Shell i={2} back={() => set({ stage: 'phone' })}>
      <h1>Enter the code.</h1>
      <p className="lead">Sent to +91 {s.phone}.{isLive ? '' : ' Demo: any 6 digits work.'}</p>
      <div className="otp">{Array.from({ length: 6 }, (_, k) => <span key={k} className={'cell' + (k === otp.length ? ' cur' : '')}>{otp[k] || ''}</span>)}
        <input className="otp-in" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} aria-label="One-time code" ref={otpRef} enterKeyHint="go" onKeyDown={enter(verify, otp.length === 6 && !busy)} /></div>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="grow"><button className="btn" disabled={otp.length !== 6 || busy} onClick={verify}>{busy ? 'Checking…' : 'Verify code'}</button></div>
    </Shell>
  )
  if (s.stage === 'you') return (
    <Shell i={3}>
      <h1>About you.</h1>
      <input className="field" ref={nameRef} placeholder="First name" value={s.name} maxLength={20} enterKeyHint="done" onChange={(e) => set({ name: e.target.value })} onKeyDown={enter(() => s.gender && setConf(true), s.name.trim())} aria-label="First name" />
      <h3>I am a</h3>
      <div className="tiles">{['woman', 'man'].map((g) => <button key={g} className={'tile' + (s.gender === g ? ' on' : '')} onClick={() => set({ gender: g })} aria-pressed={s.gender === g}>{g[0].toUpperCase() + g.slice(1)}</button>)}</div>
      <div className="warn" role="note"><Icon name="lock" size={18} /><span>You can't change your gender after creating your account. Choose carefully.</span></div>
      <div className="grow"><button className="btn" disabled={!s.name.trim() || !s.gender} onClick={() => setConf(true)}>Continue</button></div>
      {conf && <div className="modalbg" role="dialog" aria-label="Confirm gender"><div className="sheet" style={{ width: '100%' }}>
        <h1 style={{ fontSize: 24 }}>You are a {s.gender}?</h1>
        <p className="lead">You can't change this after creating your account.</p>
        <div className="row"><button className="btn alt" onClick={() => setConf(false)}>Edit</button><button className="btn" onClick={() => { setConf(false); set({ stage: 'dob' }) }}>Confirm</button></div></div></div>}
    </Shell>
  )
  if (s.stage === 'dob') return (
    <Shell i={4} back={() => set({ stage: 'you' })}>
      <h1>When were you born?</h1>
      <p className="lead">You must be 18 or older. Only your age is shown.</p>
      <div className="wheelrow">
        <Wheel label="Day" items={Array.from({ length: daysIn(dob.m, dob.y) }, (_, i) => ({ v: i + 1, l: String(i + 1) }))} value={dob.d} onChange={(v) => setDob('d', v)} />
        <Wheel label="Month" items={MONTHS.map((l, i) => ({ v: i + 1, l }))} value={dob.m} onChange={(v) => setDob('m', v)} />
        <Wheel label="Year" items={Array.from({ length: maxY - 1950 + 1 }, (_, i) => ({ v: maxY - i, l: String(maxY - i) }))} value={Math.min(dob.y, maxY)} onChange={(v) => setDob('y', v)} />
      </div>
      <p className="fine" style={{ textAlign: 'center' }}>You are {ageOf({ ...dob, y: Math.min(dob.y, maxY) })} years old</p>
      <div className="grow"><button className="btn" onClick={() => set({ stage: 'purpose', age: String(ageOf({ ...dob, y: Math.min(dob.y, maxY) })) })}>Continue</button></div>
    </Shell>
  )
  if (s.stage === 'purpose') return (
    <Shell i={5} back={() => set({ stage: 'dob' })}>
      <h1>What are you here for?</h1>
      <p className="lead">Pick up to three. You can change this later.</p>
      {INTENTS.map((it) => (
        <button key={it.id} className={'intentcard' + (s.intents.includes(it.id) ? ' on' : '')} aria-pressed={s.intents.includes(it.id)} onClick={() => toggle('intents', it.id, 3)}>
          <span className="ic" style={{ background: `hsl(${it.hue} 80% 55%)` }}><Icon name={it.icon} /></span><span><b>{it.label}</b><small>{it.blurb}</small></span>
        </button>
      ))}
      <div className="grow"><button className="btn" disabled={!s.intents.length} onClick={() => set({ stage: 'interests' })}>Continue</button></div>
    </Shell>
  )
  if (s.stage === 'interests') return (
    <Shell i={6} back={() => set({ stage: 'purpose' })}>
      <h1>What are you into?</h1>
      <p className="lead">Pick 3 to 6. It helps us match your vibe.</p>
      <div className="chips">{INTERESTS.map((x) => <Chip key={x} on={s.interests.includes(x)} onClick={() => toggle('interests', x, 6)}>{x}</Chip>)}</div>
      <div className="grow"><button className="btn" disabled={s.interests.length < 3} onClick={() => set({ stage: 'vibe' })}>Continue</button></div>
    </Shell>
  )
  if (s.stage === 'vibe') return (
    <Shell i={7} back={() => set({ stage: 'interests' })}>
      <h1>What's your vibe?</h1>
      <p className="lead">Five quick taps. This builds your vibe meter.</p>
      {AXES.map((a, i) => (
        <div key={a.id} className="vrow"><h3>{a.name}</h3>
          <Seg label={a.name} value={String(s.vibe[i])} onChange={(v) => set({ vibe: s.vibe.map((x, k) => (k === i ? Number(v) : x)) })} opts={[['20', a.l], ['50', 'In between'], ['82', a.r]]} /></div>
      ))}
      <div className="grow"><button className="btn" onClick={() => set({ stage: 'selfie' })}>Continue</button></div>
    </Shell>
  )
  return (
    <Shell i={8} back={() => set({ stage: 'vibe' })}>
      <h1>Verify with a selfie.</h1>
      <p className="lead">It keeps Wybr real and safe. Nobody sees it. You get a verified badge.</p>
      <div className="scan"><svg viewBox="0 0 120 120" width="170" height="170" aria-hidden="true"><circle className="track" cx="60" cy="60" r="54" /><circle className="fill" cx="60" cy="60" r="54" pathLength="1" strokeDasharray={`${scan === 'done' ? 1 : p} 1`} /></svg>
        <span className="av" style={{ width: 110, height: 110, display: 'grid', placeItems: 'center', fontSize: 44 }}>{scan === 'done' ? '✓' : '☺'}</span></div>
      {err && <p className="err" role="alert">{err}</p>}
      <div className="grow">{scan !== 'done' ? <button className="btn" disabled={scan === 'busy'} onClick={() => setScan('busy')}>{scan === 'busy' ? 'Scanning…' : 'Scan my face (demo)'}</button> : <button className="btn" disabled={busy} onClick={finish}>{busy ? 'Saving…' : 'Enter Wybr'}</button>}</div>
    </Shell>
  )
}
