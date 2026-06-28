import { useState } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'
import { ownerProfile } from '../../data/portfolioData.js'

export default function CreatorClosingCta() {
  const [buttonHovered, setButtonHovered] = useState(false)

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '30px 24px 60px',
      }}
    >
      <RevealWrapper
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(24px, 3.4vw, 38px)',
          color: '#ffd1e8',
          maxWidth: 620,
          margin: '0 auto 14px',
          lineHeight: 1.44,
          letterSpacing: '0.01em',
        }}
      >
        "I never set out to be a creator. I just had a life that kept asking to be told."
      </RevealWrapper>

      <RevealWrapper
        style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: 13,
          color: 'rgba(255,209,232,0.52)',
          maxWidth: 340,
          margin: '0 auto 32px',
          lineHeight: 1.7,
          letterSpacing: '0.025em',
        }}
      >
        Every frame, every caption — just me, being honest.
      </RevealWrapper>

      <RevealWrapper>
        <a
          href={ownerProfile.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '16px 32px',
            borderRadius: 999,
            fontFamily: "'Sora'",
            fontSize: 15, fontWeight: 600,
            color: '#fff',
            textDecoration: 'none',
            background: 'linear-gradient(95deg, #feda75, #fa7e1e 35%, #ff2d8e 70%, #b14bff)',
            boxShadow: buttonHovered
              ? '0 26px 64px rgba(255,45,142,.65)'
              : '0 18px 50px rgba(255,45,142,.5)',
            transition: '.3s',
            transform: buttonHovered ? 'translateY(-3px) scale(1.02)' : 'none',
          }}
        >
          Say hello on Instagram ✿
        </a>
      </RevealWrapper>
    </section>
  )
}
