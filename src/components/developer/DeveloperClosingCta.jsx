import { useState } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'

const PETALS = [
  { delay: 0,   x: 5,  size: 8,  dur: 13, rot: -18 },
  { delay: 3.2, x: 20, size: 5,  dur: 18, rot:  13 },
  { delay: 6.4, x: 37, size: 10, dur: 14, rot:  -4 },
  { delay: 1.6, x: 53, size: 7,  dur: 16, rot:  27 },
  { delay: 8.1, x: 68, size: 5,  dur: 21, rot: -34 },
  { delay: 4.3, x: 82, size: 9,  dur: 12, rot:  16 },
  { delay: 9.8, x: 93, size: 6,  dur: 17, rot:  41 },
  { delay: 2.7, x: 44, size: 4,  dur: 24, rot:  -9 },
]

function LotusOrnament() {
  return (
    <svg viewBox="0 0 80 66" width={58} height={48} style={{ display: 'block', margin: '0 auto' }}>
      <defs>
        <linearGradient id="lo-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f4cedb" stopOpacity="0.96"/>
          <stop offset="100%" stopColor="#ffd7e6" stopOpacity="0.14"/>
        </linearGradient>
      </defs>
      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map(a => (
        <path key={`o${a}`} d="M40 43 C35 31 35 15 40 2 C45 15 45 31 40 43Z"
          fill="url(#lo-g)" transform={`rotate(${a} 40 43)`}/>
      ))}
      {[25.7, 77.1, 128.5, 179.9, 231.3, 282.7, 334.1].map(a => (
        <path key={`i${a}`} d="M40 43 C37 34 37 23 40 15 C43 23 43 34 40 43Z"
          fill="url(#lo-g)" transform={`rotate(${a} 40 43)`} opacity="0.58"/>
      ))}
      <circle cx="40" cy="43" r="5.5" fill="rgba(255,215,230,0.38)"/>
      <circle cx="40" cy="43" r="2.8" fill="#f4cedb"/>
    </svg>
  )
}

function LotusIcon({ hovered }) {
  return (
    <svg viewBox="0 0 20 20" width={16} height={16} style={{
      opacity:    hovered ? 1 : 0.5,
      transition: 'opacity 0.3s, transform 0.38s',
      transform:  hovered ? 'rotate(22deg) scale(1.14)' : 'none',
      flexShrink: 0,
    }}>
      {[0, 51.4, 102.8, 154.2, 205.6, 257, 308.4].map(a => (
        <path key={a} d="M10 13 C7.4 8.6 7.4 3.6 10 0.5 C12.6 3.6 12.6 8.6 10 13Z"
          fill="currentColor" opacity="0.88" transform={`rotate(${a} 10 13)`}/>
      ))}
      <circle cx="10" cy="13" r="2.2" fill="currentColor"/>
    </svg>
  )
}

export default function DeveloperClosingCta({ onSwitchMode, isLightTheme = false }) {
  const [hovered, setHovered] = useState(false)

  /* Button colours that read on both white (light) and near-black (dark) */
  const btn = isLightTheme ? {
    border:    hovered ? 'rgba(158,75,115,0.65)' : 'rgba(158,75,115,0.35)',
    bg:        hovered ? 'rgba(158,75,115,0.12)' : 'rgba(158,75,115,0.06)',
    color:     hovered ? '#6a1e48' : '#9e4b73',
    shadow:    hovered ? '0 0 40px rgba(158,75,115,0.18), 0 8px 28px rgba(140,60,100,0.14)' : 'none',
  } : {
    border:    hovered ? 'rgba(244,206,219,0.55)' : 'rgba(244,206,219,0.2)',
    bg:        hovered ? 'linear-gradient(135deg,rgba(244,206,219,0.22),rgba(220,130,175,0.16))' : 'rgba(244,206,219,0.055)',
    color:     hovered ? '#fff' : 'var(--accent-text)',
    shadow:    hovered ? '0 0 52px rgba(244,206,219,0.16), 0 8px 36px rgba(180,80,130,0.14)' : 'none',
  }

  return (
    <section style={{ position: 'relative', zIndex: 2, textAlign: 'center',
      padding: '72px 24px 108px', overflow: 'hidden' }}>

      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 860, height: 480, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(244,206,219,0.042) 0%, transparent 62%)',
        pointerEvents: 'none',
      }}/>

      {/* Drifting petals */}
      {PETALS.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${p.x}%`, bottom: 0,
          animation: `lotus-drift ${p.dur}s ${p.delay}s ease-in-out infinite`,
          opacity: 0, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 18 28" width={p.size} height={p.size * 1.55}
               style={{ display: 'block', transform: `rotate(${p.rot}deg)` }}>
            <path d="M9 27 C4 20 3 11 9 1 C15 11 14 20 9 27Z" fill="rgba(244,206,219,0.58)"/>
          </svg>
        </div>
      ))}

      {/* Lotus ornament */}
      <RevealWrapper style={{ marginBottom: 22 }}>
        <LotusOrnament />
      </RevealWrapper>

      {/* Quote */}
      <RevealWrapper style={{
        fontFamily:    "'Cormorant Garamond', serif",
        fontStyle:     'italic',
        fontSize:      'clamp(22px, 3.2vw, 37px)',
        color:         'var(--accent-text)',
        maxWidth:      640,
        margin:        '0 auto 13px',
        lineHeight:    1.44,
        letterSpacing: '0.01em',
      }}>
        "I build things that work. I tell stories that stay."
      </RevealWrapper>

      {/* Sub-line */}
      <RevealWrapper style={{
        fontFamily:    "'Sora', sans-serif",
        fontSize:      13,
        color:         'var(--label)',
        maxWidth:      340,
        margin:        '0 auto 48px',
        lineHeight:    1.72,
        letterSpacing: '0.025em',
      }}>
        I live at the intersection of logic and art.
      </RevealWrapper>

      {/* CTA */}
      <RevealWrapper>
        <button
          onClick={onSwitchMode}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display:       'inline-flex',
            alignItems:    'center',
            gap:           11,
            padding:       '14px 30px',
            borderRadius:  999,
            border:        `1.5px solid ${btn.border}`,
            cursor:        'pointer',
            fontFamily:    "'Sora', sans-serif",
            fontSize:      14,
            fontWeight:    500,
            letterSpacing: '0.05em',
            color:         btn.color,
            background:    btn.bg,
            boxShadow:     btn.shadow,
            transition:    'all 0.38s cubic-bezier(0.2, 0.8, 0.2, 1)',
            transform:     hovered ? 'translateY(-3px)' : 'none',
          }}
        >
          Meet the creator in me
          <LotusIcon hovered={hovered} />
        </button>
      </RevealWrapper>
    </section>
  )
}
