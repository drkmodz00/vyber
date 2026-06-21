import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchCar } from '../api/carsApi'
import Navbar from '../components/ui/Navbar'

const O = "'Orbitron', monospace"
const R = "'Rajdhani', sans-serif"

function StatBox({ label, value, accent }) {
  return (
    <div style={{
      padding: '16px',
      background: 'rgba(255,255,255,0.025)',
      border: '0.5px solid rgba(255,255,255,0.07)',
      borderRadius: '4px',
      display: 'flex', flexDirection: 'column', gap: '6px',
    }}>
      <span style={{
        fontFamily: R, fontSize: '9px', fontWeight: 700,
        letterSpacing: '0.22em', color: 'rgba(255,255,255,0.28)',
        textTransform: 'uppercase',
      }}>{label}</span>
      <span style={{
        fontFamily: O, fontSize: '15px',
        fontWeight: 600, color: accent || '#fff',
      }}>{value}</span>
    </div>
  )
}

export default function CarDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('specs')
  const [imgLoaded, setImgLoaded] = useState(false)

  const { data: car, isLoading, isError } = useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCar(id),
  })

  // ── Loading ──
  if (isLoading) return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#040810',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        fontFamily: O, fontSize: '12px',
        color: 'rgba(255,255,255,0.25)',
        letterSpacing: '0.3em',
      }}>LOADING...</div>
    </div>
  )

  // ── Error ──
  if (isError || !car) return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#040810',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '16px',
    }}>
      <div style={{ fontFamily: O, fontSize: '13px', color: '#ff4444', letterSpacing: '0.2em' }}>
        CAR NOT FOUND
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          fontFamily: R, fontSize: '12px', fontWeight: 700,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          padding: '10px 24px',
          border: '0.5px solid rgba(255,255,255,0.2)',
          background: 'transparent', color: 'rgba(255,255,255,0.5)',
          borderRadius: '2px', cursor: 'pointer',
        }}
      >Back to Home</button>
    </div>
  )

  const tabs = ['specs', 'features', 'enquire']

  const specs = [
    { label: 'Engine',       value: car.engine       || 'N/A' },
    { label: 'Transmission', value: car.transmission  || 'N/A' },
    { label: 'Drivetrain',   value: car.drivetrain    || 'N/A' },
    { label: 'Horsepower',   value: car.horsepower },
    { label: 'Torque',       value: car.torque        || 'N/A' },
    { label: '0 – 60 mph',   value: car.zero_sixty + 's' },
    { label: 'Top Speed',    value: car.top_speed },
    { label: 'Seats',        value: car.seats         || '2'   },
  ]

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'radial-gradient(ellipse at 30% 20%, #0a1628 0%, #040810 60%, #020508 100%)',
      overflowY: 'auto', overflowX: 'hidden',
      color: '#fff',
    }}>

      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }} />

      {/* Accent glow */}
      <div style={{
        position: 'fixed', pointerEvents: 'none', zIndex: 0,
        width: '500px', height: '400px',
        top: '10%', right: '-100px',
        background: car.color_accent,
        opacity: 0.04, filter: 'blur(120px)', borderRadius: '50%',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />

        <div style={{ padding: '96px 48px 64px' }}>

          {/* Back breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'none', border: 'none',
              fontFamily: R, fontSize: '11px', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.28)', cursor: 'pointer',
              marginBottom: '40px', padding: 0,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.28)'}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          {/* ── Main grid: image left, info right ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'start',
            marginBottom: '64px',
          }}>

            {/* LEFT — image */}
            <div>
              <div style={{
                position: 'relative',
                background: `radial-gradient(ellipse at 50% 55%, ${car.color_accent}16, #030710 65%)`,
                borderRadius: '8px',
                border: `0.5px solid ${car.color_accent}22`,
                aspectRatio: '16/10',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
                marginBottom: '16px',
              }}>
                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  fontFamily: R, fontSize: '9px', fontWeight: 700,
                  letterSpacing: '0.25em', textTransform: 'uppercase',
                  color: car.color_accent,
                  background: `${car.color_accent}18`,
                  border: `0.5px solid ${car.color_accent}44`,
                  padding: '4px 10px', borderRadius: '2px',
                }}>{car.category}</div>

                {/* Status dot */}
                <div style={{
                  position: 'absolute', top: '16px', right: '16px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#00ff88',
                    boxShadow: '0 0 6px #00ff88',
                  }} />
                  <span style={{
                    fontFamily: R, fontSize: '10px',
                    color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em',
                  }}>In Stock</span>
                </div>

                {!imgLoaded && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(255,255,255,0.02)',
                    borderRadius: '8px',
                  }} />
                )}

                <img
                  src={car.image_url}
                  alt={car.name}
                  onLoad={() => setImgLoaded(true)}
                  style={{
                    width: '85%', height: '85%',
                    objectFit: 'contain',
                    opacity: imgLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                    filter: `drop-shadow(0 20px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 40px ${car.color_accent}22)`,
                  }}
                />

                {/* Floor line */}
                <div style={{
                  position: 'absolute', bottom: '20px',
                  left: '10%', right: '10%', height: '1px',
                  background: `linear-gradient(90deg, transparent, ${car.color_accent}40, transparent)`,
                }} />
              </div>

              {/* Year + color info */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 0',
                borderTop: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <span style={{
                  fontFamily: R, fontSize: '11px',
                  color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em',
                }}>{car.year || '2024'} Model Year</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: car.color_accent,
                    boxShadow: `0 0 8px ${car.color_accent}88`,
                  }} />
                  <span style={{
                    fontFamily: R, fontSize: '11px',
                    color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em',
                  }}>{car.color || 'Custom Color'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT — info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Category + year */}
              <div style={{
                fontFamily: R, fontSize: '10px', fontWeight: 700,
                letterSpacing: '0.35em', color: car.color_accent,
                textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <div style={{ width: '20px', height: '0.5px', background: car.color_accent }} />
                {car.category} · {car.year || '2024'}
              </div>

              {/* Name */}
              <div>
                <h1 style={{
                  fontFamily: O, fontWeight: 900, margin: 0,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  lineHeight: 1, color: '#fff',
                  letterSpacing: '0.02em',
                }}>{car.name}</h1>
                <p style={{
                  fontFamily: R, fontSize: '14px',
                  color: 'rgba(255,255,255,0.38)',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  margin: '8px 0 0',
                }}>{car.subtitle}</p>
              </div>

              {/* Price */}
              <div style={{
                padding: '16px 0',
                borderTop: '0.5px solid rgba(255,255,255,0.06)',
                borderBottom: '0.5px solid rgba(255,255,255,0.06)',
              }}>
                <div style={{
                  fontFamily: R, fontSize: '10px',
                  letterSpacing: '0.2em', color: 'rgba(255,255,255,0.22)',
                  textTransform: 'uppercase', marginBottom: '4px',
                }}>Starting Price</div>
                <div style={{
                  fontFamily: O, fontSize: 'clamp(24px, 3vw, 36px)',
                  fontWeight: 700, color: '#c9a84c',
                }}>{car.price}</div>
              </div>

              {/* Key figures 2x2 */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
              }}>
                <StatBox label="Horsepower"  value={car.horsepower}            accent={car.color_accent} />
                <StatBox label="0 – 60 mph"  value={`${car.zero_sixty}s`}      accent={car.color_accent} />
                <StatBox label="Top Speed"   value={car.top_speed}             accent={car.color_accent} />
                <StatBox label="Drivetrain"  value={car.drivetrain || 'RWD'}   accent={car.color_accent} />
              </div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{
                  flex: 1, padding: '14px',
                  background: `linear-gradient(135deg, ${car.color_accent}cc, ${car.color_accent}88)`,
                  border: 'none', borderRadius: '3px',
                  fontFamily: R, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#000', cursor: 'pointer',
                  transition: 'opacity 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Add to Garage
                </button>

                <button style={{
                  flex: 1, padding: '14px',
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '3px',
                  fontFamily: R, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                }}>
                  Request Test Drive
                </button>
              </div>

            </div>
          </div>

          {/* ── Bottom tabs ── */}
          <div>
            {/* Tab bar */}
            <div style={{
              display: 'flex', gap: '0',
              borderBottom: '0.5px solid rgba(255,255,255,0.07)',
              marginBottom: '32px',
            }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '12px 28px',
                    background: 'none', border: 'none',
                    borderBottom: `1.5px solid ${activeTab === tab ? car.color_accent : 'transparent'}`,
                    fontFamily: R, fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.3)',
                    cursor: 'pointer', transition: 'all 0.25s',
                    marginBottom: '-0.5px',
                  }}
                >{tab}</button>
              ))}
            </div>

            {/* Specs tab */}
            {activeTab === 'specs' && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
              }}>
                {specs.map(s => (
                  <StatBox key={s.label} label={s.label} value={s.value} />
                ))}
              </div>
            )}

            {/* Features tab */}
            {activeTab === 'features' && (
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
              }}>
                {[
                  'Carbon Fibre Monocell Chassis',
                  'Active Aerodynamics Package',
                  'Race-Derived Suspension',
                  'Bespoke Alcantara Interior',
                  'Track Telemetry System',
                  'Titanium Exhaust System',
                  'Carbon Ceramic Brakes',
                  'Launch Control System',
                ].map(f => (
                  <div key={f} style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '0.5px solid rgba(255,255,255,0.06)',
                    borderRadius: '4px',
                  }}>
                    <div style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: car.color_accent, flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: R, fontSize: '13px',
                      color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em',
                    }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Enquire tab */}
            {activeTab === 'enquire' && (
              <div style={{
                maxWidth: '520px',
                display: 'flex', flexDirection: 'column', gap: '12px',
              }}>
                <p style={{
                  fontFamily: R, fontSize: '15px', lineHeight: 1.75,
                  color: 'rgba(255,255,255,0.4)', margin: '0 0 8px',
                }}>
                  Interested in the {car.name}? Fill in your details and our
                  concierge team will contact you within 24 hours.
                </p>
                {['Full Name', 'Email Address', 'Phone Number'].map(field => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field}
                    style={{
                      width: '100%', padding: '12px 16px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '0.5px solid rgba(255,255,255,0.1)',
                      borderRadius: '3px', outline: 'none',
                      fontFamily: R, fontSize: '13px',
                      color: '#fff', letterSpacing: '0.05em',
                    }}
                  />
                ))}
                <textarea
                  placeholder="Any specific requirements or questions?"
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '0.5px solid rgba(255,255,255,0.1)',
                    borderRadius: '3px', outline: 'none', resize: 'vertical',
                    fontFamily: R, fontSize: '13px',
                    color: '#fff', letterSpacing: '0.05em',
                  }}
                />
                <button style={{
                  padding: '14px',
                  background: `linear-gradient(135deg, #0077ff, #00d4ff)`,
                  border: 'none', borderRadius: '3px',
                  fontFamily: R, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#fff', cursor: 'pointer',
                }}>
                  Send Enquiry
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        input::placeholder, textarea::placeholder {
          color: rgba(255,255,255,0.2);
          font-family: 'Rajdhani', sans-serif;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}