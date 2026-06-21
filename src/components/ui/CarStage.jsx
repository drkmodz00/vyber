import { useEffect, useRef, useState, useCallback } from 'react'
import CarLighting from './CarLighting'

export default function CarStage({ car }) {
  const [rotY, setRotY]       = useState(-8)
  const [rotX, setRotX]       = useState(2)
  const [scale, setScale]     = useState(1)
  const [isDragging, setDrag] = useState(false)
  const [loaded, setLoaded]   = useState(false)

  const lastX    = useRef(0)
  const lastY    = useRef(0)
  const frameId  = useRef(null)
  const autoRot  = useRef(true)
  const rotYRef  = useRef(-8)
  const rotXRef  = useRef(2)
  const scaleRef = useRef(1)
  const velX     = useRef(0)
  const velY     = useRef(0)

  // Sync refs so the rAF loop reads current values without stale closures
  useEffect(() => { rotYRef.current = rotY }, [rotY])
  useEffect(() => { rotXRef.current = rotX }, [rotX])
  useEffect(() => { scaleRef.current = scale }, [scale])

  useEffect(() => {
    const tick = () => {
      if (autoRot.current) {
        rotYRef.current += 0.06
        setRotY(rotYRef.current)
      } else {
        // Inertia: bleed velocity while not dragging
        velX.current *= 0.92
        velY.current *= 0.92
        if (Math.abs(velX.current) > 0.01 || Math.abs(velY.current) > 0.01) {
          rotYRef.current += velX.current
          rotXRef.current = Math.max(-15, Math.min(15, rotXRef.current + velY.current))
          setRotY(rotYRef.current)
          setRotX(rotXRef.current)
        }
      }
      frameId.current = requestAnimationFrame(tick)
    }
    frameId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId.current)
  }, [])

  useEffect(() => {
    setLoaded(false)
    rotYRef.current = -8
    rotXRef.current = 2
    scaleRef.current = 1
    setRotY(-8)
    setRotX(2)
    setScale(1)
    velX.current = 0
    velY.current = 0
    autoRot.current = true
  }, [car?.id])

  const resumeTimer = useRef(null)
  const scheduleResume = useCallback(() => {
    clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => { autoRot.current = true }, 2200)
  }, [])

  const onMouseDown = useCallback(e => {
    setDrag(true)
    autoRot.current = false
    clearTimeout(resumeTimer.current)
    lastX.current = e.clientX
    lastY.current = e.clientY
    velX.current = 0
    velY.current = 0
  }, [scheduleResume])

  const onMouseMove = useCallback(e => {
    if (!isDragging) return
    const dx = e.clientX - lastX.current
    const dy = e.clientY - lastY.current
    velX.current = dx * 0.5
    velY.current = -dy * 0.3
    rotYRef.current += velX.current
    rotXRef.current = Math.max(-15, Math.min(15, rotXRef.current + velY.current))
    setRotY(rotYRef.current)
    setRotX(rotXRef.current)
    lastX.current = e.clientX
    lastY.current = e.clientY
  }, [isDragging])

  const onMouseUp = useCallback(() => {
    setDrag(false)
    scheduleResume()
  }, [scheduleResume])

  const onTouchStart = useCallback(e => {
    autoRot.current = false
    clearTimeout(resumeTimer.current)
    lastX.current = e.touches[0].clientX
    lastY.current = e.touches[0].clientY
    velX.current = 0
    velY.current = 0
  }, [])

  const onTouchMove = useCallback(e => {
    const dx = e.touches[0].clientX - lastX.current
    const dy = e.touches[0].clientY - lastY.current
    velX.current = dx * 0.5
    velY.current = -dy * 0.3
    rotYRef.current += velX.current
    rotXRef.current = Math.max(-15, Math.min(15, rotXRef.current + velY.current))
    setRotY(rotYRef.current)
    setRotX(rotXRef.current)
    lastX.current = e.touches[0].clientX
    lastY.current = e.touches[0].clientY
  }, [])

  const onTouchEnd = useCallback(() => {
    scheduleResume()
  }, [scheduleResume])

  const onWheel = useCallback(e => {
    e.preventDefault()
    const next = Math.min(1.6, Math.max(0.7, scaleRef.current - e.deltaY * 0.001))
    scaleRef.current = next
    setScale(next)
  }, [])

  const shadowScaleX = 0.6 + Math.abs(Math.sin((rotY * Math.PI) / 180)) * 0.4

  if (!car) return null

  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        perspective: '1200px',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
    >
      {/* Ambient glow — breathes with float cycle */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '300px',
        background: car.color_accent,
        opacity: 0.06,
        filter: 'blur(100px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translateY(60px)',
        animation: 'breatheGlow 6s ease-in-out infinite',
      }} />

      {/* 3D car container */}
      <div style={{
        width: '70%', maxWidth: '720px',
        aspectRatio: '16/9',
        position: 'relative',
        transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`,
        transformStyle: 'preserve-3d',
        transition: isDragging ? 'none' : 'transform 0.05s linear',
      }}>

        {/* Shimmer while loading */}
        {!loaded && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            borderRadius: '8px',
          }} />
        )}

        {/* Car image */}
        <img
          key={car.image_url}
          src={car.image_url}
          alt={car.name}
          draggable={false}
          onLoad={() => setLoaded(true)}
          onError={e => console.error('Image failed:', e.target.src)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'contain',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.6s ease',
            filter: `drop-shadow(0 40px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 40px ${car.color_accent}44)`,
            pointerEvents: 'none',
            animation: 'floatCar 6s ease-in-out infinite',
          }}
        />

        {/* Ground reflection */}
        <img
          src={car.image_url}
          alt="" draggable={false} aria-hidden
          style={{
            position: 'absolute', bottom: '-30%', left: 0,
            width: '100%', height: '40%',
            objectFit: 'contain',
            transform: 'scaleY(-1)',
            opacity: 0.07,
            filter: 'blur(8px)',
            pointerEvents: 'none',
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)',
          }}
        />
      </div>

      {/* Ground shadow — scale + opacity tied to elevation */}
      <div style={{
        position: 'absolute', bottom: '18%',
        width: '45%', height: '18px',
        background: 'rgba(0,0,0,0.5)',
        filter: 'blur(18px)',
        borderRadius: '50%',
        transform: `scaleX(${shadowScaleX})`,
        transition: 'transform 0.1s linear',
        pointerEvents: 'none',
        animation: 'shadowFloat 6s ease-in-out infinite',
      }} />

      <CarLighting color_accent={car.color_accent} />

      <style>{`
        @keyframes floatCar {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes shadowFloat {
          0%, 100% { opacity: 0.5; transform: scaleX(${shadowScaleX}); }
          50%       { opacity: 0.3; transform: scaleX(${shadowScaleX * 0.82}); }
        }
        @keyframes breatheGlow {
          0%, 100% { opacity: 0.04; transform: translateY(60px) scale(1); }
          50%       { opacity: 0.08; transform: translateY(48px) scale(1.1); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>
    </div>
  )
}