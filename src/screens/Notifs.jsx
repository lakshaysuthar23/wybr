import React from 'react'
import { USERS } from '../data.js'
import { Bar, Avatar } from '../ui.jsx'

export default function Notifs({ s, set, close, open }) {
  const list = s.notifs || []
  const tap = (n) => { set((st) => ({ notifs: st.notifs.map((x) => (x.id === n.id ? { ...x, unr: false } : x)) })); open(n.k === 'msg' ? { thread: n.u } : { profile: n.u }) }
  return (
    <div className="overlay">
      <Bar title="Notifications" onBack={close} right={list.some((n) => n.unr) ? <button className="link" onClick={() => set((st) => ({ notifs: st.notifs.map((x) => ({ ...x, unr: false })) }))}>Mark all read</button> : null} />
      <div className="scroll">
        {list.map((n) => { const u = USERS.find((x) => x.id === n.u); return (
          <button key={n.id} className={'notif' + (n.unr ? ' unr' : '')} onClick={() => tap(n)}><Avatar u={u} size={48} /><div className="t"><p><b>{n.t}</b></p><small>{n.at}</small></div></button>) })}
        {!list.length && <p className="fine" style={{ padding: 20 }}>Nothing new yet.</p>}
      </div>
    </div>
  )
}
