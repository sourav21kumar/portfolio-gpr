import { useMemo } from 'react'

const BURST_COLORS = ['#feda75', '#fa7e1e', '#ff2d8e', '#b14bff', '#4f5bd5']

const SLIDES = [
  { src: '/assets/images/gayani1.jpg', kb: 'kb-pan-right'  },
  { src: '/assets/images/gayani2.jpg', kb: 'kb-pan-left'   },
  { src: '/assets/images/gayani3.jpg', kb: 'kb-drift-up'   },
  { src: '/assets/images/gayani4.jpg', kb: 'kb-drift-down' },
]

function buildBloomPetals() {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    transform: `rotate(${i * 30}deg)`,
  }))
}

function buildBurstPetals() {
  return Array.from({ length: 18 }, (_, i) => {
    const angle    = i * (360 / 18)
    const color    = BURST_COLORS[i % BURST_COLORS.length]
    const width    = 10 + ((i * 7) % 16)
    const height   = 24 + ((i * 11) % 26)
    const duration = (1 + ((i * 3) % 55) / 100).toFixed(2)
    const delay    = ((i * 2) % 22 / 100).toFixed(2)
    return {
      id: i,
      style: {
        position: 'absolute',
        left: '50%', top: '50%',
        width:  `${width}px`,
        height: `${height}px`,
        margin: `${-height / 2}px 0 0 ${-width / 2}px`,
        background: `linear-gradient(180deg, #fff, ${color})`,
        borderRadius: '50% 50% 50% 50% / 72% 72% 28% 28%',
        '--petal-angle': `${angle}deg`,
        animation: `petal-burst-out ${duration}s cubic-bezier(.2,.6,.3,1) ${delay}s forwards`,
      },
    }
  })
}


export default function ModeTransitionOverlay({ variant, isCreatorTransition }) {
  const bloomPetals = useMemo(() => buildBloomPetals(), [])
  const burstPetals = useMemo(() => buildBurstPetals(), [])

  /* ── Creator mode: cinematic image slideshow ───────────────── */
  if (isCreatorTransition) {
    return (
      <div style={{
        position:  'fixed',
        inset:     0,
        zIndex:    300,
        overflow:  'hidden',
        background:'#070309',
        animation: 'creator-overlay-fade 8s linear forwards',
      }}>

        {/* 4 images with Ken Burns pan — each 2.3 s, staggered 2 s apart */}
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            style={{
              position:  'absolute',
              inset:     0,
              animation: `creator-img-show 2.3s ease ${i * 2}s both`,
            }}
          >
            <div style={{
              width:           '100%',
              height:          '100%',
              backgroundImage: `url(${slide.src})`,
              backgroundSize:  'cover',
              backgroundPosition: 'center',
              animation:       `${slide.kb} 2.3s ease ${i * 2}s both`,
            }}/>
          </div>
        ))}

        {/* Dark vignette — pulls focus to centre */}
        <div style={{
          position:   'absolute',
          inset:      0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 90% 85% at 50% 50%, transparent 18%, rgba(4,1,8,0.70) 100%)',
        }}/>

        {/* Subtle purple/pink colour wash — intentionally low opacity */}
        <div style={{
          position:   'absolute',
          inset:      0,
          pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(177,75,255,0.10) 0%, rgba(255,45,142,0.07) 50%, rgba(79,91,213,0.10) 100%)',
        }}/>

        {/* Bottom dark fade so the screen doesn't hard-cut */}
        <div style={{
          position:   'absolute',
          bottom:     0, left: 0, right: 0,
          height:     '28%',
          background: 'linear-gradient(to top, rgba(4,1,8,0.85), transparent)',
          pointerEvents: 'none',
        }}/>

        {/* Lotus loader — small, slow-spinning, responsive */}
        <div style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          width:         0,
          height:        0,
          pointerEvents: 'none',
          animation:     'lotus-loader-appear 8s ease forwards',
        }}>
          {/* Soft glow halo */}
          <div className="ldr-halo" />

          {/* Spinning petal ring */}
          <div style={{
            position:  'absolute',
            left:      0,
            top:       0,
            animation: 'lotus-loader-spin 9s linear infinite, lotus-loader-breathe 3.2s ease-in-out infinite',
          }}>
            {bloomPetals.map(petal => (
              <span
                key={petal.id}
                className="ldr-petal"
                style={{ transform: petal.transform }}
              />
            ))}
          </div>

          {/* Golden centre orb */}
          <span className="ldr-orb" />
        </div>

      </div>
    )
  }

  /* ── Dev mode transition: bloom / wash / burst ─────────────── */
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'grid',
        placeItems: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 47%, #ffb24d, #ff2d8e 42%, #b14bff 73%, #4f5bd5)',
      }}
    >
      {variant === 'bloom' && (
        <div
          style={{
            position: 'relative',
            width: 1, height: 1,
            animation: 'bloom-big-exit 1.8s cubic-bezier(.2,.7,.2,1) forwards',
          }}
        >
          {bloomPetals.map(petal => (
            <span
              key={petal.id}
              style={{
                position: 'absolute',
                left: 0, top: 0,
                width: 64, height: 158,
                margin: '-158px 0 0 -32px',
                transformOrigin: '50% 100%',
                transform: petal.transform,
                background: 'linear-gradient(180deg, #fff, #ffd1e8 42%, #ff8fc4)',
                borderRadius: '50% 50% 50% 50% / 70% 70% 30% 30%',
                boxShadow: '0 0 34px rgba(255,255,255,.55)',
                opacity: 0.94,
              }}
            />
          ))}
          <span
            style={{
              position: 'absolute',
              left: -28, top: -28,
              width: 56, height: 56,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff, #ffd166)',
              boxShadow: '0 0 50px #fff',
            }}
          />
        </div>
      )}

      {variant === 'wash' && (
        <div
          style={{
            width: '62vmax', height: '62vmax',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,.96), rgba(255,209,232,.6) 40%, transparent 72%)',
            animation: 'wash-expand 1.4s ease-out forwards',
          }}
        />
      )}

      {variant === 'burst' && (
        <div style={{ position: 'relative', width: 1, height: 1 }}>
          {burstPetals.map(petal => (
            <span key={petal.id} style={petal.style} />
          ))}
          <span
            style={{
              position: 'absolute',
              left: -42, top: -42,
              width: 84, height: 84,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #fff, #ffd166)',
              boxShadow: '0 0 70px #fff',
              animation: 'bloom-big-exit 1.4s ease-out forwards',
            }}
          />
        </div>
      )}
    </div>
  )
}
