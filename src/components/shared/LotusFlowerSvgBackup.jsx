import { useRef, useEffect } from 'react'

const PETAL_LAYERS = [
  { rotations: 16, scale: 1.2, opacity: 0.42, endScale: 'scale(1.2)' },
  { rotations: 12, scale: 0.9, opacity: 0.66, endScale: 'scale(.9)'  },
  { rotations: 8,  scale: 0.58, opacity: 0.9, endScale: 'scale(.58)' },
]

export default function LotusFlowerSvg({ size = '100%', style }) {
  const svgRef = useRef(null)

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return

    const bloomGroups = Array.from(svgEl.querySelectorAll('[data-bloom-layer]'))
    bloomGroups.forEach((group, index) => {
      const endTransform = group.dataset.bloomEnd
      group.animate(
        [{ transform: 'scale(0.06)', opacity: 0 }, { transform: endTransform, opacity: 1 }],
        { duration: 1900, delay: 200 + index * 320, easing: 'cubic-bezier(.22,.7,.2,1)', fill: 'none' }
      )
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      width={size}
      height={size}
      style={{ overflow: 'visible', ...style }}
    >
      <defs>
        <radialGradient id="lotus-petal-radial" cx="50%" cy="80%" r="80%">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="52%"  stopColor="#ffe6f0" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#ffc9dd" stopOpacity="0.26" />
        </radialGradient>
        <linearGradient id="lotus-petal-linear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="60%"  stopColor="#ffe1ec" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#ffc6db" stopOpacity="0.3"  />
        </linearGradient>
        <path
          id="petal-large"
          d="M200 214 C170 150 170 60 200 14 C230 60 230 150 200 214 Z"
          fill="url(#lotus-petal-radial)"
          stroke="rgba(255,255,255,.4)"
          strokeWidth="1"
        />
        <path
          id="petal-small"
          d="M120 120 C104 88 104 50 120 20 C136 50 136 88 120 120 Z"
          fill="url(#lotus-petal-linear)"
          stroke="rgba(255,255,255,.5)"
          strokeWidth="1"
        />
      </defs>

      {PETAL_LAYERS.map((layer, layerIndex) => {
        const step = 360 / layer.rotations
        const rotations = Array.from({ length: layer.rotations }, (_, i) => i * step)
        return (
          <g
            key={layerIndex}
            data-bloom-layer
            data-bloom-end={layer.endScale}
            style={{
              transformOrigin: 'center',
              transformBox: 'fill-box',
              transform: layer.endScale,
            }}
            opacity={layer.opacity}
          >
            {rotations.map(angle => (
              <use
                key={angle}
                href="#petal-large"
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </g>
        )
      })}

      <circle cx="200" cy="200" r="20" fill="#ffffff" opacity="0.2" />
    </svg>
  )
}
