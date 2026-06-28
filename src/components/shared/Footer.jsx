import { useState } from 'react'
import RevealWrapper from './RevealWrapper.jsx'
import { ownerProfile } from '../../data/portfolioData.js'

/* ── Social icon SVGs ──────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.5 4.6 5.8V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.4-2 2.7V21H9z" />
  </svg>
)
const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 3.9-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2Z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
    <rect x="2" y="4" width="20" height="16" rx="2.5" />
    <polyline points="2,7 12,13.5 22,7" />
  </svg>
)

/* ── Pond ecosystem — night & day ──────────────────────────────── */
function PondScene({ isLight }) {
  const lilyPath = (rx, ry) => {
    const x = +(rx * Math.cos(80 * Math.PI / 180)).toFixed(2)
    const y = +(ry * Math.sin(80 * Math.PI / 180)).toFixed(2)
    return `M 0 0 L ${-x} ${y} A ${rx} ${ry} 0 1 1 ${x} ${y} Z`
  }
  const lilyRim = (rx, ry) => {
    const x = +(rx * Math.cos(80 * Math.PI / 180)).toFixed(2)
    const y = +(ry * Math.sin(80 * Math.PI / 180)).toFixed(2)
    return `M ${-x} ${y} A ${rx} ${ry} 0 1 1 ${x} ${y}`
  }
  const swayStyle = (dur, delay) => ({
    animation: `lily-sway ${dur}s ${delay}s ease-in-out infinite`,
    transformBox: 'fill-box', transformOrigin: 'center center',
  })
  const rippleStyle = (dur, delay) => ({
    animation: `ripple-scale ${dur}s ${delay}s ease-out infinite`,
    transformBox: 'fill-box', transformOrigin: 'center center',
  })

  const OA = [0, 51.4, 102.8, 154.2, 205.6, 257, 308.4]
  const IA = [25.7, 77.1, 128.5, 179.9, 231.3, 282.7, 334.1]

  /* ── palette ─────────────────────────────────────── */
  const p = isLight ? {
    waterBg:   'linear-gradient(180deg, #e8f2ee 0%, #d2e8e0 20%, #b8d4ca 40%, #96bcb0 62%, #78a898 100%)',
    shineSt1:  'rgba(255,250,220,0)',
    shineSt2:  'rgba(255,250,220,0.22)',
    shineSt3:  'rgba(255,255,240,0.36)',
    padFill:   '#2e6035',
    padRim:    '#3d7844',
    padVein:   '#4a8a50',
    rip:       'rgba(255,255,255,0.42)',
    l1outer:   '#e8608a',
    l1inner:   '#f0a0be',
    l2outer:   '#f0b0c8',
    l2inner:   '#ffd8e8',
    l3outer:   '#d84e80',
    l3inner:   '#e890b0',
    stamen:    '#ffd040',
    stamInner: '#f0a020',
    budOuter:  '#e8608a',
    budInner:  '#f0a0be',
    budStamen: '#ffd040',
  } : {
    waterBg:   'linear-gradient(180deg, transparent 0%, #04080e 14%, #060d18 100%)',
    shineSt1:  'rgba(180,220,255,0)',
    shineSt2:  'rgba(180,220,255,0.07)',
    shineSt3:  'rgba(200,235,255,0.12)',
    padFill:   '#1a3620',
    padRim:    '#2d5a34',
    padVein:   '#2d5a34',
    rip:       'rgba(160,215,235,0.28)',
    l1outer:   '#f4cedb',
    l1inner:   '#ffe4ee',
    l2outer:   '#ffc6db',
    l2inner:   '#ffe4f0',
    l3outer:   '#f4cedb',
    l3inner:   '#ffdaec',
    stamen:    '#ffed8a',
    stamInner: '#e8a030',
    budOuter:  '#f4cedb',
    budInner:  '#ffe4f0',
    budStamen: '#ffed8a',
  }

  /* ── daytime sparkles / night fireflies ─────────── */
  const DOTS = isLight ? [
    { x: '8%',  top: 58, gDur: 1.8, dDur: 7,  delay: 0,   color: 'rgba(255,252,210,0.95)', glow: 'rgba(255,240,160,0.55)' },
    { x: '24%', top: 42, gDur: 2.4, dDur: 5,  delay: 1.1, color: 'rgba(255,255,230,0.9)',  glow: 'rgba(255,245,180,0.45)' },
    { x: '45%', top: 75, gDur: 1.5, dDur: 9,  delay: 0.5, color: 'rgba(255,252,210,0.95)', glow: 'rgba(255,240,150,0.5)'  },
    { x: '65%', top: 40, gDur: 2.1, dDur: 6,  delay: 2.0, color: 'rgba(255,255,235,0.9)',  glow: 'rgba(255,248,190,0.45)' },
    { x: '82%', top: 62, gDur: 1.9, dDur: 8,  delay: 0.3, color: 'rgba(255,252,210,0.95)', glow: 'rgba(255,240,160,0.5)'  },
    { x: '95%', top: 35, gDur: 2.7, dDur: 5,  delay: 1.6, color: 'rgba(255,255,240,0.9)',  glow: 'rgba(255,248,180,0.4)'  },
  ] : [
    { x: '10%', top: 62, gDur: 2.5, dDur: 8,  delay: 0,   color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
    { x: '28%', top: 46, gDur: 3.3, dDur: 6,  delay: 1.4, color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
    { x: '48%', top: 82, gDur: 1.8, dDur: 11, delay: 0.6, color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
    { x: '66%', top: 44, gDur: 2.9, dDur: 7,  delay: 2.2, color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
    { x: '85%', top: 68, gDur: 2.2, dDur: 9,  delay: 0.3, color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
    { x: '93%', top: 38, gDur: 3.7, dDur: 5,  delay: 1.8, color: 'rgba(255,248,160,0.96)', glow: 'rgba(255,242,120,0.45)' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: 240, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: p.waterBg }}/>

      <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="ps-shine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={p.shineSt1} stopOpacity="0"/>
            <stop offset="25%"  stopColor={p.shineSt2} stopOpacity="1"/>
            <stop offset="50%"  stopColor={p.shineSt3} stopOpacity="1"/>
            <stop offset="75%"  stopColor={p.shineSt2} stopOpacity="1"/>
            <stop offset="100%" stopColor={p.shineSt1} stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Water shimmer */}
        <line x1="0" y1="38"  x2="1200" y2="38"  stroke="url(#ps-shine)" strokeWidth="1"/>
        <line x1="0" y1="68"  x2="1200" y2="68"  stroke="url(#ps-shine)" strokeWidth="1.5"/>
        <line x1="0" y1="105" x2="1200" y2="105" stroke="url(#ps-shine)" strokeWidth="1.2"/>

        {/* ── Lily pad 1 — left, medium ── */}
        <g transform="translate(420, 168)">
          <g style={swayStyle(6.5, 0)}>
            <path d={lilyPath(52,30)} fill={p.padFill} opacity="0.92"/>
            <path d={lilyRim(52,30)}  fill="none" stroke={p.padRim} strokeWidth="1.4" opacity="0.55"/>
            <line x1="0" y1="0" x2="0"   y2="-30" stroke={p.padVein} strokeWidth="0.8" opacity="0.28"/>
            <line x1="0" y1="0" x2="46"  y2="-15" stroke={p.padVein} strokeWidth="0.7" opacity="0.22"/>
            <line x1="0" y1="0" x2="-46" y2="-15" stroke={p.padVein} strokeWidth="0.7" opacity="0.22"/>
            <line x1="0" y1="0" x2="30"  y2="26"  stroke={p.padVein} strokeWidth="0.6" opacity="0.18"/>
            <line x1="0" y1="0" x2="-30" y2="26"  stroke={p.padVein} strokeWidth="0.6" opacity="0.18"/>
          </g>
        </g>
        <g transform="translate(420, 157)">
          {OA.map(a => <path key={`l1o${a}`} d="M 0 0 C -5.5 -10 -4.5 -24 0 -30 C 4.5 -24 5.5 -10 0 0 Z" fill={p.l1outer} opacity="0.87" transform={`rotate(${a})`}/>)}
          {IA.map(a => <path key={`l1i${a}`} d="M 0 0 C -3.8 -7 -3.2 -17 0 -21 C 3.2 -17 3.8 -7 0 0 Z" fill={p.l1inner} opacity="0.78" transform={`rotate(${a})`}/>)}
          <circle r="5.8" fill={p.stamen} opacity="0.9"/>
          <circle r="2.6" fill={p.stamInner}/>
        </g>
        <g transform="translate(428, 186)">
          {[0,1.3,2.6].map(d => <circle key={d} r="55" fill="none" stroke={p.rip} strokeWidth="1.3" style={rippleStyle(3.8,d)}/>)}
        </g>

        {/* ── Lily pad 2 — centre, small ── */}
        <g transform="translate(575, 150)">
          <g style={swayStyle(7.8, 2.2)}>
            <path d={lilyPath(32,19)} fill={p.padFill} opacity="0.88"/>
            <path d={lilyRim(32,19)}  fill="none" stroke={p.padRim} strokeWidth="1" opacity="0.5"/>
            <line x1="0" y1="0" x2="0"   y2="-19" stroke={p.padVein} strokeWidth="0.7" opacity="0.26"/>
            <line x1="0" y1="0" x2="28"  y2="-9"  stroke={p.padVein} strokeWidth="0.6" opacity="0.2"/>
            <line x1="0" y1="0" x2="-28" y2="-9"  stroke={p.padVein} strokeWidth="0.6" opacity="0.2"/>
          </g>
        </g>
        <g transform="translate(579, 141)" style={{ opacity: 0.82 }}>
          {OA.map(a => <path key={`l2o${a}`} d="M 0 0 C -3.8 -7 -3.2 -17 0 -21 C 3.2 -17 3.8 -7 0 0 Z" fill={p.l2outer} opacity="0.86" transform={`rotate(${a})`}/>)}
          {IA.map(a => <path key={`l2i${a}`} d="M 0 0 C -2.5 -5 -2.1 -12 0 -15 C 2.1 -12 2.5 -5 0 0 Z" fill={p.l2inner} opacity="0.76" transform={`rotate(${a})`}/>)}
          <circle r="3.8" fill={p.stamen} opacity="0.88"/>
          <circle r="1.8" fill={p.stamInner}/>
        </g>
        <g transform="translate(675, 128)">
          {[0,2].map(d => <circle key={d} r="40" fill="none" stroke={p.rip} strokeWidth="1" style={rippleStyle(5.5,d+0.5)}/>)}
        </g>

        {/* ── Lily pad 3 — right, large ── */}
        <g transform="translate(750, 175)">
          <g style={swayStyle(5.6, 0.8)}>
            <path d={lilyPath(63,37)} fill={p.padFill} opacity="0.93"/>
            <path d={lilyRim(63,37)}  fill="none" stroke={p.padRim} strokeWidth="1.8" opacity="0.57"/>
            <line x1="0" y1="0" x2="0"   y2="-37" stroke={p.padVein} strokeWidth="0.9" opacity="0.3"/>
            <line x1="0" y1="0" x2="56"  y2="-18" stroke={p.padVein} strokeWidth="0.8" opacity="0.25"/>
            <line x1="0" y1="0" x2="-56" y2="-18" stroke={p.padVein} strokeWidth="0.8" opacity="0.25"/>
            <line x1="0" y1="0" x2="38"  y2="32"  stroke={p.padVein} strokeWidth="0.7" opacity="0.2"/>
            <line x1="0" y1="0" x2="-38" y2="32"  stroke={p.padVein} strokeWidth="0.7" opacity="0.2"/>
          </g>
        </g>
        <g transform="translate(755, 162)">
          {OA.map(a => <path key={`l3o${a}`} d="M 0 0 C -7 -13 -6 -30 0 -38 C 6 -30 7 -13 0 0 Z" fill={p.l3outer} opacity="0.9" transform={`rotate(${a})`}/>)}
          {IA.map(a => <path key={`l3i${a}`} d="M 0 0 C -4.5 -9 -4 -21 0 -26 C 4 -21 4.5 -9 0 0 Z" fill={p.l3inner} opacity="0.82" transform={`rotate(${a})`}/>)}
          <circle r="7" fill={p.stamen} opacity="0.9"/>
          <circle r="3.2" fill={p.stamInner}/>
        </g>
        <g transform="translate(762, 196)">
          {[0,1.4,2.8].map(d => <circle key={d} r="60" fill="none" stroke={p.rip} strokeWidth="1.4" style={rippleStyle(4.3,d+1.5)}/>)}
        </g>

        {/* ── Lily pad 4 — far right, tiny ── */}
        <g transform="translate(880, 148)">
          <g style={swayStyle(9.2, 4.0)}>
            <path d={lilyPath(26,15)} fill={p.padFill} opacity="0.85"/>
          </g>
        </g>

        {/* Floating buds */}
        <g transform="translate(500, 132)" style={{ opacity: 0.58 }}>
          <path d="M 0 0 C -2.2 -4.5 -1.8 -10 0 -12.5 C 1.8 -10 2.2 -4.5 0 0 Z" fill={p.budOuter}/>
          <path d="M 0 0 C -1.5 -3 -1.2 -7 0 -9 C 1.2 -7 1.5 -3 0 0 Z" fill={p.budInner} opacity="0.85"/>
          <circle r="2" fill={p.budStamen} opacity="0.85"/>
        </g>
        <g transform="translate(650, 155)" style={{ opacity: 0.46 }}>
          <path d="M 0 0 C -3 -6 -2.5 -14 0 -17 C 2.5 -14 3 -6 0 0 Z" fill={p.budOuter}/>
          <path d="M 0 0 C -2 -4 -1.6 -10 0 -12 C 1.6 -10 2 -4 0 0 Z" fill={p.budInner} opacity="0.8"/>
          <circle r="2.5" fill={p.budStamen} opacity="0.8"/>
        </g>

        <rect x="0" y="205" width="1200" height="20" fill={isLight ? 'rgba(255,255,255,0.06)' : 'rgba(140,190,230,0.018)'}/>
      </svg>

      {/* Fireflies (night) / Sun sparkles (day) */}
      {DOTS.map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.x, top: d.top,
          width: isLight ? 3 : 4, height: isLight ? 3 : 4,
          borderRadius: '50%',
          background: d.color,
          boxShadow: `0 0 ${isLight ? 6 : 8}px ${isLight ? 3 : 4}px ${d.glow}, 0 0 ${isLight ? 12 : 20}px ${isLight ? 5 : 7}px ${d.glow}`,
          animation: `firefly-glow ${d.gDur}s ${d.delay}s ease-in-out infinite, firefly-drift ${d.dDur}s ${d.delay * 0.4 + 1}s ease-in-out infinite`,
          pointerEvents: 'none',
        }}/>
      ))}
    </div>
  )
}

/* ── Circular social button ─────────────────────────────────────── */
function SocialOrb({ href, icon, label, background, glowColor, isLight }) {
  const [hovered, setHovered] = useState(false)
  const lc = isLight
    ? { idle: 'rgba(40,60,50,0.48)', hover: 'rgba(20,40,30,0.88)' }
    : { idle: 'rgba(255,255,255,0.42)', hover: 'rgba(255,255,255,0.85)' }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={label}
       onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
       style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
         gap: 10, textDecoration: 'none', cursor: 'pointer' }}>
      <div style={{
        width: 60, height: 60, borderRadius: '50%', background,
        display: 'grid', placeItems: 'center', color: '#fff',
        boxShadow: hovered
          ? `0 0 0 4px rgba(255,255,255,0.08), 0 12px 36px ${glowColor}`
          : `0 6px 20px ${glowColor}`,
        transform: hovered ? 'translateY(-5px) scale(1.08)' : 'scale(1)',
        transition: 'all 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        {icon}
      </div>
      <span style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 12,
        fontWeight: 400, letterSpacing: '0.3px', transition: 'color 0.3s',
        color: hovered ? lc.hover : lc.idle }}>
        {label}
      </span>
    </a>
  )
}

/* ── Lotus divider ──────────────────────────────────────────────── */
function LotusDecor({ isLight }) {
  return (
    <svg viewBox="0 0 240 160" width="64" height="43"
         style={{ display: 'block', opacity: isLight ? 0.28 : 0.38 }}>
      <defs>
        <linearGradient id="fp-petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={isLight ? '#8a4060' : '#ffffff'} stopOpacity="0.9"/>
          <stop offset="100%" stopColor={isLight ? '#c88090' : '#ffc6db'} stopOpacity="0.14"/>
        </linearGradient>
      </defs>
      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map(a => (
        <path key={a} d="M120 95 C108 70 108 38 120 14 C132 38 132 70 120 95 Z"
          fill="url(#fp-petal)" transform={`rotate(${a} 120 95)`}/>
      ))}
      {[0, 72, 144, 216, 288].map(a => (
        <path key={a} d="M120 95 C113 78 113 58 120 42 C127 58 127 78 120 95 Z"
          fill="url(#fp-petal)" transform={`rotate(${a} 120 95)`} opacity="0.62"/>
      ))}
      <circle cx="120" cy="95" r="7"
              fill={isLight ? 'rgba(138,64,96,0.25)' : 'rgba(255,255,255,0.62)'}/>
      <circle cx="120" cy="95" r="3" fill={isLight ? '#c88090' : '#ffd0e0'}/>
    </svg>
  )
}

/* ── Footer ─────────────────────────────────────────────────────── */
export default function Footer({ isCreatorMode = false, isLightTheme = false }) {
  const year = new Date().getFullYear()

  const c = isLightTheme ? {
    bg:       'linear-gradient(180deg, transparent 0%, rgba(240,246,243,0.97) 20%, #e8f2ee 100%)',
    ambient:  'radial-gradient(ellipse, rgba(175,210,195,0.18) 0%, transparent 70%)',
    label:    'rgba(55,80,65,0.48)',
    heading:  '#1e3028',
    beautiful:'linear-gradient(110deg, #9e3a60, #c06888)',
    body:     'rgba(45,68,55,0.62)',
    copy:     'rgba(50,72,60,0.7)',
    year:     'rgba(50,72,60,0.38)',
    divL:     'rgba(60,80,70,0.13)',
    divR:     'rgba(60,80,70,0.13)',
  } : {
    bg: isCreatorMode
      ? 'linear-gradient(180deg, transparent 0%, rgba(22,6,38,0.97) 22%, #0e0518 100%)'
      : 'linear-gradient(180deg, transparent 0%, rgba(6,5,14,0.97) 22%, #04030a 100%)',
    ambient: isCreatorMode
      ? 'radial-gradient(ellipse, rgba(175,55,135,0.07) 0%, transparent 70%)'
      : 'radial-gradient(ellipse, rgba(200,80,106,0.07) 0%, transparent 70%)',
    label:    'rgba(255,255,255,0.36)',
    heading:  '#f2eaf0',
    beautiful:'linear-gradient(110deg, #f4cedb, #ffd7e6)',
    body:     'rgba(255,255,255,0.5)',
    copy:     'rgba(255,255,255,0.72)',
    year:     'rgba(255,255,255,0.28)',
    divL:     'rgba(255,255,255,0.09)',
    divR:     'rgba(255,255,255,0.09)',
  }

  return (
    <footer style={{ position: 'relative', zIndex: 2, overflow: 'hidden', background: c.bg }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: 560, height: 340, borderRadius: '50%',
        background: c.ambient, pointerEvents: 'none',
      }}/>

      {/* ── Connect section ─────────────────────────── */}
      <div style={{ maxWidth: 780, margin: '0 auto',
        padding: '52px clamp(24px, 7vw, 72px) 56px',
        textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <RevealWrapper>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            fontSize: 13, letterSpacing: '3px', textTransform: 'uppercase',
            color: c.label, marginBottom: 18 }}>
            Connect with me
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
            fontWeight: 400, fontSize: 'clamp(36px, 5.5vw, 60px)', lineHeight: 1.06,
            letterSpacing: '-.4px', margin: '0 0 20px', color: c.heading }}>
            Let's build something{' '}
            <span style={{ display: 'inline-block', backgroundImage: c.beautiful,
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', color: 'transparent' }}>
              beautiful.
            </span>
          </h2>
          <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 15,
            fontWeight: 300, lineHeight: 1.75, color: c.body, maxWidth: 440, margin: '0 auto 52px' }}>
            Whether it's a great opportunity, a collaboration, or just to say hello —
            my inbox is always open.
          </p>
        </RevealWrapper>

        <RevealWrapper from="translateY(28px)" delay={100}>
          <div style={{ display: 'flex', gap: 36, justifyContent: 'center',
            alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <SocialOrb href={ownerProfile.links.instagram} icon={<InstagramIcon />}
              label="Instagram" isLight={isLightTheme}
              background="linear-gradient(45deg,#f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)"
              glowColor="rgba(220,39,67,0.35)"/>
            <SocialOrb href={ownerProfile.links.linkedin} icon={<LinkedInIcon />}
              label="LinkedIn" isLight={isLightTheme}
              background="linear-gradient(135deg,#0077b5,#00a0dc)"
              glowColor="rgba(0,119,181,0.35)"/>
            <SocialOrb href={ownerProfile.links.github} icon={<GitHubIcon />}
              label="GitHub" isLight={isLightTheme}
              background="linear-gradient(135deg,#2b3137,#484f58)"
              glowColor="rgba(100,110,120,0.30)"/>
            <SocialOrb href={`mailto:${ownerProfile.email}`} icon={<MailIcon />}
              label="Email" isLight={isLightTheme}
              background="linear-gradient(135deg,#ea4335,#d93025)"
              glowColor="rgba(234,67,53,0.35)"/>
          </div>
        </RevealWrapper>
      </div>

      {/* ── Lotus divider ───────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20,
        padding: '0 clamp(24px, 7vw, 72px)', maxWidth: 780, margin: '0 auto',
        position: 'relative', zIndex: 1 }}>
        <div style={{ flex: 1, height: 1,
          background: `linear-gradient(90deg, transparent, ${c.divL})` }}/>
        <LotusDecor isLight={isLightTheme}/>
        <div style={{ flex: 1, height: 1,
          background: `linear-gradient(90deg, ${c.divR}, transparent)` }}/>
      </div>

      {/* ── Copyright ───────────────────────────────── */}
      <div style={{ padding: '28px clamp(24px, 7vw, 72px) 32px', maxWidth: 780,
        margin: '0 auto', display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 8, textAlign: 'center',
        position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic',
          fontWeight: 400, fontSize: 18, letterSpacing: '.3px', color: c.copy, margin: 0 }}>
          Made with love and dedication by Gayani{' '}
          <span style={{ fontStyle: 'normal', fontSize: 20, verticalAlign: 'middle',
            background: 'linear-gradient(135deg,#ff6b8a,#ff9468)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent' }}>
            ♥
          </span>
        </p>
        <p style={{ fontFamily: "'Sora', system-ui, sans-serif", fontSize: 12,
          fontWeight: 300, letterSpacing: '.5px', color: c.year, margin: 0 }}>
          © {year} · All rights reserved
        </p>
      </div>

      {/* ── Pond ecosystem — developer mode only ───── */}
      {!isCreatorMode && <PondScene isLight={isLightTheme}/>}
    </footer>
  )
}
