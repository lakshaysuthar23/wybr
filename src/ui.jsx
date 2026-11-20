import React, { useEffect, useId, useState } from 'react'

const P = {
  home: 'M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  chat: 'M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z',
  dates: 'M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4zM14 6v12',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c1-4.5 4.5-6 8-6s7 1.5 8 6',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4',
  back: 'M15 4l-8 8 8 8', close: 'M5 5l14 14M19 5L5 19', send: 'M4 12l16-8-6 17-3-7z',
  heart: 'M12 21s-8-5.5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 5.5-8 11-8 11z',
  pin: 'M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  chev: 'M9 5l7 7-7 7', pulse: 'M2 12h4l3-8 4 16 3-8h6',
  sliders: 'M4 7h9m4 0h3M4 17h3m4 0h9M15 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0M9 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 13a7.5 7.5 0 0 0 0-2l2-1.6-2-3.4-2.4 1a7.5 7.5 0 0 0-1.7-1L15 3h-4l-.4 2.7a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.6a7.5 7.5 0 0 0 0 2l-2 1.6 2 3.4 2.4-1c.5.4 1.1.7 1.7 1L11 21h4l.4-2.7c.6-.3 1.2-.6 1.7-1l2.4 1 2-3.4z',
  plus: 'M12 5v14M5 12h14', check: 'M5 12l5 5 9-10', arrow: 'M7 17L17 7M8 7h9v9',
  film: 'M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4',
  ball: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 8l4 3-1.5 5h-5L8 11z',
  rocket: 'M12 3c4 2 6 6 5 11l-3 3h-4l-3-3c-1-5 1-9 5-11zM9 20l-2 1 1-3M15 20l2 1-1-3',
  coffee: 'M5 9h11v5a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 10h2a2 2 0 0 1 0 4h-2M8 3v3M12 3v3',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3', eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  moon: 'M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z', clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', rows: 'M4 5h16v6H4zM4 14h16v6H4z', down: 'M6 9l6 6 6-6',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c.5-3.5 3-5 6-5s5.5 1.5 6 5M17 11a3 3 0 0 0 0-6M21 20c-.3-2.5-1.5-4-3.5-4.7',
}
export function Icon({ name, size = 22, filled }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[name] || P.close} /></svg>
}
import logoWhite from './assets/logo-white.png'
import logoInk from './assets/logo-ink.png'
export function Wordmark({ size = 28 }) { const w = size * 1.9; return <span style={{ display: 'inline-block' }} aria-label="wybr"><img className="logo logo-ink" src={logoInk} alt="wybr" width={w} /><img className="logo logo-white" src={logoWhite} alt="" width={w} /></span> }

/* vertical wheel picker */
export function Wheel({ items, value, onChange, label }) {
  const ref = React.useRef(null)
  const idx = Math.max(0, items.findIndex((x) => x.v === value))
  const tm = React.useRef(null)
  useEffect(() => { if (ref.current) ref.current.scrollTop = idx * 44 }, []) // eslint-disable-line
  useEffect(() => { const el = ref.current; if (el && Math.abs(el.scrollTop - idx * 44) > 2 && !tm.current) el.scrollTo({ top: idx * 44 }) }, [idx, items.length])
  const onScroll = () => { clearTimeout(tm.current); tm.current = setTimeout(() => { tm.current = null; const i = Math.round(ref.current.scrollTop / 44); const it = items[Math.min(items.length - 1, Math.max(0, i))]; if (it && it.v !== value) onChange(it.v) }, 90) }
  return (
    <div className="wheel" role="listbox" aria-label={label}><div className="wheel-band" />
      <div className="wheel-list" ref={ref} onScroll={onScroll}>{items.map((it) => <button key={it.v} type="button" role="option" aria-selected={it.v === value} className={'wi' + (it.v === value ? ' on' : '')} onClick={() => { ref.current.scrollTo({ top: items.indexOf(it) * 44, behavior: 'smooth' }); onChange(it.v) }}>{it.l}</button>)}</div></div>
  )
}

/* illustrated portrait. fills its box. */
export function Face({ f }) {
  const id = useId().replace(/:/g, '')
  const { bg = [200, 300], skin = '#e0b08c', hair = '#222', style = 'short', shirt = '#445', glasses, beard } = f
  const back = { long: <path d="M29 50C27 92 32 102 38 106h24c6-4 11-14 9-56z" fill={hair} />, bob: <path d="M29 48C27 72 30 78 34 80h32c4-2 7-8 5-32z" fill={hair} />, bun: <circle cx="50" cy="22" r="8" fill={hair} />, curly: <g fill={hair}>{[[32, 44], [29, 54], [34, 66], [68, 44], [71, 54], [66, 66], [38, 30], [50, 26], [62, 30]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="9" />)}</g> }[style]
  const front = {
    long: <path d="M30 52C28 28 42 26 50 26s22 2 20 26c-4-12-12-16-20-16s-16 4-20 16z" fill={hair} />,
    bob: <path d="M30 52C28 28 42 26 50 26s22 2 20 26c-4-12-12-16-20-16s-16 4-20 16z" fill={hair} />,
    bun: <path d="M31 50C30 30 42 29 50 29s20 1 19 21c-5-10-13-12-19-12s-14 2-19 12z" fill={hair} />,
    short: <path d="M31 48C30 28 42 27 50 27s20 1 19 21c-4-10-11-13-19-13s-15 3-19 13z" fill={hair} />,
    curly: <path d="M31 46C32 32 42 29 50 29s18 3 19 17c-5-8-12-10-19-10s-14 2-19 10z" fill={hair} />,
    spiky: <path d="M31 46l2-16 7 6 4-12 6 10 6-10 4 12 7-6 2 16c-7-8-31-8-38 0z" fill={hair} />,
    cap: <g><path d="M30 46C30 24 70 24 70 46z" fill={shirt} /><path d="M28 46h44c4 0 6 2 6 4H28z" fill={shirt} opacity=".85" /></g>,
  }[style]
  return (
    <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
      <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={`hsl(${bg[0]} 85% 62%)`} /><stop offset="1" stopColor={`hsl(${bg[1]} 80% 48%)`} /></linearGradient></defs>
      <rect width="100" height="125" fill={`url(#${id})`} />
      <circle cx="80" cy="18" r="24" fill="#fff" opacity=".14" /><circle cx="14" cy="104" r="20" fill="#000" opacity=".08" />
      {back}
      <path d="M6 125C6 94 28 87 50 87s44 7 44 38z" fill={shirt} />
      <rect x="43" y="70" width="14" height="22" rx="6" fill={skin} /><rect x="43" y="78" width="14" height="6" fill="#000" opacity=".08" />
      <ellipse cx="50" cy="52" rx="19" ry="22" fill={skin} />
      {beard && <path d="M32 55c1 20 35 20 36 0-5 9-31 9-36 0z" fill={hair} opacity=".92" />}
      {front}
      <circle cx="43" cy="54" r="1.9" fill="#2b1d1d" /><circle cx="57" cy="54" r="1.9" fill="#2b1d1d" />
      <path d="M39 49q4-2 7 0M54 49q4-2 7 0" stroke={hair} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M44 63q6 5 12 0" stroke="#7a2e2e" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="60" r="3.5" fill="#ff6b8a" opacity=".22" /><circle cx="62" cy="60" r="3.5" fill="#ff6b8a" opacity=".22" />
      {glasses && <g fill="none" stroke="#1a1a24" strokeWidth="1.6"><circle cx="43" cy="54" r="6" /><circle cx="57" cy="54" r="6" /><path d="M49 54h2" /></g>}
    </svg>
  )
}

export function Avatar({ u, size = 56, ring, live, dim, blur }) {
  const core = <span className="av" style={{ width: size, height: size }}><span style={blur ? { filter: `blur(${blur}px) saturate(.6)`, transform: 'scale(1.3)' } : undefined}><Face f={u.face} /></span></span>
  if (!ring) return core
  return <span className={'ring' + (live ? ' live' : '') + (dim ? ' dim' : '')}><span className="ringin">{core}</span></span>
}

/* abstract post art */
export function Art({ kind, hue = 280, rounded = true }) {
  const g = {
    trek: <><path d="M0 70L30 34l18 24 16-18 36 38v22H0z" fill="#fff" opacity=".85" /><path d="M0 84l26-22 24 22 22-14 28 14v16H0z" fill="#000" opacity=".25" /><circle cx="76" cy="24" r="10" fill="#fff" opacity=".9" /></>,
    cafe: <><path d="M26 46h40v22a16 16 0 0 1-16 16h-8a16 16 0 0 1-16-16z" fill="#fff" opacity=".9" /><path d="M66 52h6a8 8 0 0 1 0 16h-6" stroke="#fff" strokeWidth="5" fill="none" /><path d="M38 38q4-8 0-14M52 38q4-8 0-14" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" /></>,
    music: <>{[18, 30, 42, 54, 66, 78].map((x, i) => <rect key={x} x={x} y={60 - [14, 30, 20, 36, 24, 12][i]} width="8" height={[28, 60, 40, 72, 48, 24][i]} rx="4" fill="#fff" opacity=".9" />)}</>,
    movie: <><rect x="18" y="38" width="64" height="44" rx="6" fill="#fff" opacity=".9" /><path d="M18 38l12-14h14L32 38zM44 38l12-14h14L58 38z" fill="#fff" opacity=".6" /><path d="M44 52v18l16-9z" fill="#000" opacity=".4" /></>,
    sport: <><circle cx="50" cy="52" r="26" fill="#fff" opacity=".92" /><path d="M50 36l12 9-4 14H42l-4-14z" fill="#000" opacity=".5" /></>,
    gym: <><rect x="14" y="44" width="10" height="26" rx="3" fill="#fff" /><rect x="76" y="44" width="10" height="26" rx="3" fill="#fff" /><rect x="26" y="52" width="48" height="10" rx="3" fill="#fff" opacity=".85" /></>,
    food: <><circle cx="50" cy="56" r="28" fill="#fff" opacity=".92" /><circle cx="50" cy="56" r="18" fill="#000" opacity=".15" /><path d="M42 50q8-10 16 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" /></>,
    code: <><path d="M36 38L20 56l16 18M64 38l16 18-16 18M56 32L44 80" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></>,
  }[kind] || null
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" aria-hidden="true" style={{ display: 'block', borderRadius: rounded ? 'inherit' : 0 }}>
      <defs><linearGradient id={'a' + kind + hue} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={`hsl(${hue} 85% 62%)`} /><stop offset="1" stopColor={`hsl(${(hue + 50) % 360} 80% 45%)`} /></linearGradient></defs>
      <rect width="100" height="100" fill={`url(#${'a' + kind + hue})`} />{g}
    </svg>
  )
}
export const KIND_HUE = { trek: 160, cafe: 25, music: 280, movie: 265, sport: 140, gym: 350, food: 35, code: 210 }

export function Verified({ level = 0, size = 18 }) {
  const c = ['#9ca3af', '#1d9bf0', '#f5b301'][level]
  return <svg className="vtick" width={size} height={size} viewBox="0 0 24 24" role="img" aria-label={['Joined', 'Verified', 'Trusted'][level]}><path d="M12 1l2.6 2 3.2-.3 1.2 3 2.9 1.5-.7 3.1 1.4 2.9-2.1 2.4-.2 3.2-3.1.8-2 2.6L12 20.8 9.8 23l-2-2.6-3.1-.8-.2-3.2L2.4 14l1.4-2.9-.7-3.1L6 6.5l1.2-3 3.2.3z" fill={c} transform="scale(.9) translate(1.3 .6)" /><path d="M8 12.3l2.8 2.8L16.5 9.4" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function useTween(active, ms) {
  const [p, setP] = useState(0)
  useEffect(() => {
    if (!active) { setP(0); return }
    if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return }
    let raf, t0
    const step = (t) => { if (t0 == null) t0 = t; const k = Math.min(1, (t - t0) / ms); setP(k); if (k < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, ms])
  return p
}

/* the vibe meter: arc gauge that counts up */
export function VibeGauge({ value, size = 150, label = 'Vibe match' }) {
  const p = useTween(true, 1200)
  const v = Math.round(value * (1 - Math.pow(1 - p, 3)))
  const r = 52, c = 2 * Math.PI * r * 0.75
  const id = useId().replace(/:/g, '')
  return (
    <div className="gauge" style={{ width: size, height: size }} role="img" aria-label={`${label}: ${value} percent`}>
      <svg viewBox="0 0 120 120" width={size} height={size}>
        <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1ae3b0" /><stop offset="1" stopColor="#07a47c" /></linearGradient></defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--line)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c} 999`} transform="rotate(135 60 60)" />
        <circle cx="60" cy="60" r={r} fill="none" stroke={`url(#${id})`} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${c * v / 100} 999`} transform="rotate(135 60 60)" />
      </svg>
      <div className="gnum"><b>{v}<small>%</small></b><span>{label}</span></div>
    </div>
  )
}

export function AxisBars({ mine, theirs, theirName }) {
  return (
    <div className="axes">
      {[0, 1, 2, 3, 4].map((i) => {
        const a = ['Calm', 'Spontaneous', 'Listener', 'Homebody', 'Serious'][i], b = ['Lively', 'Planner', 'Talker', 'Outdoorsy', 'Playful'][i]
        return (
          <div key={i} className="axis">
            <div className="axl"><span>{a}</span><span>{b}</span></div>
            <div className="track"><i className="me" style={{ left: mine[i] + '%' }} />{theirs && <i className="them" style={{ left: theirs[i] + '%' }} />}</div>
          </div>
        )
      })}
      {theirs && <p className="fine"><i className="key me" /> You <i className="key them" /> {theirName}</p>}
    </div>
  )
}

export function Seg({ opts, value, onChange, label }) {
  return <div className="seg" role="tablist" aria-label={label}>{opts.map(([k, l]) => <button key={k} role="tab" aria-selected={value === k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{l}</button>)}</div>
}
export function Toggle({ on, onChange, title, sub }) {
  return <button className={'toggle' + (on ? ' on' : '')} role="switch" aria-checked={on} onClick={() => onChange(!on)}><span>{title}{sub && <small>{sub}</small>}</span><span className="sw" /></button>
}
export function Typing() { return <div className="msg them typing" aria-label="Typing"><i /><i /><i /></div> }
export function Bar({ title, onBack, right }) {
  return <header className="topbar">{onBack ? <button className="iconbtn" onClick={onBack} aria-label="Back"><Icon name="back" /></button> : <span className="iconbtn off" />}<h2>{title}</h2>{right || <span className="iconbtn off" />}</header>
}
export function Progress({ p }) { return <div className="prog" role="progressbar" aria-valuenow={Math.round(p * 100)}><i style={{ width: p * 100 + '%' }} /></div> }
export function Chip({ on, onClick, children, hue }) { return <button className={'chip' + (on ? ' on' : '')} aria-pressed={!!on} onClick={onClick} style={on && hue != null ? { background: `hsl(${hue} 80% 50%)`, borderColor: 'transparent', color: '#fff' } : undefined}>{children}</button> }
export function Qr() {
  const cells = React.useMemo(() => {
    const n = 17, out = []
    let seed = 7
    const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280 }
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const finder = (x < 5 && y < 5) || (x > n - 6 && y < 5) || (x < 5 && y > n - 6)
      const edge = finder && (x === 0 || y === 0 || x === 4 || y === 4 || x === n - 5 || x === n - 1 || y === n - 5 || y === n - 1)
      const core = finder && ((x === 2 && y === 2) || (x === n - 3 && y === 2) || (x === 2 && y === n - 3))
      if (finder ? edge || core : rnd() > 0.5) out.push([x, y])
    }
    return out
  }, [])
  return (
    <svg className="qr" viewBox="0 0 17 17" role="img" aria-label="Sample cafe check-in code">
      {cells.map(([x, y]) => <rect key={x + '-' + y} x={x} y={y} width="1" height="1" fill="#111" />)}
    </svg>
  )
}
