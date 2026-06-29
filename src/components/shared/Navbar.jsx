import { useState, useEffect } from 'react'


const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" strokeLinecap="round" />
  </svg>
)

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function Navbar({
  isDeveloperMode,
  isLightTheme,
  isTransitioning,
  switchLabel,
  switchOrbGradient,
  onSwitchMode,
  onToggleTheme,
  onLogoClick,
}) {
  const [modeSwitchHovered, setModeSwitchHovered] = useState(false)
  const [isSmall, setIsSmall] = useState(() => window.innerWidth < 640)

  useEffect(() => {
    const handler = () => setIsSmall(window.innerWidth < 640)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const firstNameColor = isLightTheme ? '#1a1a1a'              : '#ffffff'
  const lastNameColor  = isLightTheme ? 'rgba(30,30,30,0.52)'  : 'rgba(255,255,255,0.45)'

  return (
    <header
      style={{
        position:       'fixed',
        top:            0,
        left:           0,
        right:          0,
        zIndex:         60,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '18px clamp(20px, 4vw, 52px)',
      }}
    >
      {/* ── Logo ─────────────────────────────────────────── */}
      <button
        onClick={onLogoClick}
        style={{
          display:    'flex',
          alignItems: 'center',
          background: 'none',
          border:     'none',
          padding:    0,
          cursor:     'pointer',
        }}
      >
        {/* Name — write-on animation */}
        <span
          style={{
            display:    'inline-flex',
            alignItems: 'baseline',
            gap:        6,
            whiteSpace: 'nowrap',
            animation:  'name-write 1.4s cubic-bezier(0.22, 0.8, 0.36, 1) 0.15s both',
          }}
        >
          {/* Cursive first name */}
          <span
            style={{
              fontFamily:    "'Dancing Script', cursive",
              fontWeight:    700,
              fontSize:      'clamp(22px, 2.4vw, 28px)',
              letterSpacing: '.3px',
              color:         firstNameColor,
              lineHeight:    1,
              transition:    'color 0.3s',
            }}
          >
            Gayani
          </span>

          {/* Last name */}
          <span
            style={{
              fontFamily:    "'Cormorant Garamond', serif",
              fontStyle:     'normal',
              fontWeight:    500,
              fontSize:      'clamp(15px, 1.6vw, 18px)',
              letterSpacing: '.6px',
              lineHeight:    1,
              color:         lastNameColor,
              transition:    'color 0.3s',
            }}
          >
            Polireddy
          </span>
        </span>

        {/* Pen cursor — blinks 3× then disappears */}
        <span
          style={{
            display:      'inline-block',
            width:        1.5,
            height:       16,
            borderRadius: 2,
            background:   '#e8849a',
            animation:    'cursor-life 2s ease 1.55s forwards',
            opacity:      0,
            verticalAlign: 'middle',
          }}
        />
      </button>

      {/* ── Right controls ───────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {isDeveloperMode && (
          <button
            onClick={onToggleTheme}
            title="Toggle light & dark"
            style={{
              width:          40,
              height:         40,
              borderRadius:   '50%',
              border:         '1px solid var(--border2)',
              background:     'var(--glass-soft)',
              backdropFilter: 'blur(12px)',
              color:          'var(--text2)',
              cursor:         'pointer',
              display:        'grid',
              placeItems:     'center',
              transition:     '.25s',
            }}
          >
            {isLightTheme ? <SunIcon /> : <MoonIcon />}
          </button>
        )}

        <button
          onClick={onSwitchMode}
          disabled={isTransitioning}
          onMouseEnter={() => setModeSwitchHovered(true)}
          onMouseLeave={() => setModeSwitchHovered(false)}
          style={{
            display:        'flex',
            alignItems:     'center',
            gap:            isSmall ? 6 : 10,
            padding:        isSmall ? '6px 6px 6px 11px' : '9px 9px 9px 18px',
            borderRadius:   999,
            border:         '1px solid var(--border2)',
            background:     modeSwitchHovered ? 'rgba(255,255,255,.12)' : 'var(--glass-soft)',
            backdropFilter: 'blur(14px)',
            cursor:         isTransitioning ? 'default' : 'pointer',
            color:          'var(--text)',
            fontFamily:     "'Sora', sans-serif",
            fontSize:       isSmall ? 11 : 13,
            fontWeight:     500,
            transition:     '.3s',
            transform:      modeSwitchHovered ? 'translateY(-1px)' : 'none',
          }}
        >
          <span>{isSmall ? switchLabel.replace(' Mode', '') : switchLabel}</span>
          <span
            style={{
              width:        isSmall ? 24 : 30,
              height:       isSmall ? 24 : 30,
              borderRadius: '50%',
              display:      'grid',
              placeItems:   'center',
              background:   switchOrbGradient,
              boxShadow:    '0 4px 16px rgba(0,0,0,.4)',
            }}
          >
            <ArrowIcon />
          </span>
        </button>
      </div>
    </header>
  )
}
