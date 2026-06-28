import { useState } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'

/* ── Category groups — add a new entry here when adding a new skill category ── */
const GROUPS = [
  { key: 'lang',     label: 'Languages' },
  { key: 'backend',  label: 'Backend' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'data',     label: 'Data & DevOps' },
  { key: 'cloud',    label: 'Cloud — AWS' },
  { key: 'auth',     label: 'Auth & Tools' },
]

/* ── Tech card — lotus-theme glass, no per-skill colour accents ────────── */
function TechCard({ skill }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 14px',
        borderRadius: 10,
        border: `1px solid ${hovered ? 'var(--accent-text)' : 'var(--border2)'}`,
        background: 'var(--glass-soft)',
        transition: 'border-color 0.2s ease, transform 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        userSelect: 'none',
      }}
    >
      <img
        src={skill.logo}
        alt={skill.name}
        width={22}
        height={22}
        style={{ objectFit: 'contain', flexShrink: 0 }}
      />
      <span
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--text2)',
          whiteSpace: 'nowrap',
          letterSpacing: '0.01em',
        }}
      >
        {skill.name}
      </span>
    </div>
  )
}

/* ── Section ────────────────────────────────────────────────────────────── */
export default function TechStack({ skills, isLightTheme }) {
  return (
    <section
      style={{
        position: 'relative', zIndex: 2,
        padding: '80px clamp(20px, 6vw, 90px) 110px',
        maxWidth: 1100, margin: '0 auto',
      }}
    >
      {/* Section header — matches Professional Journey style */}
      <RevealWrapper style={{ marginBottom: 60, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 11, letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--accent2)', marginBottom: 16,
          }}
        >
          Engineering
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 500,
            fontSize: 'clamp(36px,5.2vw,62px)',
            lineHeight: 1.02, margin: '0 0 18px',
            letterSpacing: '-.5px', color: 'var(--text)',
          }}
        >
          Tech stack
        </h2>
        <p
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontStyle: 'italic',
            fontSize: 'clamp(17px,2vw,21px)',
            color: 'var(--text2)', margin: 0, lineHeight: 1.5,
          }}
        >
          The tools I've shipped real products with.
        </p>
      </RevealWrapper>

      {/* Category groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
        {GROUPS.map((group, gi) => {
          const groupSkills = skills.filter(s => s.category === group.key)
          if (!groupSkills.length) return null

          return (
            <RevealWrapper
              key={group.key}
              from="translateY(24px)"
              style={{ transitionDelay: `${gi * 60}ms` }}
            >
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 10, letterSpacing: '2.5px',
                    textTransform: 'uppercase',
                    color: 'var(--label)', whiteSpace: 'nowrap',
                  }}
                >
                  {group.label}
                </span>
                <div
                  style={{
                    flex: 1, height: 1,
                    background: 'linear-gradient(90deg, var(--border2) 0%, transparent 100%)',
                  }}
                />
              </div>

              {/* Skill cards */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 10px' }}>
                {groupSkills.map(skill => (
                  <TechCard key={skill.id} skill={skill} />
                ))}
              </div>
            </RevealWrapper>
          )
        })}
      </div>
    </section>
  )
}
