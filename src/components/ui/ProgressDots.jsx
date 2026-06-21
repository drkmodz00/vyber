export default function ProgressDots({ total, current, onSelect }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '32px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', gap: '8px', alignItems: 'center',
      zIndex: 20,
    }}>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Car ${i + 1}`}
            style={{
              padding: 0, border: 'none', background: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              height: '20px',
            }}
          >
            {/* Track */}
            <div style={{
              width: isActive ? '40px' : '20px',
              height: '2px',
              borderRadius: '1px',
              background: 'rgba(255,255,255,0.12)',
              transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Fill bar that slides in */}
              <div style={{
                position: 'absolute', inset: 0,
                background: '#00d4ff',
                borderRadius: '1px',
                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </button>
        )
      })}
    </div>
  )
}