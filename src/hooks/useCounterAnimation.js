import { useEffect } from 'react'

function formatLargeNumber(value) {
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1) + 'M'
  if (value >= 1_000)     return (value / 1_000).toFixed(value % 1_000 === 0 ? 0 : 1) + 'K'
  return String(Math.round(value))
}

export function useCounterAnimation(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const counterElements = Array.from(container.querySelectorAll('[data-count-to]'))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const element = entry.target
          const targetValue = parseFloat(element.dataset.countTo)
          const animationDuration = 1600
          const startTime = performance.now()

          const animateTick = currentTime => {
            const elapsed = Math.min(1, (currentTime - startTime) / animationDuration)
            const easedProgress = 1 - Math.pow(1 - elapsed, 3)
            element.textContent = formatLargeNumber(targetValue * easedProgress)
            if (elapsed < 1) requestAnimationFrame(animateTick)
            else element.textContent = formatLargeNumber(targetValue)
          }

          requestAnimationFrame(animateTick)
          observer.unobserve(element)
        })
      },
      { threshold: 0.4 }
    )

    counterElements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [containerRef])
}
