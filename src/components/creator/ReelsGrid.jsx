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
 * Instagram embed widget layout at ~310px card width:
 *   Top header  (profile, song, "View profile" btn) ≈ 64px
 *   Video area                                       ≈ 530px
 *   Bottom bar  (likes, comments, "View more on IG") ≈ 150px
 *   Total iframe content                             ≈ 744px
 *
 * Technique: overflow:hidden wrapper + negative top offset on the iframe
 * hides both the header and the bottom bar, showing only the video.
 */
const CLIP_TOP    = 64
const VIDEO_H     = 390
const IFRAME_H    = 900

function ReelCard({ reel }) {
  const embedUrl = reel.url.endsWith('/') ? `${reel.url}embed/` : `${reel.url}/embed/`

  return (
    <RevealWrapper
      from="translateY(40px)"
      style={{
        width: 'clamp(270px, 23vw, 310px)',
        flexShrink: 0,
        borderRadius: 20,
        overflow: 'hidden',
        background: '#07000f',
        boxShadow: '0 20px 60px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.07)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform .35s cubic-bezier(.2,.8,.2,1), box-shadow .35s',
      }}
      className="hover-lift-strong"
    >
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
          title={reel.title}
        />
      </div>

      {/* Our own footer — caption + view count + "Watch on Instagram" link */}
      <div style={{
        padding: '10px 14px',
        background: '#07000f',
        borderTop: '1px solid rgba(255,255,255,.07)',
        flexShrink: 0,
      }}>
        {reel.caption && (
          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 12, fontWeight: 400,
            color: 'rgba(255,230,245,.7)',
            margin: '0 0 8px',
            lineHeight: 1.45,
          }}>
            {reel.caption}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ color: '#ff9ec7', display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            <PlayTriangle />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600 }}>
              {reel.viewCount}
            </span>
          </span>
          <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, color: 'rgba(255,155,200,.4)', flexShrink: 0 }}>
            views
          </span>
          <a
            href={reel.url}
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
            Watch on Instagram
            <ArrowIcon />
          </a>
        </div>
      </div>
    </RevealWrapper>
  )
}

export default function ReelsGrid({ reels }) {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 1180,
        margin: '0 auto',
        padding: '20px clamp(20px, 6vw, 90px) 70px',
      }}
    >
      <RevealWrapper style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 38, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#ff9ec7">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#ff9ec7',
            }}>
              Reels · 11 clips
            </span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 500,
            fontSize: 'clamp(34px, 5vw, 56px)',
            lineHeight: 1.05,
            margin: '0 0 12px',
            color: '#fff',
          }}>
            Stories I couldn't keep still
          </h2>

          <p style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 14,
            fontWeight: 300,
            color: 'rgba(255,209,232,0.52)',
            margin: 0,
            maxWidth: 420,
            lineHeight: 1.65,
          }}>
            Short clips from the in-between — the mornings, the late builds, the quiet frames worth remembering.
          </p>
        </div>

        <a
          href="https://www.instagram.com/just.gayani_/reels/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontFamily: "'Sora', sans-serif",
            fontSize: 12, fontWeight: 500,
            color: '#ff9ec7',
            textDecoration: 'none',
            letterSpacing: '0.3px',
            opacity: 0.78,
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.78}
        >
          Watch all on Instagram
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </a>
      </RevealWrapper>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center' }}>
        {reels.map(reel => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </section>
  )
}
