import { useState } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'
import { ownerProfile } from '../../data/portfolioData.js'

function CreatorAmbientLayers() {
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute', top: '-10%', right: '-8%',
          width: '48vw', height: '48vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,45,142,.4), transparent 62%)',
          filter: 'blur(50px)',
          animation: 'ambient-glow 10s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute', top: '30%', left: '-12%',
          width: '46vw', height: '46vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250,126,30,.34), transparent 64%)',
          filter: 'blur(56px)',
          animation: 'ambient-glow 13s ease-in-out infinite 2s',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '-14%', right: '20%',
          width: '42vw', height: '42vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(177,75,255,.36), transparent 66%)',
          filter: 'blur(58px)',
          animation: 'ambient-glow 12s ease-in-out infinite 4s',
        }}
      />
    </div>
  )
}

export default function CreatorHero({ onSwitchMode }) {
  const [followBtnHovered, setFollowBtnHovered] = useState(false)
  const [backBtnHovered,   setBackBtnHovered]   = useState(false)

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        padding: '140px clamp(20px, 6vw, 90px) 50px',
      }}
    >
      <CreatorAmbientLayers />

      {/* Portrait with Instagram gradient ring */}
      <RevealWrapper
        from="scale(.7)"
        style={{
          position: 'relative',
          zIndex: 1,
          width: 168, height: 168,
          borderRadius: '50%',
          padding: 5,
          background: 'conic-gradient(from 30deg, #feda75, #fa7e1e, #ff2d8e, #b14bff, #4f5bd5, #feda75)',
          boxShadow: '0 16px 50px rgba(255,45,142,.5)',
          marginBottom: 24,
        }}
      >
        <div
          style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            border: '4px solid #170721',
            overflow: 'hidden',
          }}
        >
          <img
            src={ownerProfile.creatorPortrait}
            alt={ownerProfile.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>

        {/* Instagram badge */}
        <div
          style={{
            position: 'absolute', bottom: 6, right: 6,
            width: 38, height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888)',
            border: '3px solid #170721',
            display: 'grid', placeItems: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
               stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="4.5"/>
            <circle cx="17.5" cy="6.5" r="1.2" fill="#fff" stroke="none"/>
          </svg>
        </div>
      </RevealWrapper>

      {/* Headline */}
      <h1
        data-reveal
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          fontSize: 'clamp(46px, 8vw, 88px)',
          lineHeight: 1,
          margin: '0 0 10px',
          background: 'linear-gradient(92deg, #feda75, #fa7e1e 30%, #ff2d8e 62%, #b14bff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Gayani, on screen
      </h1>

      {/* Instagram handle */}
      <RevealWrapper>
        <a
          href={ownerProfile.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 14, letterSpacing: 1,
            color: '#ffb9d8',
            textDecoration: 'none',
            marginBottom: 18,
          }}
        >
          {ownerProfile.links.instagramHandle}
        </a>
      </RevealWrapper>

      {/* Bio */}
      <RevealWrapper>
        <p
          style={{
            maxWidth: 500,
            fontSize: '16.5px', lineHeight: 1.7,
            color: '#f0d9ea', fontWeight: 300,
            margin: '0 0 28px',
          }}
        >
          I write code for a living and film life for the love of it. Unscripted, unfiltered, entirely me. ✿
        </p>
      </RevealWrapper>

      {/* CTAs */}
      <RevealWrapper style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href={ownerProfile.links.instagram}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setFollowBtnHovered(true)}
          onMouseLeave={() => setFollowBtnHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '14px 30px',
            borderRadius: 999,
            cursor: 'pointer',
            fontFamily: "'Sora'",
            fontSize: 14, fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(95deg, #feda75, #fa7e1e 35%, #ff2d8e 70%, #b14bff)',
            boxShadow: followBtnHovered ? '0 20px 52px rgba(255,45,142,.65)' : '0 14px 40px rgba(255,45,142,.5)',
            transition: '.3s',
            textDecoration: 'none',
            transform: followBtnHovered ? 'translateY(-2px)' : 'none',
          }}
        >
          Follow on Instagram
        </a>

        <button
          onClick={onSwitchMode}
          onMouseEnter={() => setBackBtnHovered(true)}
          onMouseLeave={() => setBackBtnHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '14px 26px',
            borderRadius: 999,
            cursor: 'pointer',
            fontFamily: "'Sora'",
            fontSize: 14, fontWeight: 500,
            color: '#fff',
            background: backBtnHovered ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.1)',
            border: '1px solid rgba(255,255,255,.22)',
            backdropFilter: 'blur(12px)',
            transition: '.3s',
            transform: backBtnHovered ? 'translateY(-2px)' : 'none',
          }}
        >
          ← Meet the developer behind the stories
        </button>
      </RevealWrapper>
    </section>
  )
}
