import { useEffect } from 'react'

export function useParallax(containerRef) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const parallaxElements = Array.from(container.querySelectorAll('[data-parallax-speed]'))
    if (!parallaxElements.length) return

    const handleScroll = () => {
      const viewportHeight = window.innerHeight || 800
      parallaxElements.forEach(element => {
        const rect = element.getBoundingClientRect()
        const elementCenterY = rect.top + rect.height / 2
        const speed = parseFloat(element.dataset.parallaxSpeed) || 0.15
        const baseTransform = element.dataset.parallaxBase || ''
        const offset = (elementCenterY - viewportHeight / 2) * -speed
        element.style.transform = `${baseTransform} translateY(${offset.toFixed(1)}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [containerRef])
}
