import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const O = 'Orbitron, monospace'
const R = 'Rajdhani, sans-serif'

function NavButton({ label, onClick, path, disabled }) {
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed]  = useState(false)

  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      onTapCancel={() => setPressed(false)}
      animate={{
        scale: pressed ? 0.93 : 1,
        borderColor: hovered
          ? 'rgba(0,212,255,0.6)'
          : disabled
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.12)',
        opacity: disabled ? 0.3 : 1,
      }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{
        width: '52px', height: '52px',
        border: '0.5px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(10px)',
        borderRadius: '2px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {/* Fill */}
      <motion.span
        animate={{ opacity: hovered && !disabled ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0077ff, #00d4ff)',
        }}
      />

      {/* Corner accents — appear on hover */}
      {[
        { top: 0, left: 0,   borderTop: '1px solid #00d4ff', borderLeft: '1px solid #00d4ff' },
        { top: 0, right: 0,  borderTop: '1px solid #00d4ff', borderRight: '1px solid #00d4ff' },
        { bottom: 0, left: 0,  borderBottom: '1px solid #00d4ff', borderLeft: '1px solid #00d4ff' },
        { bottom: 0, right: 0, borderBottom: '1px solid #00d4ff', borderRight: '1px solid #00d4ff' },
      ].map((s, i) => (
        <motion.span
          key={i}
          animate={{ opacity: hovered && !disabled ? 1 : 0, scale: hovered && !disabled ? 1 : 1.4 }}
          transition={{ duration: 0.2, delay: i * 0.02 }}
          style={{
            position: 'absolute',
            width: '6px', height: '6px',
            pointerEvents: 'none',
            ...s,
          }}
        />
      ))}

      <svg
        width="18" height="18" viewBox="0 0 18 18" fill="none"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <path
          d={path}
          stroke={hovered && !disabled ? '#000' : 'rgba(255,255,255,0.8)'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke 0.2s' }}
        />
      </svg>
    </motion.button>
  )
}

export default function NavArrows({ onPrev, onNext, current, total }) {
  return (
    <div style={{
      position: 'absolute',
      right: '48px', top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 20,
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-end', gap: '24px',
    }}>

      {/* Counter */}
      <div style={{ textAlign: 'right', lineHeight: 1 }}>

        {/* Current — animates on change */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: O, fontSize: '56px',
              fontWeight: 900, color: '#fff',
              lineHeight: 1,
            }}
          >
            {String(current + 1).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          alignItems: 'center', gap: '6px',
          margin: '6px 0',
        }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(to left, rgba(0,212,255,0.4), transparent)',
            flex: 1, maxWidth: '40px',
          }} />
          <span style={{
            fontFamily: R, fontSize: '10px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
          }}>OF</span>
        </div>

        {/* Total */}
        <div style={{
          fontFamily: O, fontSize: '20px',
          fontWeight: 400, color: 'rgba(255,255,255,0.2)',
          lineHeight: 1,
        }}>
          {String(total).padStart(2, '0')}
        </div>
      </div>

      {/* Progress track */}
      <div style={{
        width: '2px', height: `${total * 14}px`,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: '1px', position: 'relative',
        alignSelf: 'flex-end', marginRight: '25px',
      }}>
        <motion.div
          animate={{ height: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'linear-gradient(to bottom, #0077ff, #00d4ff)',
            borderRadius: '1px',
          }}
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <NavButton
          label="Previous"
          onClick={onPrev}
          path="M4 11L9 6L14 11"
          disabled={current === 0}
        />
        <NavButton
          label="Next"
          onClick={onNext}
          path="M4 7L9 12L14 7"
          disabled={current === total - 1}
        />
      </div>

    </div>
  )
}