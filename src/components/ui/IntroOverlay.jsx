import { useEffect, useState } from 'react'

export default function IntroOverlay({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100)
    const t2 = setTimeout(() => setStep(2), 2400)
    const t3 = setTimeout(() => onDone(), 3100)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#09090f',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      opacity: step === 2 ? 0 : 1,
      transform: step === 2 ? 'scale(1.04)' : 'scale(1)',
      pointerEvents: step === 2 ? 'none' : 'all',
      overflow: 'hidden',
    }}>

      {/* Ambient glow rings */}
      <div style={{
        position: 'absolute',
        width: '480px', height: '480px',
        borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.06)',
        boxShadow: '0 0 80px 40px rgba(0,212,255,0.04)',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'scale(1)' : 'scale(0.7)',
        transition: 'opacity 1.4s ease 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '660px', height: '660px',
        borderRadius: '50%',
        border: '1px solid rgba(0,212,255,0.03)',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'scale(1)' : 'scale(0.85)',
        transition: 'opacity 1.6s ease 0.4s, transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.4s',
        pointerEvents: 'none',
      }} />

      {/* Wordmark with ghost glow layer */}
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: 'clamp(52px, 9vw, 100px)',
          fontWeight: 900,
          letterSpacing: '0.3em',
          background: 'linear-gradient(135deg, #fff 30%, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? 'translateY(0)' : 'translateY(28px)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
        }}>
          VYBER
        </div>
        {/* Ghost blur layer for glow effect */}
        <div style={{
          position: 'absolute', inset: 0,
          fontFamily: "'Orbitron', monospace",
          fontSize: 'clamp(52px, 9vw, 100px)',
          fontWeight: 900,
          letterSpacing: '0.3em',
          background: 'linear-gradient(135deg, #fff 30%, #00d4ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'blur(24px)',
          opacity: step >= 1 ? 0.35 : 0,
          transform: 'translateY(4px)',
          pointerEvents: 'none',
          transition: 'opacity 0.9s ease',
        }}>
          VYBER
        </div>
      </div>

      <div style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '13px',
        fontWeight: 300,
        letterSpacing: '0.6em',
        color: 'rgba(255,255,255,0.35)',
        marginTop: '18px',
        textTransform: 'uppercase',
        opacity: step >= 1 ? 1 : 0,
        transform: step >= 1 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s',
      }}>
        Premium Auto Experience
      </div>

      {/* Rule with center dot */}
      <div style={{ marginTop: '40px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          width: step >= 1 ? '280px' : '0px',
          transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s',
        }} />
        <div style={{
          position: 'absolute',
          width: '5px', height: '5px',
          borderRadius: '50%',
          background: '#00d4ff',
          boxShadow: '0 0 10px 4px rgba(0,212,255,0.6)',
          opacity: step >= 1 ? 1 : 0,
          transition: 'opacity 0.4s ease 1.4s',
        }} />
      </div>
    </div>
  )
}