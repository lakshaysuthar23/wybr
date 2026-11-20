import React, { useState } from 'react'
import { INTENTS, TIERS, matchPct } from '../data.js'
import { Icon, Face, Art, KIND_HUE, Verified, VibeGauge } from '../ui.jsx'

export function Posts({ u, posts, box, setBox, mine, onNew }) {
  const [view, setView] = useState('feed')
  return (
    <div>
      <div className="sech" style={{ padding: 0 }}><h2>Posts</h2>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {mine && <button className="link" onClick={onNew}>New post</button>}
          <div className="viewtog" role="group" aria-label="Post layout">
            <button className={view === 'feed' ? 'on' : ''} onClick={() => setView('feed')} aria-label="One column" aria-pressed={view === 'feed'}><Icon name="rows" size={18} /></button>
            <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-label="Three columns" aria-pressed={view === 'grid'}><Icon name="grid" size={18} /></button>
          </div></div></div>
      {!posts.length ? <p className="fine" style={{ marginTop: 8 }}>No posts yet. Share a moment so people see your vibe.</p>
        : view === 'grid' ? <div className="posts" style={{ marginTop: 10 }}>{posts.map((p, i) => <button key={i} onClick={() => setBox(p)} aria-label={p.cap}><Art kind={p.kind} hue={KIND_HUE[p.kind]} /><span className="lk">♥ {p.likes}</span></button>)}</div>
        : <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 12 }}>{posts.map((p, i) => (
          <div key={i} className="feedpost fadein"><div className="img"><Art kind={p.kind} hue={KIND_HUE[p.kind]} /></div><p>{p.cap}</p><small>♥ {p.likes} · {p.ago === 'now' ? 'just now' : p.ago + ' ago'}</small></div>))}</div>}
    </div>
  )
}

/* one layout for both: how others see a person, and how you see yourself */
export function ProfileView({ u, s, mine, pct, top, bottom, onEdit, edit, bioEl, onNew, setBox, box }) {
  const shared = mine ? [] : u.interests.filter((x) => s.interests.includes(x))
  const word = pct >= 85 ? 'Rare match. Your energy lines up.' : pct >= 72 ? 'Strong match. You should get along.' : 'Different styles. Could be interesting.'
  return (
    <>
      <div className="scroll">
        <div className="phero"><span className="art"><Face f={u.face} /></span>{top}</div>
        <div className="psheet">
          <div><h1>{u.name}{u.age ? `, ${u.age}` : ''}<Verified level={u.level} size={24} /></h1>
            <p className="fine" style={{ marginTop: 4 }}>@{u.handle} · {u.area} · <span style={{ color: 'var(--acc)', fontWeight: 700 }}>{u.live ? 'Active now' : 'Away'}</span></p></div>
          {!mine && <div className="gaugecard"><VibeGauge value={pct} size={128} />
            <div><h3>Your vibe match</h3><p className="fine" style={{ marginTop: 4 }}>{word}</p>
              {shared.length > 0 && <p className="fine" style={{ marginTop: 6 }}>{shared.length} shared {shared.length === 1 ? 'interest' : 'interests'}</p>}</div></div>}
          <div className="chips">{u.intents.map((id) => { const it = INTENTS.find((x) => x.id === id); return <span key={id} className="chip on" style={{ background: `hsl(${it.hue} 80% 50%)`, borderColor: 'transparent', color: '#fff' }}>{it.label}</span> })}</div>
          <div><div className="sech" style={{ padding: 0 }}><h2>About</h2>{mine && <button className="link" onClick={onEdit}>{edit ? 'Save' : 'Edit'}</button>}</div>
            {bioEl || <p className="lead" style={{ marginTop: 6, color: 'var(--text)', fontSize: 15 }}>{u.bio || (mine ? 'Add a short bio so people know your vibe.' : '')}</p>}</div>
          <div><h2>Interests</h2><div className="chips" style={{ marginTop: 10 }}>{u.interests.map((x) => <span key={x} className={'chip' + (shared.includes(x) ? ' on' : '')}>{x}</span>)}</div></div>
          <Posts u={u} posts={u.posts} box={box} setBox={setBox} mine={mine} onNew={onNew} />
          <p className="fine">{TIERS[u.level].n}. {TIERS[u.level].d}</p>
        </div>
      </div>
      {bottom}
      {box && <div className="lightbox" onClick={() => setBox(null)} role="dialog" aria-label="Post"><div className="art"><Art kind={box.kind} hue={KIND_HUE[box.kind]} /></div><div><b>{u.name}</b><p style={{ marginTop: 4 }}>{box.cap}</p><p className="fine" style={{ color: '#ccc', marginTop: 6 }}>♥ {box.likes} · {box.ago === 'now' ? 'just now' : box.ago + ' ago'}</p></div><p className="fine" style={{ color: '#aaa', textAlign: 'center' }}>Tap anywhere to close</p></div>}
    </>
  )
}

export default function UserProfile({ u, s, close, open, say }) {
  const [box, setBox] = useState(null)
  const pct = matchPct(s, u)
  const planIntent = u.intents.find((x) => s.intents.includes(x)) || u.intents[0]
  return (
    <div className="overlay">
      <ProfileView u={u} s={s} pct={pct} box={box} setBox={setBox}
        top={<>
          <button className="glassbtn" style={{ left: 14 }} onClick={close} aria-label="Back"><Icon name="back" /></button>
          <button className="glassbtn" style={{ right: 14 }} onClick={() => say(`Report and block options are coming soon.`)} aria-label="More options"><Icon name="sliders" size={20} /></button></>}
        bottom={<div className="actionbar"><button className="btn alt" onClick={() => open({ thread: u.id })}>Message</button><button className="btn" onClick={() => open({ plan: { userId: u.id, intent: planIntent } })}>Plan meetup</button></div>} />
    </div>
  )
}
