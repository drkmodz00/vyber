import { useEffect, useRef } from 'react'

export default function CarLighting({ color_accent }) {
  const ref = useRef()
  const frameRef = useRef()
  const targetRef = useRef({ x: 50, y: 30 })
  const currentRef = useRef({ x: 50, y: 30 })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      targetRef.current = {
        x: ((e.clientX - rect.left) / rect.width)  * 100,
        y: ((e.clientY - rect.top)  / rect.height) * 100,
      }
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      const c = currentRef.current
      const t = targetRef.current
      c.x = lerp(c.x, t.x, 0.06)
      c.y = lerp(c.y, t.y, 0.06)
      el.style.setProperty('--lx', `${c.x.toFixed(2)}%`)
      el.style.setProperty('--ly', `${c.y.toFixed(2)}%`)
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '--lx': '50%',
        '--ly': '30%',
        '--accent': color_accent,
      }}
    >
      {/* Key light — follows mouse via lerp */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          circle at var(--lx) var(--ly),
          rgba(255,255,255,0.09) 0%,
          rgba(255,255,255,0.02) 35%,
          transparent 65%
        )`,
      }} />

      {/* Secondary fill — offset from key for depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          circle at calc(var(--lx) + 12%) calc(var(--ly) + 18%),
          ${color_accent}0d 0%,
          transparent 50%
        )`,
      }} />

      {/* Accent rim light — bottom-left, colour-tinted */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          ellipse at 10% 90%,
          ${color_accent}22 0%,
          ${color_accent}08 30%,
          transparent 60%
        )`,
      }} />

      {/* Counter rim — top-right, cool white fill */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          ellipse at 92% 8%,
          rgba(200,230,255,0.05) 0%,
          transparent 45%
        )`,
      }} />

      {/* Top specular glint */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          ellipse at 50% 0%,
          rgba(255,255,255,0.05) 0%,
          transparent 40%
        )`,
      }} />

      {/* Floor bounce — accent colour reflecting up from below */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          ellipse at 50% 105%,
          ${color_accent}14 0%,
          transparent 55%
        )`,
      }} />
    </div>
  )
}