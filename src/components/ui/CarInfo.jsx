import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SYSTEM_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
const R = 'Rajdhani, sans-serif'
const O = 'Orbitron, monospace'

export default function CarInfo({ car }) {
  const navigate = useNavigate()
  if (!car) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={car.id}
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          left: '60px', 
          bottom: '100px',
          zIndex: 20, 
          maxWidth: '400px',
        }}
      >
        {/* Category tag */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '16px',
          }}
        >
          <span style={{
            display: 'inline-block', 
            width: '16px', 
            height: '1px',
            background: '#00d4ff', 
            opacity: 0.8,
          }} />
          <span style={{
            fontFamily: R, 
            fontSize: '11px', 
            fontWeight: 700,
            letterSpacing: '0.4em', 
            color: '#00d4ff',
            textTransform: 'uppercase',
          }}>
            {car.category}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: SYSTEM_SANS,
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800, 
            color: '#fff',
            lineHeight: 1.0, 
            marginBottom: '8px',
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
          }}
        >
          {car.name}
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          style={{
            fontFamily: R, 
            fontSize: '13px', 
            fontWeight: 500,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.15em', 
            textTransform: 'uppercase',
            marginBottom: '28px',
          }}
        >
          {car.subtitle}
        </motion.div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex', 
            alignItems: 'baseline', 
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <span style={{
            fontFamily: R, 
            fontSize: '11px', 
            fontWeight: 700,
            letterSpacing: '0.2em', 
            color: 'rgba(201,168,76,0.5)',
            textTransform: 'uppercase',
          }}>
            From
          </span>
          <span style={{
            fontFamily: O,
            fontSize: 'clamp(22px, 2.5vw, 32px)',
            fontWeight: 500, 
            color: '#c9a84c',
            letterSpacing: '-0.02em',
          }}>
            {car.price}
          </span>
        </motion.div>

        {/* Specs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28, duration: 0.4 }}
          style={{
            display: 'flex', 
            gap: '0',
            marginBottom: '36px',
            paddingBottom: '28px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { val: car.horsepower, label: 'Power' },
            { val: `${car.zero_sixty}s`, label: '0–60 mph' },
            { val: car.top_speed, label: 'Top Speed' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                flex: 1,
                display: 'flex', 
                flexDirection: 'column', 
                gap: '6px',
                paddingRight: '24px',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                paddingLeft: i > 0 ? '24px' : '0',
              }}
            >
              <span style={{
                fontFamily: O, 
                fontSize: '16px',
                fontWeight: 500, 
                color: '#fff',
                letterSpacing: '-0.01em',
              }}>
                {s.val}
              </span>
              <span style={{
                fontFamily: R, 
                fontSize: '10px',
                fontWeight: 700, 
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.35)',
                textTransform: 'uppercase',
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.33, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/cars/${car.id}`)}
            style={{
              fontFamily: R, 
              fontSize: '12px', 
              fontWeight: 700,
              letterSpacing: '0.25em', 
              textTransform: 'uppercase',
              padding: '14px 36px',
              border: '1px solid #00d4ff', 
              color: '#00d4ff',
              borderRadius: '1px', 
              background: 'transparent',
              position: 'relative', 
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'color 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#000'
              e.currentTarget.querySelector('.fill').style.transform = 'translateX(0)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#00d4ff'
              e.currentTarget.querySelector('.fill').style.transform = 'translateX(-101%)'
            }}
          >
            <span
              className="fill"
              style={{
                position: 'absolute', 
                inset: 0,
                background: '#00d4ff',
                transform: 'translateX(-101%)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
            <span style={{ position: 'relative', zIndex: 1 }}>Explore Model</span>
          </motion.button>

          {/* Ghost secondary */}
          <motion.button
            whileHover={{ opacity: 1 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontFamily: R, 
              fontSize: '12px', 
              fontWeight: 700,
              letterSpacing: '0.2em', 
              textTransform: 'uppercase',
              padding: '14px 20px',
              border: 'none', 
              background: 'transparent',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
          >
          </motion.button>
        </motion.div>

      </motion.div>
    </AnimatePresence>
  )
}