import { useRef } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'
import { useStemProgress } from '../../hooks/useStemProgress.js'

/* ─── Shared SVG gradient defs — one hidden block, all nodes reference these ── */
function LotusGradientDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
      <defs>
        <radialGradient id="jrn-petal-outer" cx="50%" cy="78%" r="68%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.96" />
          <stop offset="45%"  stopColor="#ffdaec" stopOpacity="0.82" />
          <stop offset="100%" stopColor="#ffadd0" stopOpacity="0.36" />
        </radialGradient>
        <radialGradient id="jrn-petal-inner" cx="50%" cy="75%" r="68%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"    />
          <stop offset="55%"  stopColor="#ffcce0" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#ff8cba" stopOpacity="0.52" />
        </radialGradient>
        <radialGradient id="jrn-center" cx="38%" cy="38%" r="60%">
          <stop offset="0%"   stopColor="#fff6d0" stopOpacity="1"    />
          <stop offset="55%"  stopColor="#ffce63" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ff9933" stopOpacity="0.70" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/* ─── Multi-layer lotus SVG node ─────────────────────────────────── */
function LotusNode() {
  const outerAngles = [0, 45, 90, 135, 180, 225, 270, 315]
  const innerAngles = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

  return (
    <div style={{ position: 'relative', width: 60, height: 60, display: 'grid', placeItems: 'center' }}>
      {/* Ambient halo */}
      <div style={{
        position: 'absolute', inset: -6, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,180,210,.52), transparent 65%)',
        filter: 'blur(8px)',
      }} />
      <svg
        viewBox="0 0 100 100"
        width="54" height="54"
        style={{ overflow: 'visible', position: 'relative', filter: 'drop-shadow(0 0 7px rgba(255,148,192,.65))' }}
      >
        {/* Outer petal ring */}
        {outerAngles.map(a => (
          <path
            key={`o${a}`}
            d="M50 50 C42 32 42 13 50 2 C58 13 58 32 50 50 Z"
            fill="url(#jrn-petal-outer)"
            transform={`rotate(${a} 50 50)`}
          />
        ))}
        {/* Inner petal ring */}
        {innerAngles.map(a => (
          <path
            key={`i${a}`}
            d="M50 50 C45 37 45 23 50 13 C55 23 55 37 50 50 Z"
            fill="url(#jrn-petal-inner)"
            transform={`rotate(${a} 50 50)`}
          />
        ))}
        {/* Golden glowing centre */}
        <circle cx="50" cy="50" r="9"   fill="url(#jrn-center)" />
        <circle cx="50" cy="50" r="4.5" fill="#fffaee" />
      </svg>
    </div>
  )
}

/* ─── Experience card ────────────────────────────────────────────── */
function ExperienceCard({ entry }) {
  return (
    <div
      className="jrn-exp-card"
      style={{
        width: '100%',
        background: 'var(--panel)',
        border: '1px solid var(--border2)',
        borderRadius: 22,
        padding: '24px 28px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 24px 60px rgba(0,0,0,.42)',
        transition: 'box-shadow .35s',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 32px 80px rgba(255,210,228,.18)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 24px 60px rgba(0,0,0,.42)' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 14 }}>
        <div style={{
          flexShrink: 0,
          width: entry.logo ? 80 : 46,
          height: 46,
          borderRadius: 13,
          display: 'grid', placeItems: 'center',
          background: entry.logoBg ?? 'var(--glass-soft)',
          border: '1px solid var(--border2)',
          overflow: 'hidden',
          padding: entry.logo ? '6px 10px' : 0,
        }}>
          {entry.logo
            ? <img src={entry.logo} alt={entry.organisation} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            : <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: 'var(--accent-text)' }}>{entry.initial}</span>
          }
        </div>
        <div style={{ minWidth: 0, textAlign: 'left' }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, fontSize: 22, margin: 0,
            color: 'var(--text)', lineHeight: 1.12,
          }}>
            {entry.role}
          </h3>
          <div style={{ fontSize: 13, color: 'var(--accent-text)', fontWeight: 500, marginTop: 2 }}>
            {entry.organisation} · {entry.location}
          </div>
        </div>
      </div>

      {/* Period */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '.5px', color: 'var(--text3)' }}>
          {entry.period}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.3px',
          color: 'var(--text)', padding: '3px 10px', borderRadius: 999,
          background: 'var(--glass-soft)', border: '1px solid var(--border2)', whiteSpace: 'nowrap',
        }}>
          {entry.duration}
        </span>
      </div>

      {/* Achievements */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        {entry.achievements.map((a, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '13.5px', lineHeight: 1.55, color: 'var(--text2)', fontWeight: 300, textAlign: 'left' }}>
            <span style={{ flexShrink: 0, marginTop: 7, width: 6, height: 6, borderRadius: '50%', background: 'linear-gradient(135deg, #ffffff, #ffc6db)', boxShadow: '0 0 8px rgba(255,210,228,.7)' }} />
            <span>{a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Education card ─────────────────────────────────────────────── */
function EducationCard({ education }) {
  return (
    <RevealWrapper>
      <div className="jrn-edu-card" style={{
        display: 'flex', alignItems: 'flex-start', gap: 24,
        maxWidth: 700, margin: '0 auto',
        background: 'var(--panel)', border: '1px solid var(--border2)',
        borderRadius: 22, padding: '28px 32px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 16px 50px rgba(0,0,0,.35)',
        transition: 'box-shadow .35s',
      }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 28px 70px rgba(255,210,228,.15)' }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,.35)' }}
      >
        {/* Graduation icon */}
        <div style={{
          flexShrink: 0, width: 52, height: 52, borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(255,198,219,.14), rgba(255,255,255,.06))',
          border: '1px solid rgba(255,198,219,.24)',
          display: 'grid', placeItems: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="var(--accent-text)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, fontSize: 21, color: 'var(--text)',
            margin: '0 0 4px', lineHeight: 1.18,
          }}>
            {education.degree}
          </h3>
          <div style={{ fontSize: 13, color: 'var(--accent-text)', fontWeight: 500, marginBottom: 13 }}>
            {education.institution} · {education.location}
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '.4px', color: 'var(--text3)' }}>
              {education.period}
            </span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
              padding: '3px 10px', borderRadius: 999,
              background: 'var(--glass-soft)', border: '1px solid var(--border2)',
              color: 'var(--text)', whiteSpace: 'nowrap',
            }}>
              GPA · {education.gpa}
            </span>
          </div>
        </div>
      </div>
    </RevealWrapper>
  )
}

/* ─── Recruiter summary chips ────────────────────────────────────── */
function RecruiterChips() {
  return (
    <RevealWrapper style={{ textAlign: 'center', marginBottom: 52 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>

        {/* Experience */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 18px', borderRadius: 999,
          background: 'var(--glass-soft)',
          border: '1px solid var(--border2)',
          backdropFilter: 'blur(8px)',
          fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600,
          color: 'var(--text)',
        }}>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="var(--accent-text)" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="8" cy="8" r="6.5" />
            <polyline points="8 4.5 8 8 10.5 9.5" />
          </svg>
          2+ yrs experience
        </div>

        {/* Availability */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '7px 18px', borderRadius: 999,
          background: 'rgba(74,222,128,0.07)',
          border: '1px solid rgba(74,222,128,0.28)',
          backdropFilter: 'blur(8px)',
          fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 500,
          color: 'rgba(134,239,172,0.95)',
        }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
            background: '#4ade80', boxShadow: '0 0 6px rgba(74,222,128,.8)',
            animation: 'availability-pulse 2.2s ease-in-out infinite', flexShrink: 0,
          }} />
          Open to opportunities
        </div>

      </div>
    </RevealWrapper>
  )
}

/* ─── Section divider ────────────────────────────────────────────── */
function SectionDivider({ label }) {
  return (
    <div className="jrn-sec-divider" style={{ display: 'flex', alignItems: 'center', gap: 18, margin: '80px 0 52px' }}>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, var(--border2))' }} />
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: '3.5px', textTransform: 'uppercase',
        color: 'var(--accent2)', whiteSpace: 'nowrap', opacity: 0.85,
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, var(--border2), transparent)' }} />
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────────── */
export default function ProfessionalJourney({ timeline, education }) {
  const stemWrapRef        = useRef(null)
  const stemProgressBarRef = useRef(null)

  useStemProgress(stemWrapRef, stemProgressBarRef)

  return (
    <section
      data-section="professional-journey"
      style={{
        position: 'relative',
        zIndex: 2,
        padding: '60px clamp(20px, 6vw, 70px) 100px',
        maxWidth: 1080,
        margin: '0 auto',
      }}
    >
      <style>{`
        @media (max-width: 640px) {
          .jrn-bg-stem     { left: 24px !important; transform: none !important; }
          .jrn-prog-stem   { left: 24px !important; transform: none !important; }
          .jrn-card        { width: 100% !important; padding-left: 56px !important; padding-right: 0 !important; margin-left: 0 !important; }
          .jrn-lotus       { left: -4px !important; transform: none !important; }
          .jrn-row         { margin-bottom: 32px !important; min-height: 0 !important; }
          .jrn-edu-card    { flex-direction: column !important; gap: 14px !important; padding: 20px 18px !important; }
          .jrn-sec-divider { margin: 44px 0 28px !important; }
          .jrn-exp-card    { padding: 18px 18px !important; }
        }
      `}</style>

      {/* Shared gradient defs for all lotus nodes */}
      <LotusGradientDefs />

      {/* ── Section header ─────────────────────────────────────── */}
      <RevealWrapper style={{ textAlign: 'center', marginBottom: 72 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: '3.5px',
          textTransform: 'uppercase',
          color: 'var(--accent2)',
          marginBottom: 18, opacity: 0.85,
        }}>
          career path
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 500,
          fontSize: 'clamp(36px, 5.5vw, 64px)',
          lineHeight: 1.04,
          margin: '0 0 4px',
          letterSpacing: '-.5px',
        }}>
          Professional journey
        </h2>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(17px, 2vw, 21px)',
          color: 'var(--accent-text)',
          fontWeight: 400,
          maxWidth: 540,
          margin: '14px auto 0',
          lineHeight: 1.5,
          opacity: 0.85,
        }}>
          The teams, the problems, and the lessons that shaped the engineer I am today.
        </p>
      </RevealWrapper>

      {/* ── Recruiter summary chips ────────────────────────────── */}
      <RecruiterChips />

      {/* ── Experience timeline ────────────────────────────────── */}
      <div ref={stemWrapRef} style={{ position: 'relative', maxWidth: 1000, margin: '0 auto' }}>

        {/* Background stem */}
        <div className="jrn-bg-stem" style={{
          position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, transparent, var(--stem) 5%, var(--stem) 95%, transparent)',
          opacity: 0.65,
        }} />

        {/* Animated progress fill */}
        <div ref={stemProgressBarRef} className="jrn-prog-stem" style={{
          position: 'absolute', left: '50%', top: 0, width: 4, height: '0%',
          transform: 'translateX(-50%)',
          borderRadius: 4,
          background: 'linear-gradient(180deg, #d8e8cc, var(--stem))',
          boxShadow: '0 0 16px rgba(170,200,150,.7)',
          transition: 'height .15s linear',
        }} />

        {/* Timeline entries */}
        {timeline.map((entry, index) => {
          const isLeft = index % 2 === 0
          const cardWrap = isLeft
            ? { width: '50%', boxSizing: 'border-box', paddingRight: 54 }
            : { width: '50%', boxSizing: 'border-box', paddingLeft: 54, marginLeft: '50%' }

          return (
            <RevealWrapper
              key={entry.id}
              className="jrn-row"
              from="translateY(48px)"
              style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', marginBottom: 64, minHeight: 96 }}
            >
              <div className="jrn-card" style={cardWrap}>
                <ExperienceCard entry={entry} />
              </div>

              {/* Lotus node on the stem */}
              <div
                data-lotus-node
                className="jrn-lotus"
                style={{
                  position: 'absolute', left: '50%', top: 10,
                  transform: 'translateX(-50%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  zIndex: 3, opacity: 0.28, transition: 'opacity .5s ease',
                }}
              >
                <LotusNode />
              </div>
            </RevealWrapper>
          )
        })}
      </div>

      {/* ── Education sub-section ──────────────────────────────── */}
      {education && (
        <>
          <SectionDivider label="education" />

          <RevealWrapper style={{ textAlign: 'center', marginBottom: 36 }}>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 500,
              fontSize: 'clamp(28px, 4vw, 46px)',
              lineHeight: 1.06,
              margin: '0 0 10px',
              letterSpacing: '-.3px',
            }}>
              The foundation
            </h3>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(15px, 1.6vw, 18px)',
              color: 'var(--text3)',
              fontWeight: 400,
              margin: 0,
              opacity: 0.8,
            }}>
              Where the curiosity for engineering first took root.
            </p>
          </RevealWrapper>

          <EducationCard education={education} />
        </>
      )}
    </section>
  )
}
