import { useMemo } from 'react'
import RevealWrapper from '../shared/RevealWrapper.jsx'

const PlayTriangle = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const ArrowIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
)

/*
 * Same clipping strategy as ReelsGrid.
 * FeaturedPosts cards are slightly wider (~350px) so VIDEO_H is a touch taller.
 */
const CLIP_TOP = 64
const VIDEO_H  = 410
const IFRAME_H = 900

function FeaturedPostCard({ post }) {
  const embedUrl = post.url.endsWith('/') ? `${post.url}embed/` : `${post.url}/embed/`

  return (
    <RevealWrapper
      from="translateY(40px)"
      style={{
        width: 'clamp(300px, 30vw, 360px)',
        flexShrink: 0,
        borderRadius: 20,
        overflow: 'hidden',
        background: '#07000f',
        boxShadow: '0 24px 64px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
      }}
      className="hover-lift-strong"
    >
      {/* Rank badge header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        padding: '10px 14px',
        background: '#07000f',
        borderBottom: '1px solid rgba(255,255,255,.07)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px',
          borderRadius: 999,
          background: 'linear-gradient(95deg, #feda75, #ff2d8e)',
          boxShadow: '0 4px 14px rgba(255,45,142,.4)',
        }}>
          <PlayTriangle />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, fontWeight: 700, color: '#fff',
          }}>
            #{post.rank} most watched
          </span>
        </div>
      </div>

      {/* Clipped viewport — hides Instagram header and bottom action bar */}
      <div style={{ position: 'relative', overflow: 'hidden', height: VIDEO_H, flexShrink: 0 }}>
        <iframe
          src={embedUrl}
          style={{
            position: 'absolute',
            top: -CLIP_TOP,
            left: 0,
            width: '100%',
            height: IFRAME_H,
            border: 'none',
            background: '#000',
          }}
          scrolling="no"
          frameBorder="0"
          allowTransparency="true"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          loading="lazy"
          title={post.caption}
        />
      </div>

      {/* Our own footer — caption + view count + View on Instagram link */}
      <div style={{
        padding: '12px 14px',
        background: '#07000f',
        borderTop: '1px solid rgba(255,255,255,.07)',
        flexShrink: 0,
      }}>
        {post.caption && (
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 13, fontWeight: 400,
            color: 'rgba(255,230,245,.75)',
            margin: '0 0 10px',
            lineHeight: 1.5,
          }}>
            {post.caption}
          </p>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#ff9ec7', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <PlayTriangle />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600 }}>
              {post.displayViews}
            </span>
          </span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, color: 'rgba(255,155,200,.4)' }}>
            views
          </span>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: 'auto',
              display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
              fontFamily: "'Sora', sans-serif",
              fontSize: 11, fontWeight: 500,
              color: 'rgba(255,200,230,.5)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ff9ec7'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,200,230,.5)'}
          >
            View on Instagram
            <ArrowIcon />
          </a>
        </div>
      </div>
    </RevealWrapper>
  )
}

export default function FeaturedPosts({ posts }) {
  const topThreeByViews = useMemo(
    () =>
      [...posts]
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, 3)
        .map((post, index) => ({ ...post, rank: index + 1 })),
    [posts]
  )

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1180,
        margin: '0 auto',
        padding: '20px clamp(20px, 6vw, 90px) 90px',
      }}
    >
      <RevealWrapper style={{ textAlign: 'center', marginBottom: 44 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#ff9ec7',
            marginBottom: 12,
          }}
        >
          Featured · most watched
        </div>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 'clamp(34px, 5vw, 56px)',
            lineHeight: 1,
            margin: 0,
            color: '#fff',
          }}
        >
          The reels they watched most
        </h2>
      </RevealWrapper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', alignItems: 'flex-start' }}>
        {topThreeByViews.map(post => (
          <FeaturedPostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
