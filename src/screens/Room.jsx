import React, { useEffect, useMemo, useRef, useState } from 'react'
import { USERS, INTENTS, STARTERS, smartReply, replyDelay, fmt, matchPct } from '../data.js'
import { isLive } from '../lib/supabase.js'
import { Icon, Avatar, Typing, Verified, useTween, VibeGauge } from '../ui.jsx'

const time = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
const OFF = { love: 0.32, movie: 0.18, sports: 0.2, startup: 0.1, social: 0.2 }

export default function Room({ s, set, go, say, open }) {
  const [phase, setPhase] = useState('lobby')
  const [want, setWant] = useState(s.intents[0] || 'love')
  const [live, setLive] = useState(1284)
  const [left, setLeft] = useState(600)
  const [msgs, setMsgs] = useState([{ k: 'sys', t: 'Your identities are hidden. Be yourself.' }])
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [yes, setYes] = useState(false)
  const [rv, setRv] = useState(false)
  const [sent, setSent] = useState(0)
  const box = useRef(null)
  const n = useRef(0)

  const [pid, setPid] = useState(null)
  const lastP = useRef(null)
  const partner = USERS.find((u) => u.id === pid) || USERS[0]
  const connect = () => {
    const pool = USERS.filter((u) => u.intents.includes(want) && u.id !== lastP.current)
    const from = pool.length ? pool : USERS.filter((u) => u.id !== lastP.current)
    const p = from[Math.floor(Math.random() * from.length)]
    lastP.current = p.id; setPid(p.id); setPhase('finding')
  }
  const pct = matchPct(s, partner)
  const sync = Math.min(pct, 38 + sent * 10)

  useEffect(() => { const id = setInterval(() => setLive((l) => Math.max(1100, l + Math.round((Math.random() - 0.45) * 9))), 1800); return () => clearInterval(id) }, [])
  const cnt = useTween(phase === 'lobby', 1400)
  const find = useTween(phase === 'finding', 2600)
  useEffect(() => { if (phase === 'finding' && find >= 1) setPhase('chat') }, [find, phase])
  const wait = useTween(phase === 'waiting', 2200)
  useEffect(() => { if (phase === 'waiting' && wait >= 1) setPhase(yes ? 'reveal' : 'no') }, [wait, phase, yes])
  useEffect(() => {
    if (phase !== 'reveal') return
    set((st) => ({ threads: st.threads[partner.id] ? st.threads : { ...st.threads, [partner.id]: [{ k: 'them', t: 'That was a fun vibe check. Hi, I am ' + partner.name + '.', at: time() }] } }))
    const a = setTimeout(() => setRv(true), 700)
    return () => clearTimeout(a)
  }, [phase]) // eslint-disable-line
  useEffect(() => { if (phase !== 'chat') return; const id = setInterval(() => setLeft((l) => Math.max(0, l - 1)), 1000); return () => clearInterval(id) }, [phase])
  useEffect(() => { if (phase === 'chat' && left === 0) setPhase('decide') }, [left, phase])
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [msgs, typing])

  function send(t) {
    const v = (t ?? text).trim(); if (!v) return
    setText(''); setSent((x) => x + 1)
    setMsgs((m) => [...m, { k: 'me', t: v, at: time() }])
    const rp = smartReply(partner, v, { room: true, interests: s.interests }), d = replyDelay(rp)
    setTimeout(() => setTyping(true), 400)
    setTimeout(() => { setTyping(false); setMsgs((m) => [...m.map((x) => (x.k === 'me' ? { ...x, read: true } : x)), { k: 'them', t: rp, at: time() }]) }, d)
  }
  const head = (right) => (
    <div className="chathead"><button className="iconbtn" onClick={() => go('home')} aria-label="Leave the room"><Icon name="back" /></button>
      <div className="who" style={{ cursor: 'default' }}><Avatar u={partner} size={40} blur={phase === 'lobby' || phase === 'finding' ? 0 : 14} />
        <div><h3>{phase === 'lobby' ? 'Vibe In' : partner.alias}</h3><small>{phase === 'lobby' ? 'Live room' : 'Identity hidden'}</small></div></div>{right}</div>
  )

  if (phase === 'lobby') return (
    <div className="scroll">
      <div className="topbar"><button className="iconbtn" onClick={() => go('home')} aria-label="Back"><Icon name="back" /></button><h2>Vibe In</h2><span className="iconbtn off" /></div>
      <div className="lobbyhero stage">
        <div className="orbit"><span className="r"><i /></span><span className="r"><i /></span>
          <div className="num"><b aria-live="polite">{Math.round(live * cnt).toLocaleString('en-IN')}</b><span><i />live right now</span></div></div>
        <h1 style={{ fontSize: 24 }}>Ten minutes. No names. Real vibe.</h1>
        <p style={{ fontSize: 14, opacity: .9, lineHeight: 1.4 }}>Chat with someone nearby while your identities stay hidden. If you both say yes, you reveal.</p>
        <button className="vi-btn" onClick={connect}><Icon name="pulse" size={22} />Vibe In</button>
      </div>
      <div className="pad stage">
        <div><h2>What are you vibing for?</h2><p className="fine" style={{ marginTop: 2 }}>Live now in each room</p></div>
        <div className="rowscroll" style={{ padding: '0 0 4px', margin: '0 -20px', paddingLeft: 20 }}>
          {INTENTS.map((it) => <button key={it.id} className={'ichip' + (want === it.id ? ' on' : '')} style={want === it.id ? { background: `hsl(${it.hue} 80% 52%)` } : undefined} aria-pressed={want === it.id} onClick={() => setWant(it.id)}><Icon name={it.icon} size={18} /><span>{it.short}<br /><small>{Math.round(live * OFF[it.id]).toLocaleString('en-IN')} live</small></span></button>)}
        </div>
        <div className="rules">
          <div><span className="ri"><Icon name="lock" size={18} /></span><span>Names and photos stay hidden until you both say yes.</span></div>
          <div><span className="ri"><Icon name="eye" size={18} /></span><span>A no is silent. They never know.</span></div>
          <div><span className="ri"><Icon name="shield" size={18} /></span><span>Every member is phone verified. Report anytime.</span></div>
        </div>
      </div>
    </div>
  )
  if (phase === 'finding') return (
    <div className="scroll">{head()}<div className="pad" style={{ flex: 1, alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
      <div className="pulse1"><Avatar u={{ face: { bg: [330, 270], skin: '#e0b08c', hair: '#231512', style: 'long', shirt: '#b0306a' } }} size={84} ring blur={10} /></div>
      <h2 key={find > 0.9 ? 'f' : 'g'} className="fadein">{find > 0.9 ? 'Found your vibe' : 'Finding your vibe…'}</h2><p className="fine">Matching by vibe, interests and distance</p></div></div>
  )
  if (phase === 'chat') return (<>
    {head(<span className={'timerpill' + (left < 60 ? ' low' : '')} role="timer" aria-label="Time left">{fmt(left)}</span>)}
    <div className="meterbar"><span>Vibe sync</span><span className="tr"><i style={{ width: sync + '%' }} /></span><b>{sync}%</b></div>
    <div className="msgs" ref={box} aria-live="polite">{msgs.map((m, i) => <div key={i} className={'msg ' + m.k}>{m.t}{m.at && <small>{m.at}{m.k === 'me' ? (m.read ? ' ✓✓' : ' ✓') : ''}</small>}</div>)}{typing && <Typing />}</div>
    <div className="quick">{STARTERS.map((x) => <button key={x} className="chip" onClick={() => send(x)}>{x}</button>)}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 16px 0' }}>
      <button className="link" onClick={() => { setLeft((l) => l + 300); setMsgs((m) => [...m, { k: 'sys', t: 'You both asked for 5 more minutes.' }]) }}>Ask for 5 more minutes</button>
      {!isLive && <button className="link" onClick={() => { setSent(4); setPhase('decide') }}>Demo: skip to decision</button>}</div>
    <form className="composer" onSubmit={(e) => { e.preventDefault(); send() }}><input className="field" placeholder="Message…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Message" maxLength={300} /><button className="send" type="submit" disabled={!text.trim()} aria-label="Send"><Icon name="send" size={20} /></button></form>
  </>)
  if (phase === 'decide') return (<>
    {head()}
    <div className="msgs" style={{ flex: 1 }}>{msgs.slice(-3).map((m, i) => <div key={i} className={'msg ' + m.k}>{m.t}</div>)}</div>
    <div className="sheet"><h1 style={{ textAlign: 'center', fontSize: 24 }}>Your vibe match: <span className="grad-text">{pct}%</span></h1>
      <p className="lead" style={{ textAlign: 'center' }}>Reveal who you are? Both must say yes. Otherwise nothing is shared.</p>
      <div className="choice"><div><button onClick={() => { setYes(false); setPhase('waiting') }} aria-label="Pass"><Icon name="close" size={30} /></button><span>Pass</span></div>
        <div><button className="yes" onClick={() => { setYes(true); setPhase('waiting') }} aria-label="Reveal"><Icon name="heart" size={32} filled /></button><span>Reveal</span></div></div></div>
  </>)
  if (phase === 'waiting') return <div className="scroll"><div className="pad" style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}><div className="spinner" /><h2>{yes ? 'Waiting for their answer…' : 'Closing quietly…'}</h2><p className="fine">{yes ? 'You said yes.' : 'They will not be told.'}</p></div></div>
  if (phase === 'reveal') return (
    <div className="scroll"><div className="pad" style={{ flex: 1, alignItems: 'center', textAlign: 'center' }}>
      <p className="fine" style={{ marginTop: 20 }}>{rv ? 'Revealed. You both said yes.' : 'You both said yes…'}</p>
      <div className="revealwrap"><Avatar u={partner} size={190} ring blur={rv ? 0 : 18} /></div>
      <div style={{ minHeight: 64 }}>{rv ? <h1 className="reveal-name">{partner.name}, {partner.age}<Verified level={partner.level} size={24} /></h1> : <h1 className="alias">{partner.alias}</h1>}
        {rv && <p className="fine reveal-name" style={{ animationDelay: '.5s' }}>@{partner.handle} · {partner.area}</p>}</div>
      {rv && <div className="reveal-name" style={{ animationDelay: '.9s' }}><VibeGauge value={pct} size={120} /></div>}
      <div className="grow" style={{ width: '100%' }}>
        <button className="btn" disabled={!rv} onClick={() => { go('home'); open({ plan: { userId: partner.id, intent: want } }) }}>Plan meetup</button>
        <div className="row"><button className="btn alt" disabled={!rv} onClick={() => { go('chats'); open({ thread: partner.id }) }}>Message</button><button className="btn alt" disabled={!rv} onClick={() => { go('home'); open({ profile: partner.id }) }}>View profile</button></div>
      </div></div></div>
  )
  return <div className="scroll"><div className="pad" style={{ flex: 1, justifyContent: 'center', textAlign: 'center' }}><h1>No match this time</h1><p className="lead">That's normal. Vibe In again and meet someone new.</p><div className="grow"><button className="btn" onClick={() => { setPhase('lobby'); setLeft(600); setSent(0); setMsgs([{ k: 'sys', t: 'Your identities are hidden. Be yourself.' }]) }}>Vibe In again</button><button className="btn alt" onClick={() => go('home')}>Back home</button></div></div></div>
}
