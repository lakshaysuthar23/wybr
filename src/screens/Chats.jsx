import React, { useEffect, useRef, useState } from 'react'
import { USERS, smartReply, replyDelay, matchPct } from '../data.js'
import { Icon, Avatar, Typing, Verified } from '../ui.jsx'

const time = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

export function Thread({ u, s, set, close, open }) {
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const box = useRef(null)
  const msgs = (s.threads[u.id] || []).filter((m) => !m.typing)
  const n = useRef(0)
  useEffect(() => { set((st) => ({ unread: { ...st.unread, [u.id]: 0 } })) }, [u.id]) // eslint-disable-line
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [msgs.length, typing])
  const push = (m) => set((st) => ({ threads: { ...st.threads, [u.id]: [...(st.threads[u.id] || []).filter((x) => !x.typing), m] } }))
  function send(t) {
    const v = (t ?? text).trim(); if (!v) return
    setText(''); push({ k: 'me', t: v, at: time() })
    const r = smartReply(u, v, { interests: s.interests }), d = replyDelay(r)
    setTimeout(() => setTyping(true), 450)
    setTimeout(() => { setTyping(false); push({ k: 'them', t: r, at: time() }) }, d)
  }
  return (
    <div className="overlay">
      <div className="chathead"><button className="iconbtn" onClick={close} aria-label="Back"><Icon name="back" /></button>
        <button className="who" onClick={() => open({ profile: u.id })}><Avatar u={u} size={42} /><div><h3>{u.name}<Verified level={u.level} size={15} /></h3><small>{u.live ? 'online' : 'away'} · {matchPct(s, u)}% vibe</small></div></button>
        <button className="btn sm" onClick={() => open({ plan: { userId: u.id, intent: u.intents.find((x) => s.intents.includes(x)) || u.intents[0] } })}>Plan</button></div>
      <div className="msgs" ref={box} aria-live="polite">
        {!msgs.length && <div className="msg sys">Say hi to {u.name}. Plan a real meetup when it feels right.</div>}
        {msgs.map((m, i) => <div key={i} className={'msg ' + m.k}>{m.t}{m.at && <small>{m.at}</small>}</div>)}{typing && <Typing />}
      </div>
      <div className="quick">{['Hey, how is your week?', 'Free this weekend?', 'Want to meet for coffee?'].map((x) => <button key={x} className="chip" onClick={() => send(x)}>{x}</button>)}</div>
      <form className="composer" onSubmit={(e) => { e.preventDefault(); send() }}><input className="field" placeholder="Message…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Message" maxLength={300} /><button className="send" type="submit" disabled={!text.trim()} aria-label="Send"><Icon name="send" size={20} /></button></form>
    </div>
  )
}

export default function Chats({ s, open }) {
  const [q, setQ] = useState('')
  const ids = Object.keys(s.threads).filter((id) => USERS.find((u) => u.id === id)).filter((id) => { const u = USERS.find((x) => x.id === id); return !q.trim() || u.name.toLowerCase().includes(q.trim().toLowerCase()) })
  return (
    <>
      <header className="hhead"><div className="t"><b style={{ fontSize: 24 }}>Chats</b></div></header>
      <div style={{ padding: '4px 16px 8px', display: 'flex', gap: 10 }}><label className="search"><Icon name="search" size={18} /><input placeholder="Search chats" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search chats" /></label></div>
      <div className="scroll">
        <div className="sech" style={{ margin: '8px 0 4px' }}><h2>Messages</h2></div>
        {ids.map((id) => { const u = USERS.find((x) => x.id === id); const t = s.threads[id]; const last = t[t.length - 1]; const un = s.unread[id] || 0; return (
          <button key={id} className="rowitem" onClick={() => open({ thread: id })}>
            <Avatar u={u} size={54} ring={un > 0} /><div className="t"><h3>{u.name}</h3><p className={last?.typing ? 'ty' : ''}>{last?.typing ? 'Typing…' : (last?.k === 'me' ? 'You: ' : '') + last?.t}</p></div>
            <div className="meta"><span>{last?.at || ''}</span>{un > 0 && <span className="unread">{un}</span>}</div></button>) })}
        {!ids.length && <p className="fine" style={{ padding: 20 }}>No chats yet. Vibe In to meet someone.</p>}
      </div>
    </>
  )
}
