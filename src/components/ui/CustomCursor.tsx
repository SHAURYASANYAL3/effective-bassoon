import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const hoverSelector = 'a,button,input,textarea,[data-cursor="active"]'

export const CustomCursor = () => {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { damping: 24, stiffness: 250, mass: 0.4 })
  const smoothY = useSpring(y, { damping: 24, stiffness: 250, mass: 0.4 })
  const [interactive, setInteractive] = useState(false)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setInteractive(Boolean((event.target as HTMLElement)?.closest(hoverSelector)))
    }

    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [x, y])

  return (
    <>
      <motion.div className="fixed z-[100] h-2 w-2 rounded-full bg-sigil pointer-events-none" style={{ x: smoothX, y: smoothY }} />
      <motion.div
        className="fixed z-[90] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-sigil/70"
        style={{ x: smoothX, y: smoothY }}
        animate={{
          width: interactive ? 38 : 24,
          height: interactive ? 38 : 24,
          opacity: clicked ? 0.95 : 0.55,
          boxShadow: interactive ? '0 0 28px rgba(129,167,255,0.75)' : '0 0 8px rgba(129,167,255,0.3)',
          scale: clicked ? 1.2 : 1,
        }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
      />
    </>
  )
}
