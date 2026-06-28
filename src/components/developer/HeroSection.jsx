import { useState } from 'react'
import LotusThree from '../shared/LotusThree.jsx'
import RevealWrapper from '../shared/RevealWrapper.jsx'
import { ownerProfile } from '../../data/portfolioData.js'

/* ── Role chips — two themed pills replacing the plain badge text ── */
const CodeIcon = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="5 3.5 1.5 8 5 12.5" />
    <polyline points="11 3.5 14.5 8 11 12.5" />
  </svg>
)

const SparkIcon = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor">
    <path d="M8 1 L9.2 6.2 L14.5 7 L10.2 11 L11.4 16.2 L8 13.5 L4.6 16.2 L5.8 11 L1.5 7 L6.8 6.2 Z" transform="scale(0.82) translate(1, 0)" />
  </svg>
)

function RoleChips({ isLightTheme }) {
  const [hovered, setHovered] = useState(null)

  const dk = {
    bg:      'rgba(255,198,219,0.09)',
    border:  'rgba(255,198,219,0.35)',
    bgHov:   'rgba(255,198,219,0.16)',
    borHov:  'rgba(255,198,219,0.55)',
    shadow:  '0 2px 18px rgba(255,198,219,0.14), inset 0 1px 0 rgba(255,255,255,0.08)',
    shadowH: '0 4px 22px rgba(255,198,219,0.28), inset 0 1px 0 rgba(255,255,255,0.10)',
    text:    'rgba(255,235,245,1)',
    icon:    '#ffb3d0',
  }
  const lt = {
    bg:      'rgba(140,25,70,0.08)',
    border:  'rgba(140,25,70,0.32)',
    bgHov:   'rgba(140,25,70,0.14)',
    borHov:  'rgba(140,25,70,0.50)',
    shadow:  '0 2px 14px rgba(140,25,70,0.10), inset 0 1px 0 rgba(255,255,255,0.5)',
    shadowH: '0 4px 18px rgba(140,25,70,0.20), inset 0 1px 0 rgba(255,255,255,0.6)',
    text:    'rgba(100,10,48,1)',
    icon:    '#960f42',
  }
  const pal = isLightTheme ? lt : dk

  const chips = [
    { id: 'dev',     label: 'Full-Stack Developer', Icon: CodeIcon  },
    { id: 'creator', label: 'Content Creator',       Icon: SparkIcon },
  ]

  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 26 }}>
      {chips.map(({ id, label, Icon }) => {
        const isHov = hovered === id
        return (
          <div
            key={id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            7,
              padding:        '8px 18px',
              borderRadius:   999,
              background:     isHov ? pal.bgHov : pal.bg,
              border:         `1px solid ${isHov ? pal.borHov : pal.border}`,
              backdropFilter: 'blur(10px)',
              boxShadow:      isHov ? pal.shadowH : pal.shadow,
              fontFamily:     "'Sora', sans-serif",
              fontSize:       12.5,
              fontWeight:     600,
              letterSpacing:  '0.2px',
              color:          pal.text,
              cursor:         'default',
              transition:     'background .25s, border-color .25s, box-shadow .25s',
              transform:      isHov ? 'translateY(-1px)' : 'none',
            }}
          >
            <span style={{ color: pal.icon, display: 'flex', alignItems: 'center' }}>
              <Icon />
            </span>
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default function HeroSection({ onScrollToJourney, onSwitchMode, onDownloadResume, isLightTheme }) {
  const [primaryBtnHovered, setPrimaryBtnHovered] = useState(false)
  const [resumeBtnHovered,  setResumeBtnHovered]  = useState(false)

  return (
    <section
      style={{
        position:       'relative',
        minHeight:      '100vh',
        overflow:       'hidden',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        textAlign:      'center',
        padding:        '140px clamp(20px, 6vw, 60px) 110px',
      }}
    >
      {/* Background Three.js lotus */}
      <LotusThree isLightTheme={isLightTheme} />

      {/* Portrait — slightly larger */}
      <RevealWrapper
        from="scale(.82)"
        style={{
          position:     'relative',
          zIndex:       3,
          width:        'min(60vw, 240px)',
          height:       'min(60vw, 240px)',
          borderRadius: '50%',
          padding:      5,
          background:   'conic-gradient(from 210deg, #ffffff, #ffe1ec, #ffc6db, #ffffff, #ffd9e6, #ffffff)',
          boxShadow:    '0 0 52px rgba(255,222,236,.45), 0 18px 60px rgba(0,0,0,.55)',
          animation:    'float-up-down 8s ease-in-out infinite',
          marginBottom: 38,
        }}
      >
        <div
          style={{
            width:        '100%',
            height:       '100%',
            borderRadius: '50%',
            overflow:     'hidden',
            border:       '3px solid #050505',
          }}
        >
          <img
            src={ownerProfile.portrait}
            alt={ownerProfile.name}
            style={{
              width:          '100%',
              height:         '100%',
              objectFit:      'cover',
              objectPosition: '62% 26%',
            }}
          />
        </div>
      </RevealWrapper>

      {/* Text content */}
      <RevealWrapper
        delay={120}
        style={{ position: 'relative', zIndex: 3, maxWidth: 660 }}
      >
        <RoleChips isLightTheme={isLightTheme} />

        <h1
          style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontWeight:    500,
            fontSize:      'clamp(40px, 6.2vw, 72px)',
            lineHeight:    1.04,
            letterSpacing: '-.5px',
            margin:        '0 0 20px',
          }}
        >
          Hey, I'm{' '}
          <span
            style={{
              fontStyle:            'italic',
              background:           'linear-gradient(100deg, var(--accent-text), var(--accent2))',
              WebkitBackgroundClip: 'text',
              backgroundClip:       'text',
              WebkitTextFillColor:  'transparent',
            }}
          >
            {ownerProfile.name}.
          </span>
        </h1>

        <p
          style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontStyle:     'italic',
            fontSize:      'clamp(19px, 2.2vw, 24px)',
            fontWeight:    400,
            lineHeight:    1.35,
            color:         'var(--text)',
            maxWidth:      580,
            margin:        '0 auto 10px',
            letterSpacing: '.1px',
          }}
        >
          Software engineer by discipline, storyteller by heart.
        </p>

        <p
          style={{
            fontSize:   15,
            lineHeight: 1.72,
            color:      'var(--text2)',
            maxWidth:   620,
            margin:     '0 auto 36px',
            fontWeight: 300,
          }}
        >
          On one side, I build scalable digital experiences; on the other, I create stories that capture ideas, emotions, and everyday inspiration.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display:        'flex',
            gap:            13,
            flexWrap:       'wrap',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={onScrollToJourney}
            onMouseEnter={() => setPrimaryBtnHovered(true)}
            onMouseLeave={() => setPrimaryBtnHovered(false)}
            style={{
              display:    'inline-flex',
              alignItems: 'center',
              gap:        9,
              padding:    '14px 26px',
              borderRadius: 999,
              border:     'none',
              cursor:     'pointer',
              fontFamily: "'Sora', sans-serif",
              fontSize:   14,
              fontWeight: 600,
              color:      'var(--btn-fg)',
              background: 'var(--btn-bg)',
              boxShadow:  primaryBtnHovered
                ? '0 18px 48px rgba(255,210,228,.45)'
                : '0 12px 36px rgba(255,210,228,.3)',
              transition: '.3s',
              transform:  primaryBtnHovered ? 'translateY(-2px)' : 'none',
            }}
          >
            Explore my journey →
          </button>

          <button
            onClick={onDownloadResume}
            onMouseEnter={() => setResumeBtnHovered(true)}
            onMouseLeave={() => setResumeBtnHovered(false)}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            9,
              padding:        '14px 24px',
              borderRadius:   999,
              cursor:         'pointer',
              fontFamily:     "'Sora', sans-serif",
              fontSize:       14,
              fontWeight:     500,
              color:          'var(--text)',
              background:     'var(--glass-soft)',
              border:         '1px solid var(--border2)',
              backdropFilter: 'blur(12px)',
              transition:     '.3s',
              transform:      resumeBtnHovered ? 'translateY(-2px)' : 'none',
            }}
          >
            Download Resume
          </button>
        </div>
      </RevealWrapper>

    </section>
  )
}
