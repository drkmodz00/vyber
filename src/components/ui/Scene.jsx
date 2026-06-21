export default function Scene({ children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(ellipse at 30% 50%, #0a1628 0%, #040810 60%, #020508 100%)',
      overflow: 'hidden',
    }}>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
      }} />

      {/* Scanning line */}
      <div style={{
        position: 'absolute', left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.08) 20%, rgba(0,212,255,0.18) 50%, rgba(0,212,255,0.08) 80%, transparent 100%)',
        animation: 'scanMove 6s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Glow left */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '400px',
        background: 'rgba(0,119,255,0.07)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        top: '20%', left: '10%',
        pointerEvents: 'none',
        animation: 'breatheL 7s ease-in-out infinite',
      }} />

      {/* Glow right */}
      <div style={{
        position: 'absolute',
        width: '500px', height: '350px',
        background: 'rgba(0,212,255,0.04)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        top: '30%', right: '5%',
        pointerEvents: 'none',
        animation: 'breatheR 9s ease-in-out infinite',
      }} />

      {/* Corner brackets */}
      {[
        { top: '20px', left: '20px', borderTop: '1px solid rgba(0,212,255,0.25)', borderLeft: '1px solid rgba(0,212,255,0.25)' },
        { top: '20px', right: '20px', borderTop: '1px solid rgba(0,212,255,0.25)', borderRight: '1px solid rgba(0,212,255,0.25)' },
        { bottom: '20px', left: '20px', borderBottom: '1px solid rgba(0,212,255,0.25)', borderLeft: '1px solid rgba(0,212,255,0.25)' },
        { bottom: '20px', right: '20px', borderBottom: '1px solid rgba(0,212,255,0.25)', borderRight: '1px solid rgba(0,212,255,0.25)' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: '16px', height: '16px', pointerEvents: 'none', ...s }} />
      ))}

      {/* Live status */}
      <div style={{
        position: 'absolute', top: '20px', right: '44px',
        display: 'flex', alignItems: 'center', gap: '8px',
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '10px', letterSpacing: '0.2em',
        color: 'rgba(0,212,255,0.35)', textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        <div style={{ width: '5px', height: '5px', background: '#00d4ff', borderRadius: '50%', opacity: 0.7, animation: 'pulseDot 3s ease-in-out infinite' }} />
        <span>Live</span>
      </div>

      {/* Floor glow */}
      <div style={{
        position: 'absolute',
        bottom: '60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '120px',
        background: 'radial-gradient(ellipse, rgba(0,212,255,0.045) 0%, transparent 70%)',
        borderRadius: '50%',
        border: '0.5px solid rgba(0,212,255,0.07)',
        pointerEvents: 'none',
        animation: 'floorPulse 5s ease-in-out infinite',
      }} />

      {/* Floor line */}
      <div style={{
        position: 'absolute',
        bottom: '60px', left: '50%',
        transform: 'translateX(-50%)',
        width: '500px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.18), transparent)',
        pointerEvents: 'none',
      }} />

      {/* Floor fade */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0, height: '80px',
        background: 'linear-gradient(transparent, rgba(0,8,20,0.9))',
        pointerEvents: 'none',
      }} />

      {/* Side accent */}
      <div style={{
        position: 'absolute',
        left: '24px', top: '50%',
        transform: 'translateY(-50%)',
        height: '160px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '6px',
        zIndex: 5, pointerEvents: 'none',
      }}>
        <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, transparent, #00d4ff, transparent)', opacity: 0.28 }} />
        <div style={{ width: '4px', height: '4px', background: '#00d4ff', borderRadius: '50%', animation: 'pulseDot 2s ease-in-out infinite' }} />
        <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, #00d4ff, transparent, transparent)', opacity: 0.28 }} />
      </div>

      {/* Hint text */}
      <div style={{
        position: 'absolute',
        bottom: '14px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '16px',
        opacity: 0.22, zIndex: 10,
        fontFamily: 'Rajdhani, sans-serif',
        fontSize: '11px', letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.6)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        <span>Drag to rotate</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>Scroll to zoom</span>
      </div>

      {children}

      <style>{`
        @keyframes pulseDot {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.6); }
        }
        @keyframes breatheL {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
        @keyframes breatheR {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.06); }
        }
        @keyframes floorPulse {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1; }
        }
        @keyframes scanMove {
          0%   { top: -2px; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}