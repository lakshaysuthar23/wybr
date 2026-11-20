import React, { useState } from 'react'
import { meFull } from '../data.js'
import { Bar, Icon, Art, KIND_HUE, Chip, Toggle } from '../ui.jsx'
import { ProfileView } from './UserProfile.jsx'

const KINDS = [['trek', 'Outdoors'], ['cafe', 'Cafe'], ['music', 'Music'], ['movie', 'Movies'], ['sport', 'Sports'], ['gym', 'Gym'], ['food', 'Food'], ['code', 'Work']]

export function Settings({ s, set, close, signOut, reset }) {
  const [sure, setSure] = useState(false)
  return (
    <div className="overlay">
      <Bar title="Settings" onBack={close} />
      <div className="scroll"><div className="pad">
        <h2>Appearance</h2>
        <div className="themes" role="radiogroup" aria-label="Theme">
          {[['light', 'Light', ['#fff', '#f1f4f3', '#0dd19d']], ['dark', 'Dark', ['#101015', '#1b1b22', '#0dd19d']], ['system', 'System', ['#fff', '#101015', '#0dd19d']]].map(([k, l, c]) => (
            <button key={k} role="radio" aria-checked={s.theme === k} className={'themeopt' + (s.theme === k ? ' on' : '')} onClick={() => set({ theme: k })}>
              <span className="pv" style={{ background: c[0], border: '1px solid var(--line)' }}><i style={{ background: c[1] }} /><i style={{ background: c[2] }} /></span>{l}</button>))}
        </div>
        <h2 style={{ marginTop: 8 }}>Notifications</h2>
        <div><Toggle on={s.notify.matches} onChange={(v) => set({ notify: { ...s.notify, matches: v } })} title="New matches" sub="When someone reveals to you" />
          <Toggle on={s.notify.chats} onChange={(v) => set({ notify: { ...s.notify, chats: v } })} title="Messages" />
          <Toggle on={s.notify.plans} onChange={(v) => set({ notify: { ...s.notify, plans: v } })} title="Plans and reminders" /></div>
        <h2 style={{ marginTop: 8 }}>Privacy and safety</h2>
        <div><Toggle on={s.privacy.live} onChange={(v) => set({ privacy: { ...s.privacy, live: v } })} title="Appear in Vibe In rooms" sub="Turn off to stop being matched" />
          <Toggle on={s.privacy.area} onChange={(v) => set({ privacy: { ...s.privacy, area: v } })} title="Hide my area" sub="Show only the city" />
          <Toggle on={s.safety.shareLoc} onChange={(v) => set({ safety: { ...s.safety, shareLoc: v } })} title="Share location on meetups" /></div>
        <h2 style={{ marginTop: 8 }}>Account</h2>
        <div className="setrow"><span>Phone</span><span className="fine">+91 {s.phone ? s.phone.slice(0, 2) + '••••••' + s.phone.slice(-2) : '••••••••••'}</span></div>
        <div className="setrow"><span>Version</span><span className="fine">Wybr 1.0 pilot</span></div>
        <button className="btn alt" onClick={signOut}>Log out</button>
        {!sure ? <button className="link" style={{ color: 'var(--red)' }} onClick={() => setSure(true)}>Delete my account</button> : (
          <div className="card"><p>This erases your profile for good.</p><div className="row"><button className="btn alt" onClick={() => setSure(false)}>Keep it</button><button className="btn" onClick={reset}>Delete</button></div></div>)}
      </div></div>
    </div>
  )
}

export default function Me({ s, set, open, say }) {
  const me = meFull(s)
  const [edit, setEdit] = useState(false)
  const [bio, setBio] = useState(s.bio)
  const [post, setPost] = useState(null)
  const [cap, setCap] = useState('')
  const [kind, setKind] = useState('cafe')
  const [box, setBox] = useState(null)
  const addPost = () => { set((st) => ({ myPosts: [{ kind, cap: cap.trim(), likes: 0, ago: 'now' }, ...st.myPosts] })); setPost(null); setCap(''); say('Posted.') }
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <ProfileView u={me} s={s} mine box={box} setBox={setBox} edit={edit} onNew={() => setPost(true)}
        onEdit={() => { if (edit) set({ bio: bio.trim() }); setEdit(!edit) }}
        bioEl={edit ? <textarea className="field" style={{ marginTop: 8 }} maxLength={200} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell people what you are like" aria-label="Bio" /> : null}
        top={<button className="glassbtn" style={{ right: 14 }} onClick={() => open({ settings: true })} aria-label="Settings"><Icon name="gear" size={20} /></button>} />
      {post && (
        <div className="lightbox" role="dialog" aria-label="New post" style={{ justifyContent: 'flex-end', padding: 0, background: 'rgba(0,0,0,.55)' }}>
          <div className="sheet" style={{ color: 'var(--text)' }}><h2>New post</h2>
            <div className="chips">{KINDS.map(([k, l]) => <Chip key={k} on={kind === k} onClick={() => setKind(k)}>{l}</Chip>)}</div>
            <div style={{ height: 120, borderRadius: 20, overflow: 'hidden' }}><Art kind={kind} hue={KIND_HUE[kind]} /></div>
            <input className="field" placeholder="Write a caption" value={cap} maxLength={90} onChange={(e) => setCap(e.target.value)} aria-label="Caption" />
            <div className="row"><button className="btn alt" onClick={() => setPost(null)}>Cancel</button><button className="btn" disabled={!cap.trim()} onClick={addPost}>Post</button></div></div></div>)}
    </div>
  )
}
