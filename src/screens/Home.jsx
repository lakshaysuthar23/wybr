import React, { useMemo, useState } from 'react'
import { USERS, INTENTS, PLANS, matchPct, km, ME_AT } from '../data.js'
import { Icon, Avatar, Face, Chip } from '../ui.jsx'

export default function Home({ s, set, go, say, open }) {
  const unr = (s.notifs || []).filter((n) => n.unr).length
  const [q, setQ] = useState('')
  const [searching, setSearching] = useState(false)
  const list = useMemo(() => {
    let l = USERS.map((u) => ({ ...u, pct: matchPct(s, u), d: km(u, ME_AT) }))
    if (s.filter !== 'all') l = l.filter((u) => u.intents.includes(s.filter))
    l.sort((a, b) => (s.seg === 'near' ? a.d - b.d : b.pct - a.pct))
    return l
  }, [s])
  const plans = PLANS.filter((p) => s.filter === 'all' || p.intent === s.filter)
  const found = q.trim() ? USERS.filter((u) => (u.name + u.handle).toLowerCase().includes(q.trim().toLowerCase())) : []
  const joined = (id) => s.meets.some((m) => m.planId === id)

  return (
    <>
      <header className="hbar">
        <div className="loc"><Icon name="pin" size={20} />Bengaluru</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="glassbtn" style={{ position: 'static' }} aria-label="Search" onClick={() => setSearching(!searching)}><Icon name="search" size={20} /></button>
          <button className="glassbtn" style={{ position: 'static' }} aria-label="Notifications" onClick={() => open({ notifs: true })}><Icon name="bell" size={20} />{unr > 0 && <span className="dotb">{unr}</span>}</button>
        </div>
      </header>
      {searching && (
        <div style={{ padding: '4px 16px 8px' }}>
          <label className="search"><Icon name="search" size={18} /><input autoFocus placeholder="Search a name or ID, e.g. riya.k" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search people" /></label>
          {found.map((u) => <button key={u.id} className="rowitem" style={{ padding: '8px 4px' }} onClick={() => open({ profile: u.id })}><Avatar u={u} size={44} /><div className="t"><h3>{u.name}, {u.age}</h3><p>@{u.handle} · {u.area}</p></div></button>)}
          {q.trim() && !found.length && <p className="fine" style={{ padding: 10 }}>No one with that name or ID.</p>}
        </div>
      )}
      <div className="scroll">
        <div className="stories" aria-label="People live now">
          {USERS.filter((u) => u.live).map((u) => <button key={u.id} className="story" onClick={() => open({ profile: u.id })}><Avatar u={u} size={58} ring />{u.name}</button>)}
        </div>
        <div className="pill" role="tablist">{[['foryou', 'For you'], ['near', 'Nearby']].map(([k, l]) => <button key={k} role="tab" aria-selected={s.seg === k} className={s.seg === k ? 'on' : ''} onClick={() => set({ seg: k })}>{l}</button>)}</div>
        <div className="rowscroll" style={{ paddingTop: 10 }}>
          <Chip on={s.filter === 'all'} onClick={() => set({ filter: 'all' })}>All</Chip>
          {INTENTS.map((it) => <Chip key={it.id} on={s.filter === it.id} hue={it.hue} onClick={() => set({ filter: s.filter === it.id ? 'all' : it.id })}>{it.short}</Chip>)}
        </div>
        {list.length ? (
          <div className="car" style={{ paddingTop: 12 }}>
            {list.slice(0, 5).map((u) => (
              <button key={u.id} className="pcard" onClick={() => open({ profile: u.id })} aria-label={`${u.name}, ${u.age}, ${u.pct} percent vibe`}>
                <span className="art"><Face f={u.face} /></span>
                <span className="tl"><span className="act"><i />{u.live ? 'Active' : 'Away'}</span><span className="vpct">{u.pct}% vibe</span></span>
                <span className="bl"><span className="t"><h3>{u.name}, {u.age}</h3><span className="act" style={{ background: 'none', padding: 0 }}>{u.area} · {u.d} km</span>
                  <span className="tags">{u.interests.slice(0, 3).map((x) => <span key={x} className="tagc">{x}</span>)}</span></span><span className="goarrow"><Icon name="arrow" size={22} /></span></span>
              </button>
            ))}
          </div>
        ) : <p className="fine" style={{ padding: '16px 20px' }}>No one matches this filter right now. Try another.</p>}
        {list.length > 5 && <>
          <div className="sech" style={{ marginTop: 6 }}><h2>More people</h2></div>
          <div className="grid2" style={{ marginTop: 10 }}>{list.slice(5).map((u) => (
            <button key={u.id} className="mini" onClick={() => open({ profile: u.id })}><span className="art"><Face f={u.face} /></span><span className="vpct">{u.pct}%</span><span className="bl"><b>{u.name}, {u.age}</b><span>{u.area}</span></span></button>
          ))}</div></>}
        <div className="sech" style={{ marginTop: 22 }}><h2>Plans in Bangalore</h2><span className="fine">Demo</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
          {plans.map((p) => { const it = INTENTS.find((x) => x.id === p.intent), h = USERS.find((u) => u.id === p.host); return (
            <div key={p.id} className="plan"><span className="ic" style={{ background: `hsl(${it.hue} 80% 55%)` }}><Icon name={it.icon} size={24} /></span>
              <div className="t"><h3>{p.title}</h3><p>{p.when} · {p.where}</p><p>Hosted by {h.name}</p></div>
              <button className="btn sm" disabled={joined(p.id)} onClick={() => { set((st) => ({ meets: [...st.meets, { id: 'm' + Date.now(), planId: p.id, userId: p.host, intent: p.intent, title: p.title, slot: p.when, venue: p.where, status: 'planned' }] })); say(`You're in: ${p.title}.`) }}>{joined(p.id) ? 'Joined' : "I'm in"}</button></div>) })}
          {!plans.length && <p className="fine" style={{ padding: '0 20px' }}>No plans for this filter yet.</p>}
        </div>
        <div className="caught" style={{ padding: '22px 0 26px' }}><h3>You're all caught up</h3><p className="fine">Tap Vibe In to meet someone new right now.</p></div>
      </div>
    </>
  )
}
