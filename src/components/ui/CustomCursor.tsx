import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

export const CustomCursor = () => {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { damping: 25, stiffness: 280, mass: 0.3 })
  const smoothY = useSpring(y, { damping: 25, stiffness: 280, mass: 0.3 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  return (
    <>
      <motion.div className="fixed z-[100] h-2 w-2 rounded-full bg-sigil pointer-events-none" style={{ x: smoothX, y: smoothY }} />
      <motion.div
        className="fixed z-[90] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sigil/60 pointer-events-none"
        style={{ x: smoothX, y: smoothY }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 0.35, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  )
}
