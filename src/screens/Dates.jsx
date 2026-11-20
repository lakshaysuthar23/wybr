import React, { useState } from 'react'
import { USERS, INTENTS, VENUES, SLOTS, PARTNER_SLOTS, ME_AT, km, isFair } from '../data.js'
import { Bar, Avatar, Icon, Progress, Qr, Toggle } from '../ui.jsx'

function fairList(vs, a, b) {
  const f = vs.filter((v) => isFair(v, a, b)).map((v) => v.id)
  if (f.length >= 2) return f
  return [...vs].sort((x, y) => Math.max(km(x, a), km(x, b)) - Math.max(km(y, a), km(y, b))).slice(0, 3).map((v) => v.id)
}

export function PlanFlow({ userId, intent, onClose, onConfirm }) {
  const u = USERS.find((x) => x.id === userId)
  const it = INTENTS.find((x) => x.id === intent)
  const vs = VENUES[intent]
  const fair = fairList(vs, ME_AT, u)
  const [step, setStep] = useState(0)
  const [slot, setSlot] = useState(null)
  const [pick, setPick] = useState(null)
  const [done, setDone] = useState(false)
  const picked = vs.find((v) => v.id === pick)
  const partnerPicks = fair.slice(0, 2)
  const final = vs.find((v) => v.id === (partnerPicks.includes(pick) ? pick : partnerPicks[0]))
  const fs = PARTNER_SLOTS.includes(slot) ? slot : PARTNER_SLOTS[0]
  const mid = { x: (ME_AT.x + u.x) / 2, y: (ME_AT.y + u.y) / 2 }
  return (
    <div className="overlay up" role="dialog" aria-label="Plan a meetup">
      <Bar title={`${it.label} with ${u.name}`} onBack={step && !done ? () => setStep(step - 1) : onClose} />
      <Progress p={done ? 1 : (step + 1) / 3} />
      <div className="scroll"><div className="pad" style={{ flex: 1 }}>
        {step === 0 && (<>
          <h1>When works for you?</h1><p className="lead">Pick one time. {u.name} picks too. We find the overlap.</p>
          <div className="chips">{SLOTS.map((x) => <button key={x} className={'chip' + (slot === x ? ' on' : '')} aria-pressed={slot === x} onClick={() => setSlot(x)}>{x}</button>)}</div>
          <div className="grow"><button className="btn" disabled={!slot} onClick={() => setStep(1)}>Choose a place</button></div></>)}
        {step === 1 && (<>
          <h1>Where to meet?</h1><p className="lead">Public places only, fair for you both.</p>
          <svg className="map" viewBox="0 0 100 100" role="img" aria-label="Map of places between you and your match">
            <path className="road" d="M0 40Q40 50 100 30M30 0Q45 50 40 100M0 80Q50 60 100 70" />
            <circle className="fair" cx={mid.x} cy={mid.y} r="26" /><line className="joined" x1={ME_AT.x} y1={ME_AT.y} x2={u.x} y2={u.y} />
            <circle className="person" cx={ME_AT.x} cy={ME_AT.y} r="2" /><text x={ME_AT.x} y={ME_AT.y + 6}>You</text>
            <circle className="person" cx={u.x} cy={u.y} r="2" /><text x={u.x} y={u.y - 3.5}>{u.name}</text>
            {vs.map((v, i) => { const ok = fair.includes(v.id); return <g key={v.id} className={'pin' + (ok ? '' : ' far') + (pick === v.id ? ' sel' : '')} onClick={() => ok && setPick(v.id)}><circle cx={v.x} cy={v.y} r="3.6" /><text x={v.x} y={v.y + 1.1}>{i + 1}</text></g> })}
          </svg>
          <div className="cafelist">{vs.map((v, i) => { const ok = fair.includes(v.id); return <button key={v.id} className={'cafe' + (pick === v.id ? ' on' : '')} disabled={!ok} onClick={() => setPick(v.id)} aria-pressed={pick === v.id}><span>{i + 1}. {v.name}<small>{v.area} · you {km(v, ME_AT)} km · {u.name} {km(v, u)} km</small></span>{ok && <span className="fairtag">Fair</span>}</button> })}</div>
          <button className="btn" disabled={!pick} onClick={() => setStep(2)}>Send my pick</button></>)}
        {step === 2 && !done && (<><h1>Checking with {u.name}…</h1><p className="lead">You chose {picked.name} on {slot}. {u.name} picks from the same fair list. We settle it for you both.</p><div className="grow"><button className="btn" onClick={() => setDone(true)}>See the result</button></div></>)}
        {step === 2 && done && (<><h1>It's a plan.</h1>
          <div className="card"><span className="grad-text" style={{ fontSize: 30, fontWeight: 800 }}>{fs}</span><h2>{final.name}</h2><p className="fine">{final.area}. {partnerPicks.includes(pick) ? 'You both picked this place.' : `First fair place on ${u.name}'s list.`}</p></div>
          <div className="grow"><button className="btn" onClick={() => onConfirm({ userId, intent, title: `${it.label} with ${u.name}`, slot: fs, venue: final.name })}>Open date kit</button></div></>)}
      </div></div>
    </div>
  )
}

export default function Dates({ s, set, go, say }) {
  const [openId, setOpenId] = useState(s.meets.find((m) => m.status === 'planned')?.id)
  const upcoming = s.meets.filter((m) => m.status === 'planned'), past = s.meets.filter((m) => m.status !== 'planned')
  const finish = (m, met) => { set((st) => ({ meets: st.meets.map((x) => (x.id === m.id ? { ...x, status: met ? 'met' : 'missed' } : x)), trust: met ? Math.min(2, st.trust + 1) : st.trust })); say(met ? 'Confirmed. Your trust badge grew.' : 'No problem. Your badge stays the same.') }
  const card = (m) => { const u = USERS.find((x) => x.id === m.userId); const it = INTENTS.find((x) => x.id === m.intent); const open = openId === m.id; return (
    <div key={m.id} className="card" style={{ margin: '0 16px' }}>
      <button className="rowitem" style={{ padding: 0 }} onClick={() => setOpenId(open ? null : m.id)} aria-expanded={open}>
        {u ? <Avatar u={u} size={50} ring /> : <span className="plan ic" style={{ background: `hsl(${it.hue} 80% 55%)`, width: 50, height: 50, borderRadius: 16, display: 'grid', placeItems: 'center', color: '#fff' }}><Icon name={it.icon} /></span>}
        <div className="t"><h3>{m.title}</h3><p>{m.slot} · {m.venue}</p></div><Icon name="chev" size={18} /></button>
      {open && m.status === 'planned' && (<>
        <div className="pass"><div className="top"><span style={{ fontSize: 13, opacity: .9 }}>{it.label}</span><b>{m.slot}</b></div><div className="bottom"><h2>{m.venue}</h2><p className="fine">Scan at the venue to confirm you met.</p><Qr /></div></div>
        <div><Toggle on={s.safety.shareLoc} onChange={(v) => set({ safety: { ...s.safety, shareLoc: v } })} title="Share my location" sub="A trusted contact sees you arrive" />
          <Toggle on={s.safety.checkin} onChange={(v) => set({ safety: { ...s.safety, checkin: v } })} title="Safe check-in" sub="We ask one hour after it starts" />
          <Toggle on={s.safety.exitCall} onChange={(v) => set({ safety: { ...s.safety, exitCall: v } })} title="Exit call" sub="A call rings so you can leave" /></div>
        <h3>After your meetup</h3><div className="row"><button className="btn" onClick={() => finish(m, true)}>We met</button><button className="btn alt" onClick={() => finish(m, false)}>Didn't happen</button></div>
        <button className="link" onClick={() => { set((st) => ({ meets: st.meets.filter((x) => x.id !== m.id) })); say('Cancelled. No penalty.') }}>I can't make it. No penalty</button></>)}
      {m.status !== 'planned' && <p className="fine">{m.status === 'met' ? 'You met. Trust badge grew.' : 'Did not happen.'}</p>}
    </div>) }
  return (
    <>
      <Bar title="Dates" />
      <div className="scroll">
        {!s.meets.length ? (
          <div className="pad" style={{ flex: 1, alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}><Icon name="dates" size={56} /><h1>No plans yet</h1><p className="lead">Plan a meetup from a profile, a plan on Home, or after a Vibe In.</p><button className="btn" onClick={() => go('home')}>Find people</button></div>
        ) : (<div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 0 24px' }}>
          {upcoming.length > 0 && <div className="sech"><h2>Upcoming</h2></div>}{upcoming.map(card)}
          {past.length > 0 && <div className="sech" style={{ marginTop: 8 }}><h2>Past</h2></div>}{past.map(card)}</div>)}
      </div>
    </>
  )
}
