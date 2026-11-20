import React, { useEffect, useState } from 'react'
import { supabase, isLive } from './lib/supabase.js'
import { initial, USERS } from './data.js'
import { Icon } from './ui.jsx'
import Onboarding from './screens/Onboarding.jsx'
import Home from './screens/Home.jsx'
import Room from './screens/Room.jsx'
import Chats, { Thread } from './screens/Chats.jsx'
import Dates, { PlanFlow } from './screens/Dates.jsx'
import Me, { Settings } from './screens/Me.jsx'
import UserProfile from './screens/UserProfile.jsx'
import Notifs from './screens/Notifs.jsx'

function usePersist(key, init) {
  const [v, setV] = useState(() => {
    try { const raw = localStorage.getItem(key); if (raw) return { ...init, ...JSON.parse(raw) } } catch (e) {}
    return init
  })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch (e) {} }, [key, v])
  return [v, setV]
}
function useSystemDark() {
  const [d, setD] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches)
  useEffect(() => { const m = matchMedia('(prefers-color-scheme: dark)'); const f = (e) => setD(e.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }, [])
  return d
}

export default function App() {
  const [s, setS] = usePersist('wybr-v6', initial)
  const [ov, setOv] = useState([])
  const [toast, setToast] = useState('')
  const dark = useSystemDark()
  const set = (patch) => setS((p) => ({ ...p, ...(typeof patch === 'function' ? patch(p) : patch) }))
  const say = (m) => { setToast(m); setTimeout(() => setToast(''), 3000) }
  const go = (tab) => { setOv([]); set({ tab }) }
  const open = (o) => setOv((x) => [...x, o])
  const close = () => setOv((x) => x.slice(0, -1))
  const signOut = async () => { if (isLive) await supabase.auth.signOut(); setOv([]); setS({ ...initial, theme: s.theme }) }
  const reset = async () => { if (isLive) { await supabase.rpc('delete_my_account'); await supabase.auth.signOut() } setOv([]); setS({ ...initial }) }
  const theme = s.theme === 'system' ? (dark ? 'dark' : 'light') : s.theme

  useEffect(() => {
    if (!isLive) return
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) { setS((p) => (p.stage === 'app' ? initial : p)); return }
      const { data: prof } = await supabase.from('profiles').select('first_name,gender,age,intents,interests,vibe,bio,trust_level').maybeSingle()
      if (prof) setS((p) => ({ ...p, stage: 'app', name: prof.first_name, gender: prof.gender, age: String(prof.age), intents: prof.intents, interests: prof.interests, vibe: prof.vibe, bio: prof.bio || '', trust: prof.trust_level }))
    })
  }, [])

  const common = { s, set, go, say, open, close }
  const inRoom = s.tab === 'room'
  const unread = Object.values(s.unread).reduce((a, b) => a + b, 0)
  const T = ({ k, l, ic, badge }) => (
    <button className={s.tab === k ? 'on' : ''} onClick={() => go(k)} aria-label={l} aria-current={s.tab === k ? 'page' : undefined}>
      <Icon name={ic} size={24} filled={s.tab === k && (k === 'home' || k === 'user')} />{l}{badge > 0 && <span className="badge">{badge}</span>}</button>
  )
  const top = ov[ov.length - 1]
  return (
    <main className="frame" data-theme={theme}>
      {s.stage !== 'app' ? <Onboarding s={s} set={set} /> : (
        <>
          {s.tab === 'home' && <Home {...common} />}
          {s.tab === 'chats' && <Chats {...common} />}
          {inRoom && <Room key="room" {...common} />}
          {s.tab === 'dates' && <Dates {...common} />}
          {s.tab === 'me' && <Me {...common} />}
          {!inRoom && (
            <nav className="tabs" aria-label="Main">
              <T k="home" l="Home" ic="home" /><T k="chats" l="Chats" ic="chat" badge={unread} />
              <button className={'mid' + (s.tab === 'room' ? ' on' : '')} onClick={() => go('room')} aria-label="Vibe In"><span className="orb"><Icon name="pulse" size={30} /></span><small>Vibe In</small></button>
              <T k="dates" l="Dates" ic="dates" badge={s.meets.filter((m) => m.status === 'planned').length} /><T k="me" l="Profile" ic="user" />
            </nav>
          )}
          {ov.map((o, i) => {
            const z = { style: { zIndex: 50 + i } }
            if (o.profile) return <div key={i} {...z} style={{ position: 'absolute', inset: 0, zIndex: 50 + i, display: 'flex' }}><UserProfile u={USERS.find((u) => u.id === o.profile)} s={s} close={close} open={open} say={say} /></div>
            if (o.thread) return <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 50 + i, display: 'flex' }}><Thread u={USERS.find((u) => u.id === o.thread)} s={s} set={set} close={close} open={open} /></div>
            if (o.plan) return <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 50 + i, display: 'flex' }}><PlanFlow userId={o.plan.userId} intent={o.plan.intent} onClose={close} onConfirm={(m) => { set((st) => ({ meets: [...st.meets, { id: 'm' + Date.now(), status: 'planned', ...m }], tab: 'dates' })); setOv([]); say('Meetup planned. Your date kit is ready.') }} /></div>
            if (o.notifs) return <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 50 + i, display: 'flex' }}><Notifs s={s} set={set} close={close} open={open} /></div>
            if (o.settings) return <div key={i} style={{ position: 'absolute', inset: 0, zIndex: 50 + i, display: 'flex' }}><Settings s={s} set={set} close={close} signOut={signOut} reset={reset} /></div>
            return null
          })}
        </>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  )
}
