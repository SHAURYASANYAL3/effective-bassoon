import { useEffect, useMemo, useRef, useState } from 'react'

export const useObserverSignals = () => {
  const [message, setMessage] = useState('System neutral.')
  const [clickCount, setClickCount] = useState(0)
  const lastMove = useRef(performance.now())
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      const now = performance.now()
      const dt = now - lastMove.current
      const dx = event.clientX - lastPos.current.x
      const dy = event.clientY - lastPos.current.y
      const speed = Math.hypot(dx, dy) / Math.max(dt, 1)

      if (speed > 1.4) setMessage('Impatience detected.')
      if (speed < 0.18 && dt > 120) setMessage('You pay attention. Rare.')

      lastMove.current = now
      lastPos.current = { x: event.clientX, y: event.clientY }
    }

    const onClick = () => setClickCount((count) => count + 1)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      const idleMs = performance.now() - lastMove.current
      if (idleMs > 5000) setMessage('Still analyzing?')
    }, 1200)

    return () => window.clearInterval(timer)
  }, [])

  const secretUnlocked = useMemo(() => clickCount >= 12, [clickCount])

  return {
    clickCount,
    message: secretUnlocked ? 'You are not just observing anymore.' : message,
  }
}
