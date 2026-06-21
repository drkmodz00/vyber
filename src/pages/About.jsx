import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Navbar       from '../components/ui/Navbar'


const O = "'Orbitron', monospace"
const R = "'Rajdhani', sans-serif"


// ─── Reusable fade-in-up on scroll ───────────────────────────────────────────
function Reveal({ children, delay = 0, x = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setVal(to); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {val.toLocaleString()}{suffix}
    </span>
  )
}

// ─── Thin horizontal rule with label ─────────────────────────────────────────
function Rule({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
      <div style={{ width: '32px', height: '1px', background: '#00d4ff', opacity: 0.6 }} />
      <span style={{
        fontFamily: R, fontSize: '10px', fontWeight: 700,
        letterSpacing: '0.4em', color: 'rgba(255,255,255,0.25)',
        textTransform: 'uppercase',
      }}>{label}</span>
      <div style={{ flex: 1, height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />
    </div>
  )
}

// ─── Team member card ─────────────────────────────────────────────────────────
function TeamCard({ name, role, quote, index, accentColor }) {
  const [hovered, setHovered] = useState(false)
  const initials = name.split(' ').map(w => w[0]).join('')
  return (
    <Reveal delay={index * 0.1}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: '28px',
          background: hovered ? 'rgba(255,255,255,0.045)' : 'rgba(255,255,255,0.02)',
          border: `0.5px solid ${hovered ? accentColor + '44' : 'rgba(255,255,255,0.07)'}`,
          borderRadius: '6px',
          transition: 'all 0.35s ease',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '3px', height: hovered ? '100%' : '40px',
          background: accentColor,
          opacity: hovered ? 0.6 : 0.3,
          transition: 'all 0.4s ease',
        }} />

        {/* Avatar */}
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: `radial-gradient(135deg, ${accentColor}33, rgba(0,0,0,0.3))`,
          border: `1px solid ${accentColor}44`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <span style={{
            fontFamily: O, fontSize: '14px', fontWeight: 700, color: accentColor,
          }}>{initials}</span>
        </div>

        <div style={{ fontFamily: O, fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '4px', letterSpacing: '0.05em' }}>
          {name}
        </div>
        <div style={{
          fontFamily: R, fontSize: '11px', fontWeight: 600,
          letterSpacing: '0.2em', color: accentColor,
          textTransform: 'uppercase', marginBottom: '16px',
        }}>{role}</div>
        <p style={{
          fontFamily: R, fontSize: '14px', lineHeight: 1.7,
          color: 'rgba(255,255,255,0.38)', fontStyle: 'italic',
        }}>"{quote}"</p>
      </div>
    </Reveal>
  )
}

// ─── Value pillar ─────────────────────────────────────────────────────────────
function Pillar({ icon, title, body, index }) {
  return (
    <Reveal delay={index * 0.08}>
      <div style={{
        padding: '32px 28px',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
        position: 'relative',
      }}>
        <div style={{
          fontFamily: O, fontSize: '28px', marginBottom: '16px',
          filter: 'grayscale(0.2)',
        }}>{icon}</div>
        <div style={{
          fontFamily: O, fontSize: '13px', fontWeight: 700,
          color: '#fff', letterSpacing: '0.08em', marginBottom: '10px',
        }}>{title}</div>
        <p style={{
          fontFamily: R, fontSize: '15px', lineHeight: 1.75,
          color: 'rgba(255,255,255,0.38)',
        }}>{body}</p>
      </div>
    </Reveal>
  )
}

// ─── Main About Page ──────────────────────────────────────────────────────────
export default function About({ onNavigate }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#040810',
      overflowY: 'auto', overflowX: 'hidden',
      color: '#fff',
    }}>

      {/* ── Ambient background ── */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 15% 20%, #091524 0%, #040810 55%)',
      }} />
      <div style={{
        position: 'fixed', width: '800px', height: '600px',
        top: '-200px', right: '-200px',
        background: 'rgba(0,119,255,0.04)',
        filter: 'blur(120px)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Topbar ── */}
        <div style={{ position: 'relative' }}>
          <Navbar />
        </div>

      {/* ── Page content ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ════════════════════════════════════
            HERO
        ════════════════════════════════════ */}
        <section style={{
          minHeight: '92vh',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: '0 48px',
          gap: '64px',
          position: 'relative',
          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
        }}>
          {/* Left */}
          <div>
         

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: O,
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                color: '#fff',
                margin: 0, marginBottom: '8px', marginTop: '10px',
              }}
            >
              WE DON'T
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: O,
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                background: 'linear-gradient(90deg, #00d4ff, #0077ff)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0, marginBottom: '8px',
              }}
            >
              SELL CARS.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: O,
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.18)',
                margin: 0, marginBottom: '36px',
              }}
            >
              WE CURATE
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: O,
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 900, lineHeight: 1,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.18)',
                margin: 0, marginBottom: '36px',
              }}
            >
              MACHINES.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              style={{
                fontFamily: R, fontSize: '17px',
                lineHeight: 1.8, color: 'rgba(255,255,255,0.42)',
                maxWidth: '440px', letterSpacing: '0.03em',
              }}
            >
              VYBER was built for the few who understand that a car is not
              transportation — it is a statement of intent. Every vehicle in
              our collection is hand-selected, verified, and presented with
              the reverence it deserves.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              style={{ display: 'flex', gap: '16px', marginTop: '36px' }}
            >
              <button
                onClick={() => onNavigate?.('shop')}
                style={{
                  fontFamily: R, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '13px 28px',
                  background: 'linear-gradient(135deg, #0077ff, #00d4ff)',
                  border: 'none', borderRadius: '3px', color: '#fff',
                  cursor: 'pointer',
                }}
              >Explore Collection</button>
              <button
                style={{
                  fontFamily: R, fontSize: '12px', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '13px 28px',
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.18)',
                  borderRadius: '3px', color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                }}
              >Contact Us</button>
            </motion.div>
          </div>

          {/* Right — decorative grid of numbers */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '2px',
            }}
          >
            {[
              { val: 200,  suffix: '+',  label: 'Vehicles Curated',   accent: '#00d4ff' },
              { val: 48,   suffix: '',   label: 'Countries Served',    accent: '#0077ff' },
              { val: 1200, suffix: '+',  label: 'Happy Clients',       accent: '#c9a84c' },
              { val: 100,  suffix: '%',  label: 'Verified & Certified', accent: '#00ff88' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: '36px 32px',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.015)',
                borderRadius: i === 0 ? '6px 0 0 0' : i === 1 ? '0 6px 0 0' : i === 2 ? '0 0 0 6px' : '0 0 6px 0',
                border: `0.5px solid rgba(255,255,255,0.06)`,
              }}>
                <div style={{
                  fontFamily: O, fontWeight: 900,
                  fontSize: 'clamp(28px, 3.5vw, 44px)',
                  color: s.accent, lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  <Counter to={s.val} suffix={s.suffix} />
                </div>
                <div style={{
                  fontFamily: R, fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.18em', color: 'rgba(255,255,255,0.28)',
                  textTransform: 'uppercase', lineHeight: 1.4,
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll cue */}
          <div style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
            opacity: 0.25,
          }}>
            <div style={{ fontFamily: R, fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff' }}>Scroll</div>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                <path d="M6 2V14M2 10L6 14L10 10" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* ════════════════════════════════════
            MISSION
        ════════════════════════════════════ */}
        <section style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }}>
          <Rule label="Our Mission" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

            <Reveal>
              <blockquote style={{
                fontFamily: O,
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                fontWeight: 500, lineHeight: 1.6,
                color: 'rgba(255,255,255,0.85)',
                borderLeft: '2px solid #00d4ff',
                paddingLeft: '28px',
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                "To make extraordinary automobiles accessible to those who
                appreciate them — transparently, elegantly, without compromise."
              </blockquote>
            </Reveal>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {[
                { title: 'Transparency First', body: 'Every price, every spec, every history report — visible before you ever speak to us. No hidden fees, no pressure.' },
                { title: 'Curated, Not Collected', body: 'We turn down more vehicles than we list. Every car that reaches VYBER has passed our 47-point verification process.' },
                { title: 'Built for the Long Term', body: 'Our relationship with a client doesn\'t end at purchase. Maintenance referrals, resale support, and lifetime concierge are standard.' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.1}>
                  <div style={{
                    paddingLeft: '20px',
                    borderLeft: '0.5px solid rgba(255,255,255,0.1)',
                  }}>
                    <div style={{ fontFamily: O, fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.08em', marginBottom: '6px' }}>
                      {item.title}
                    </div>
                    <p style={{ fontFamily: R, fontSize: '15px', lineHeight: 1.75, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            PILLARS
        ════════════════════════════════════ */}
        <section style={{
          padding: '80px 48px',
          background: 'rgba(255,255,255,0.015)',
          borderTop: '0.5px solid rgba(255,255,255,0.05)',
          borderBottom: '0.5px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Rule label="What We Stand For" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0' }}>
              {[
                { icon: '⚡', title: 'Performance',  body: 'We obsess over power figures, lap times, and engineering pedigree. Only machines that move the needle make it here.' },
                { icon: '🔍', title: 'Authenticity', body: 'Every VIN is checked. Every service record reviewed. Every claim independently verified before listing.' },
                { icon: '💎', title: 'Luxury',        body: 'From the way we write a listing to the way we deliver a vehicle — every touchpoint is designed to feel elevated.' },
                { icon: '🤝', title: 'Trust',         body: 'Our reputation is worth more than any single sale. We will always tell you what we know — including the bad.' },
              ].map((p, i) => <Pillar key={p.title} {...p} index={i} />)}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            TIMELINE
        ════════════════════════════════════ */}
        <section style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }}>
          <Rule label="Our Journey" />
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '0.5px', background: 'rgba(255,255,255,0.07)',
              transform: 'translateX(-50%)',
            }} />

            {[
              { year: '2022', title: 'The Idea',       body: 'Founded in a garage in Manila with a single conviction — that buying a hypercar online should feel as premium as owning one.', side: 'left' },
              { year: '2023', title: 'First 10 Cars',  body: 'We listed our first 10 verified vehicles. All 10 sold within 30 days. The waitlist began.', side: 'right' },
              { year: '2024', title: 'Going Global',   body: 'Expanded operations to Singapore, Dubai, and Los Angeles. Surpassed 200 verified listings.', side: 'left' },
              { year: '2025', title: 'VYBER Platform', body: 'Launched the full digital showroom — 3D previews, live concierge, and same-day delivery coordination.', side: 'right' },
            ].map((item, i) => (
              <Reveal key={item.year} delay={i * 0.1} x={item.side === 'left' ? -20 : 20}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0',
                  marginBottom: '64px',
                  direction: item.side === 'right' ? 'rtl' : 'ltr',
                }}>
                  <div style={{
                    direction: 'ltr',
                    padding: item.side === 'left' ? '0 48px 0 0' : '0 0 0 48px',
                    textAlign: item.side === 'left' ? 'right' : 'left',
                  }}>
                    <div style={{
                      fontFamily: O, fontSize: '11px', fontWeight: 700,
                      color: '#00d4ff', letterSpacing: '0.2em',
                      marginBottom: '8px',
                    }}>{item.year}</div>
                    <div style={{
                      fontFamily: O, fontSize: '16px', fontWeight: 700,
                      color: '#fff', letterSpacing: '0.05em',
                      marginBottom: '10px',
                    }}>{item.title}</div>
                    <p style={{
                      fontFamily: R, fontSize: '15px', lineHeight: 1.75,
                      color: 'rgba(255,255,255,0.38)', margin: 0,
                    }}>{item.body}</p>
                  </div>
                  <div /> {/* empty opposite cell */}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════
            TEAM
        ════════════════════════════════════ */}
        <section style={{
          padding: '80px 48px',
          borderTop: '0.5px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.01)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Rule label="The People Behind VYBER" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { name: 'Marcus Reyes',    role: 'Founder & CEO',        quote: 'Cars are the last honest luxury. Everything else can be faked.', accent: '#00d4ff' },
                { name: 'Sofia Tanaka',    role: 'Head of Curation',     quote: 'If it doesn\'t give you goosebumps on paper, it doesn\'t make the list.', accent: '#c9a84c' },
                { name: 'Diego Navarro',   role: 'Lead Verification',    quote: 'I\'ve seen a lot of cars. A great one announces itself before you open the door.', accent: '#ff6b00' },
                { name: 'Lena Hoffmann',   role: 'Client Experience',    quote: 'Our clients deserve to feel like they\'re the only client.', accent: '#00ff88' },
                { name: 'Raj Mehta',       role: 'Tech & Platform',      quote: 'We built VYBER the way an engineer would spec a car — nothing unnecessary, everything intentional.', accent: '#0077ff' },
                { name: 'Chloe Laurent',   role: 'Creative Director',    quote: 'A great car deserves a great stage. That\'s what I build every day.', accent: '#ff4422' },
              ].map((m, i) => (
                <TeamCard key={m.name} {...m} index={i} accentColor={m.accent} />
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            CTA FOOTER
        ════════════════════════════════════ */}
        <section style={{
          padding: '120px 48px',
          textAlign: 'center',
          borderTop: '0.5px solid rgba(255,255,255,0.05)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', height: '300px',
            background: 'rgba(0,119,255,0.05)',
            filter: 'blur(100px)', borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <Reveal>
            <div style={{
              fontFamily: R, fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.4em', color: '#00d4ff',
              textTransform: 'uppercase', marginBottom: '20px',
            }}>Ready to Find Your Machine?</div>

            <h2 style={{
              fontFamily: O, fontWeight: 900,
              fontSize: 'clamp(28px, 5vw, 56px)',
              color: '#fff', letterSpacing: '-0.01em',
              lineHeight: 1.05, margin: '0 0 16px',
            }}>THE RIGHT CAR</h2>
            <h2 style={{
              fontFamily: O, fontWeight: 900,
              fontSize: 'clamp(28px, 5vw, 56px)',
              background: 'linear-gradient(90deg, #00d4ff, #0077ff)',
              WebkitBackgroundClip: 'text', backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
              lineHeight: 1.05, margin: '0 0 32px',
            }}>IS WAITING FOR YOU.</h2>

            <p style={{
              fontFamily: R, fontSize: '16px', lineHeight: 1.8,
              color: 'rgba(255,255,255,0.35)',
              maxWidth: '480px', margin: '0 auto 40px',
            }}>
              Browse our full collection of verified, hand-selected hypercars, supercars, and electric machines.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                onClick={() => onNavigate?.('shop')}
                style={{
                  fontFamily: R, fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '15px 36px',
                  background: 'linear-gradient(135deg, #0077ff, #00d4ff)',
                  border: 'none', borderRadius: '3px', color: '#fff',
                  cursor: 'pointer', transition: 'opacity 0.25s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >View All Models</button>
              <button
                onClick={() => onNavigate?.('home')}
                style={{
                  fontFamily: R, fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '15px 36px',
                  background: 'transparent',
                  border: '0.5px solid rgba(255,255,255,0.15)',
                  borderRadius: '3px', color: 'rgba(255,255,255,0.45)',
                  cursor: 'pointer',
                }}
              >Back to Showroom</button>
            </div>
          </Reveal>
        </section>

        {/* ── Footer bar ── */}
        <div style={{
          padding: '20px 48px',
          borderTop: '0.5px solid rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ fontFamily: O, fontSize: '13px', fontWeight: 700, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.2)' }}>
            VY<span style={{ color: '#00d4ff33' }}>B</span>ER
          </div>
          <div style={{ fontFamily: R, fontSize: '11px', color: 'rgba(255,255,255,0.15)', letterSpacing: '0.1em' }}>
            © 2024 VYBER. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <span key={l} style={{ fontFamily: R, fontSize: '11px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {l}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}