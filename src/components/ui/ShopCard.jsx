import { useState } from 'react'

export default function ShopCard({ car }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? car.color_accent + '66' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 20px 60px ${car.color_accent}22` : '0 4px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Category badge */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px', zIndex: 2,
        background: car.color_accent + '22',
        border: `1px solid ${car.color_accent}66`,
        color: car.color_accent,
        fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.15em', padding: '4px 10px',
        borderRadius: '4px', fontFamily: 'sans-serif',
      }}>
        {car.category}
      </div>

      {/* Car image */}
      <div style={{
        width: '100%', aspectRatio: '16/9',
        background: 'rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', position: 'relative',
      }}>
        {/* Accent glow behind image */}
        <div style={{
          position: 'absolute',
          width: '80%', height: '60%',
          background: car.color_accent,
          opacity: hovered ? 0.08 : 0.04,
          filter: 'blur(40px)',
          borderRadius: '50%',
          transition: 'opacity 0.3s ease',
        }} />
        <img
          src={car.image_url}
          alt={car.name}
          style={{
            width: '90%', height: '90%',
            objectFit: 'contain',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.4s ease',
            filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.8)) drop-shadow(0 0 30px ${car.color_accent}33)`,
            position: 'relative', zIndex: 1,
          }}
        />
      </div>

      {/* Car info */}
      <div style={{ padding: '20px 24px 24px', fontFamily: 'sans-serif' }}>
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '4px' }}>
          {car.subtitle}
        </div>
        <div style={{ color: '#fff', fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '16px' }}>
          {car.name}
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          {[
            { label: 'HP',    value: car.horsepower },
            { label: '0-60',  value: car.zero_sixty + 's' },
            { label: 'TOP',   value: car.top_speed },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ color: car.color_accent, fontSize: '13px', fontWeight: 700 }}>
                {stat.value}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '9px', letterSpacing: '0.1em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Price + button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: 700 }}>
            {car.price}
          </div>
          <button style={{
            background: hovered ? car.color_accent : 'transparent',
            border: `1px solid ${car.color_accent}`,
            color: hovered ? '#000' : car.color_accent,
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.15em', padding: '8px 18px',
            borderRadius: '6px', cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'sans-serif',
          }}>
            VIEW CAR
          </button>
        </div>
      </div>
    </div>
  )
}