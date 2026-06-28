import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import GrainOverlay from './GrainOverlay.jsx'

/* ── Petal bezier shape matching original SVG exactly ─────────────
   Original bezier normalised: CP ratios (±hw, len×0.32) & (±hw, len×0.77)
──────────────────────────────────────────────────────────────────── */
function makePetalShape(length, hw) {
  const s = new THREE.Shape()
  s.moveTo(0, 0)
  s.bezierCurveTo(-hw, length * 0.32, -hw, length * 0.77, 0, length)
  s.bezierCurveTo( hw, length * 0.77,  hw, length * 0.32, 0, 0)
  return s
}

/* ── Canvas gradient texture ───────────────────────────────────────
   Dark mode  : white → light pink  (visible on dark bg)
   Light mode : deep rose → mauve   (visible on white/light bg)
──────────────────────────────────────────────────────────────────── */
function makePetalTexture(layerAlpha, isLight) {
  const canvas = document.createElement('canvas')
  canvas.width  = 64
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(32, 205, 0, 32, 160, 190)

  if (isLight) {
    g.addColorStop(0,    `rgba(160, 50, 100, ${(0.98 * layerAlpha).toFixed(3)})`)
    g.addColorStop(0.45, `rgba(190, 75, 130, ${(0.80 * layerAlpha).toFixed(3)})`)
    g.addColorStop(0.80, `rgba(215, 110, 160, ${(0.50 * layerAlpha).toFixed(3)})`)
    g.addColorStop(1.0,  `rgba(235, 150, 185, ${(0.22 * layerAlpha).toFixed(3)})`)
  } else {
    g.addColorStop(0,    `rgba(255, 255, 255, ${(0.95 * layerAlpha).toFixed(3)})`)
    g.addColorStop(0.45, `rgba(255, 238, 248, ${(0.75 * layerAlpha).toFixed(3)})`)
    g.addColorStop(0.80, `rgba(255, 215, 235, ${(0.50 * layerAlpha).toFixed(3)})`)
    g.addColorStop(1.0,  `rgba(255, 200, 222, ${(0.20 * layerAlpha).toFixed(3)})`)
  }

  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 256)
  return new THREE.CanvasTexture(canvas)
}

/* ── Build one ring of outward-radiating petals ────────────────────
   pivot.rotation.y = angle  → places petal around the ring
   mesh.rotation.x  = PI/2 − tiltUp  → lays flat, lifts tip by tiltUp
──────────────────────────────────────────────────────────────────── */
function buildRing(count, petalLen, hw, layerAlpha, tiltUp, isLight) {
  const group = new THREE.Group()
  const geo   = new THREE.ShapeGeometry(makePetalShape(petalLen, hw), 22)
  const mat   = new THREE.MeshBasicMaterial({
    map:         makePetalTexture(layerAlpha, isLight),
    transparent: true,
    side:        THREE.DoubleSide,
    depthWrite:  false,
  })
  const step = (Math.PI * 2) / count
  for (let i = 0; i < count; i++) {
    const pivot = new THREE.Group()
    pivot.rotation.y = i * step
    const mesh = new THREE.Mesh(geo, mat)
    mesh.rotation.x = Math.PI / 2 - tiltUp
    pivot.add(mesh)
    group.add(pivot)
  }
  return group
}

/* ── Component ─────────────────────────────────────────────────── */
export default function LotusThree({ isLightTheme = false, style }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = el.clientWidth  || window.innerWidth
    const H = el.clientHeight || window.innerHeight

    /* Renderer — transparent bg, no edge artefact */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    renderer.domElement.style.display = 'block'
    el.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    /*
      Camera pulled further back (y=16) so ALL petals fit inside the frustum.
      Half-view at origin ≈ 16.06 × tan(22°) ≈ 6.5 units → outer petal 4.8 < 6.5 ✓
    */
    const camera = new THREE.PerspectiveCamera(44, W / H, 0.1, 100)
    camera.position.set(0, 28, 1.6)
    camera.lookAt(0, 0, 0)

    const lotus = new THREE.Group()
    scene.add(lotus)

    /*
      Layer counts / scale / opacity match original SVG PETAL_LAYERS exactly:
        { rotations: 16, scale: 1.20, opacity: 0.42 }
        { rotations: 12, scale: 0.90, opacity: 0.66 }
        { rotations:  8, scale: 0.58, opacity: 0.90 }

      BASE_HW / 5 = wider petals (original was /6.7 — narrower)
    */
    const BASE_LEN = 9.0
    const BASE_HW  = BASE_LEN / 4.2

    const ringDefs = [
      { count: 16, scale: 1.20, alpha: 0.42, tiltUp: 0.04, delay: 200 },
      { count: 12, scale: 0.90, alpha: 0.66, tiltUp: 0.14, delay: 520 },
      { count:  8, scale: 0.58, alpha: 0.90, tiltUp: 0.28, delay: 840 },
    ]

    const rings = ringDefs.map(({ count, scale, alpha, tiltUp, delay }) => {
      const ring = buildRing(
        count,
        BASE_LEN * scale,
        BASE_HW  * scale,
        alpha, tiltUp, isLightTheme,
      )
      ring.scale.setScalar(0.04)
      ring.userData.delay   = delay
      ring.userData.bloomed = false
      lotus.add(ring)
      return ring
    })

    /* Centre glow disc */
    const cGeo  = new THREE.CircleGeometry(0.24, 32)
    const cMat  = new THREE.MeshBasicMaterial({
      color:       isLightTheme ? 0xa03265 : 0xfff4f9,
      transparent: true,
      opacity:     isLightTheme ? 0.7 : 0.6,
      depthWrite:  false,
    })
    const cDisc = new THREE.Mesh(cGeo, cMat)
    cDisc.rotation.x = -Math.PI / 2
    lotus.add(cDisc)

    /* Scroll parallax */
    let scrollY = 0
    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* Resize */
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    /* Animate — NO constant rotation, only subtle scroll parallax */
    const t0 = performance.now()
    let raf

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const now     = performance.now()
      const elapsed = now - t0
      const t       = now * 0.001

      /* Bloom: each ring scales from tiny → full after its delay */
      rings.forEach(ring => {
        if (!ring.userData.bloomed && elapsed >= ring.userData.delay) {
          ring.userData.bloomed = true
        }
        if (ring.userData.bloomed) {
          const s = ring.scale.x
          ring.scale.setScalar(s + (1 - s) * 0.052)
        }
      })

      /* Scroll: gentle tilt only — NO spinning */
      lotus.rotation.x  = scrollY * 0.00020
      camera.position.y = 28 - scrollY * 0.004

      /* Pulse centre */
      cMat.opacity = (isLightTheme ? 0.60 : 0.45) + Math.sin(t * 1.4) * 0.2

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [isLightTheme])

  return (
    <>
      <div
        ref={mountRef}
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          opacity:       isLightTheme ? 0.62 : 0.34,
          WebkitMaskImage: 'radial-gradient(ellipse 90% 82% at 50% 46%, black 48%, transparent 88%)',
          maskImage:        'radial-gradient(ellipse 90% 82% at 50% 46%, black 48%, transparent 88%)',
          ...style,
        }}
      />
      {/* Denser grain layer specifically on the lotus — sits above canvas, below hero text */}
      <GrainOverlay opacity={0.17} blendMode="screen" zIndex={1} />
    </>
  )
}
