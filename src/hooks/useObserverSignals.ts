import { useEffect, useMemo, useRef, useState } from 'react'

export const useObserverSignals = () => {
  const [message, setMessage] = useState('System neutral.')
  const [clickCount, setClickCount] = useState(0)
  const lastMove = useRef(performance.now())
  const lastPos = useRef({ x: 0, y: 0 })
  const lastScroll = useRef({ y: 0, t: performance.now() })

  useEffect(() => {
    const queueMessage = (text: string, delay = 220) => {
      window.setTimeout(() => setMessage(text), delay)
    }

    const onMove = (event: MouseEvent) => {
      const now = performance.now()
      const dt = now - lastMove.current
      const dx = event.clientX - lastPos.current.x
      const dy = event.clientY - lastPos.current.y
      const speed = Math.hypot(dx, dy) / Math.max(dt, 1)

      if (speed > 1.35) queueMessage('Impatience detected.', 240)
      if (speed < 0.16 && dt > 120) queueMessage('You pay attention. Rare.', 350)

      lastMove.current = now
      lastPos.current = { x: event.clientX, y: event.clientY }
    }

    const onScroll = () => {
      const now = performance.now()
      const dy = Math.abs(window.scrollY - lastScroll.current.y)
      const dt = Math.max(now - lastScroll.current.t, 1)
      const velocity = dy / dt
      const depth = window.scrollY / Math.max(document.body.scrollHeight - window.innerHeight, 1)

      if (velocity > 2.2) queueMessage('Rapid scan detected.', 250)
      else if (depth > 0.75) queueMessage('Deep in the archive.', 420)

      lastScroll.current = { y: window.scrollY, t: now }
    }

    const onClick = () => setClickCount((count) => count + 1)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const idleMs = performance.now() - lastMove.current
      if (idleMs > 5000) setMessage('Still analyzing?')
    }, 1250)

    return () => window.clearInterval(timer)
  }, [])

  const secretUnlocked = useMemo(() => clickCount >= 12, [clickCount])

  return {
    clickCount,
    message: secretUnlocked ? 'You are not just a visitor.' : message,
  }
}
