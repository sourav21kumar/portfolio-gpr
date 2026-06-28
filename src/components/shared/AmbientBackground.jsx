import GrainOverlay from './GrainOverlay.jsx'

/* ── Soft ambient glow orbs — dev mode depth ────────────────────── */
function GlowOrbs() {
  return (
    <div
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        0,
        overflow:      'hidden',
        opacity:       'var(--ambient-op, 1)',
        transition:    'opacity 0.8s ease',
      }}
    >
      <div style={{
        position: 'absolute', top: '-10%', left: '30%',
        width: '50vw', height: '50vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,.08), transparent 64%)',
        filter: 'blur(60px)',
        animation: 'ambient-glow 11s ease-in-out infinite 0s',
      }} />
      <div style={{
        position: 'absolute', bottom: '-18%', right: '-6%',
        width: '44vw', height: '44vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,224,236,.09), transparent 64%)',
        filter: 'blur(60px)',
        animation: 'ambient-glow 13s ease-in-out infinite 1.5s',
      }} />
      <div style={{
        position: 'absolute', top: '34%', left: '8%',
        width: '30vw', height: '30vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,206,223,.07), transparent 64%)',
        filter: 'blur(60px)',
        animation: 'ambient-glow 15s ease-in-out infinite 3s',
      }} />
    </div>
  )
}

/* ── Exported component — global grain + dev-mode glow orbs ─────── */
export default function AmbientBackground({ isLight = false, isCreatorMode = false }) {
  return (
    <>
      {/* Global grain: fixed, covers entire viewport uniformly — no section boundaries */}
      <GrainOverlay position="fixed" zIndex={3} opacity={0.062} blendMode="screen" />
      {!isCreatorMode && !isLight && <GlowOrbs />}
    </>
  )
}
