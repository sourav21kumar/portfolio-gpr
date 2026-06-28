import { useEffect, useState } from 'react'
import * as THREE from 'three'

/* ── Three.js grain texture — generated once, reused everywhere ────
   A 1024×1024 fragment shader renders high-quality per-pixel random
   noise at full GPU resolution, then baked to a data URL and tiled
   as a CSS background. No per-section Three.js overhead.
──────────────────────────────────────────────────────────────────── */
let _cachedUrl = null

function generateGrainUrl() {
  if (_cachedUrl) return _cachedUrl

  const SIZE = 1024
  const offscreen = document.createElement('canvas')
  const renderer  = new THREE.WebGLRenderer({ canvas: offscreen, alpha: true, antialias: false })
  renderer.setSize(SIZE, SIZE)

  const scene    = new THREE.Scene()
  const camera   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const geometry = new THREE.PlaneGeometry(2, 2)

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSeed: { value: Math.random() * 100 },
    },
    vertexShader: /* glsl */`
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */`
      uniform float uSeed;

      /* High-quality hash — visually pattern-free */
      vec2 hash22(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * vec3(443.897, 441.423, 437.195));
        p3 += dot(p3, p3.yzx + 19.19);
        return fract((p3.xx + p3.yz) * p3.zy);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / ${SIZE}.0 + uSeed * 0.001;
        vec2 n  = hash22(uv);
        /* n.x = luminance, n.y = alpha density */
        float lum   = n.x;
        float alpha = n.y * 0.88 + 0.12;
        gl_FragColor = vec4(lum, lum, lum, alpha);
      }
    `,
    transparent: true,
  })

  scene.add(new THREE.Mesh(geometry, material))
  renderer.render(scene, camera)

  _cachedUrl = offscreen.toDataURL('image/png')

  /* Clean up — renderer is no longer needed */
  geometry.dispose()
  material.dispose()
  renderer.dispose()

  return _cachedUrl
}

/* ── Component ─────────────────────────────────────────────────── */
export default function GrainOverlay({ opacity = 0.12, blendMode = 'screen', position = 'absolute', zIndex = 0 }) {
  const [url, setUrl] = useState(_cachedUrl)

  useEffect(() => {
    if (!url) setUrl(generateGrainUrl())
  }, [])

  if (!url) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position,
        inset:           0,
        backgroundImage: `url(${url})`,
        backgroundSize:  '512px 512px',
        opacity,
        mixBlendMode:    blendMode,
        pointerEvents:   'none',
        zIndex,
      }}
    />
  )
}
