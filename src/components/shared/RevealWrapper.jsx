import { useRef, useEffect } from 'react'

export default function RevealWrapper({
  children,
  from = 'translateY(42px)',
  delay = 0,
  as: Tag = 'div',
  ...props
}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.animate(
            [
              { opacity: 0, transform: from },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 1000, delay, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'none' }
          )
          observer.unobserve(element)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [from, delay])

  return (
    <Tag ref={elementRef} {...props}>
      {children}
    </Tag>
  )
}
