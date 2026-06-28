import { useRef } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'
import { useCounterAnimation } from '../../hooks/useCounterAnimation.js'

/* Instagram-authentic metric icons — matching stroke weight and style
   used in Instagram's own Insights and profile UI */

const FollowersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)

const PostsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3"  y="3"  width="7" height="7" rx="1.2"/>
    <rect x="14" y="3"  width="7" height="7" rx="1.2"/>
    <rect x="3"  y="14" width="7" height="7" rx="1.2"/>
    <rect x="14" y="14" width="7" height="7" rx="1.2"/>
  </svg>
)

const ReachIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
       strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const STAT_META = {
  followers: { icon: <FollowersIcon />, sublabel: 'on Instagram' },
  posts:     { icon: <PostsIcon />,     sublabel: 'published'    },
  views:     { icon: <ReachIcon />,     sublabel: 'per post'     },
}

export default function CreatorStats({ stats }) {
  const containerRef = useRef(null)
  useCounterAnimation(containerRef)

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 860,
        margin: '0 auto',
        padding: '24px clamp(20px, 6vw, 90px) 70px',
      }}
    >
      <RevealWrapper ref={containerRef}>
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            justifyContent: 'center',
            background: 'rgba(255,255,255,.055)',
            border: '1px solid rgba(255,255,255,.13)',
            borderRadius: 24,
            backdropFilter: 'blur(18px)',
            boxShadow: '0 24px 60px rgba(20,4,24,.5)',
            overflow: 'hidden',
          }}
        >
          {stats.map((stat, i) => {
            const meta = STAT_META[stat.id] || {}
            const isLast = i === stats.length - 1
            return (
              <div
                key={stat.id}
                style={{
                  flex: '1 1 180px',
                  textAlign: 'center',
                  padding: '32px 24px 28px',
                  borderRight: isLast ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  minWidth: 140,
                }}
              >
                {/* Icon */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: 'rgba(255,45,142,0.12)',
                  color: '#ff6ba8',
                  marginBottom: 14,
                }}>
                  {meta.icon}
                </div>

                {/* Number */}
                <div
                  data-count-to={stat.numericValue}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 600,
                    fontSize: 'clamp(36px, 4.5vw, 52px)',
                    lineHeight: 1,
                    marginBottom: 8,
                    background: 'linear-gradient(92deg, #feda75, #ff2d8e 70%, #b14bff)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.displayText}
                </div>

                {/* Primary label */}
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.82)',
                  letterSpacing: '0.2px',
                  marginBottom: 3,
                }}>
                  {stat.label}
                </div>

                {/* Sub-label */}
                {meta.sublabel && (
                  <div style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.32)',
                    letterSpacing: '0.3px',
                  }}>
                    {meta.sublabel}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </RevealWrapper>
    </section>
  )
}
