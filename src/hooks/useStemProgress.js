import { useEffect } from 'react'

export function useStemProgress(stemWrapRef, stemProgressBarRef) {
  useEffect(() => {
    const stemWrap = stemWrapRef.current
    const stemProgressBar = stemProgressBarRef.current
    if (!stemWrap || !stemProgressBar) return

    const lotusNodes = Array.from(stemWrap.querySelectorAll('[data-lotus-node]'))

    const handleScroll = () => {
      const wrapRect = stemWrap.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 800

      const scrollProgress = Math.max(0, Math.min(1,
        (viewportHeight * 0.5 - wrapRect.top) / (wrapRect.height * 0.62)
      ))
      stemProgressBar.style.height = `${scrollProgress * 100}%`

      let lastActiveIndex = -1
      lotusNodes.forEach((node, index) => {
        if (node.getBoundingClientRect().top < viewportHeight * 0.5) {
          lastActiveIndex = index
        }
      })

      lotusNodes.forEach((node, index) => {
        if (index === lastActiveIndex)      node.style.opacity = '1'
        else if (index < lastActiveIndex)   node.style.opacity = '0.6'
        else                                node.style.opacity = '0.28'
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [stemWrapRef, stemProgressBarRef])
}
