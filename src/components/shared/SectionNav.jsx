import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'sec-hero',    label: 'Introduction' },
  { id: 'sec-journey', label: 'My Journey'   },
  { id: 'sec-stack',   label: 'Tech Stack'   },
  { id: 'sec-connect', label: 'Connect'      },
]

const ChevUp = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
)
const ChevDown = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

export default function SectionNav() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [visible,   setVisible]   = useState(false)
  const [hovered,   setHovered]   = useState(null)
  const [isWide,    setIsWide]    = useState(() => window.innerWidth >= 900)

  useEffect(() => {
    const onResize = () => setIsWide(window.innerWidth >= 900)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      setVisible(scrollY > 110)

      /* Find which section's centre is closest to 45% down the viewport */
      const midY = scrollY + window.innerHeight * 0.45
      let bestIdx = 0, bestDist = Infinity

      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (!el) return
        const top    = scrollY + el.getBoundingClientRect().top
        const centre = top + el.offsetHeight / 2
        const dist   = Math.abs(centre - midY)
        if (dist < bestDist) { bestDist = dist; bestIdx = i }
      })

      setActiveIdx(bestIdx)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  const prev = activeIdx > 0                    ? SECTIONS[activeIdx - 1] : null
  const curr = SECTIONS[activeIdx]
  const next = activeIdx < SECTIONS.length - 1  ? SECTIONS[activeIdx + 1] : null

  if (!isWide) return null

  /* ── Row styles ───────────────────────────────── */
  const rowBase = {
    display:       'flex',
    alignItems:    'center',
    gap:           7,
    padding:       '9px 14px',
    border:        'none',
    cursor:        'pointer',
    fontFamily:    "'Sora', sans-serif",
    fontSize:      11,
    fontWeight:    400,
    letterSpacing: '0.25px',
    textAlign:     'left',
    whiteSpace:    'nowrap',
    transition:    'color 0.2s, background 0.2s',
  }

  return (
    <div style={{
      position:      'fixed',
      right:         22,
      top:           '50%',
      transform:     'translateY(-50%)',
      zIndex:        50,
      opacity:       visible ? 1 : 0,
      pointerEvents: visible ? 'auto' : 'none',
      transition:    'opacity 0.45s ease',
    }}>
      <div style={{
        display:              'flex',
        flexDirection:        'column',
        minWidth:             148,
        background:           'var(--glass-soft)',
        backdropFilter:       'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border:               '1px solid var(--border2)',
        borderRadius:         13,
        overflow:             'hidden',
      }}>

        {/* ── PREV ──────────────────────────────── */}
        {prev ? (
          <button
            onClick={() => scrollTo(prev.id)}
            onMouseEnter={() => setHovered('prev')}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...rowBase,
              background:   hovered === 'prev' ? 'rgba(244,206,219,0.1)' : 'transparent',
              borderBottom: '1px solid var(--border2)',
              color:        hovered === 'prev' ? 'var(--accent-text)' : 'var(--label)',
            }}
          >
            <ChevUp /> {prev.label}
          </button>
        ) : (
          /* empty top cap so the card doesn't jump when at section 0 */
          <div style={{ height: 37, borderBottom: '1px solid var(--border2)' }}/>
        )}

        {/* ── CURRENT ───────────────────────────── */}
        <div style={{
          display:      'flex',
          alignItems:   'center',
          gap:          9,
          padding:      '11px 14px',
          borderBottom: next ? '1px solid var(--border2)' : 'none',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent-text)',
            flexShrink: 0,
            boxShadow:  '0 0 7px var(--accent-text)',
          }}/>
          <span style={{
            fontFamily:    "'Sora', sans-serif",
            fontSize:      12,
            fontWeight:    600,
            letterSpacing: '0.25px',
            color:         'var(--text)',
            whiteSpace:    'nowrap',
          }}>
            {curr.label}
          </span>
        </div>

        {/* ── NEXT ──────────────────────────────── */}
        {next ? (
          <button
            onClick={() => scrollTo(next.id)}
            onMouseEnter={() => setHovered('next')}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...rowBase,
              background: hovered === 'next' ? 'rgba(244,206,219,0.1)' : 'transparent',
              color:      hovered === 'next' ? 'var(--accent-text)' : 'var(--label)',
            }}
          >
            <ChevDown /> {next.label}
          </button>
        ) : (
          <div style={{ height: 37 }}/>
        )}

      </div>
    </div>
  )
}
