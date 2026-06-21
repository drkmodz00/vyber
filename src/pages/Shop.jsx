import { useState } from 'react'
import useCars     from '../hooks/useCars'
import Navbar      from '../components/ui/Navbar'
import ShopCard    from '../components/ui/ShopCard'
import ShopFilters from '../components/ui/ShopFilters'

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const { data: cars, isLoading, isError } = useCars()

  const filtered = cars?.filter(car =>
    activeFilter === 'ALL' ? true : car.category === activeFilter
  ) ?? []

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflowY: 'auto',
      background: 'radial-gradient(ellipse at 30% 20%, #0a1628 0%, #040810 60%, #020508 100%)',
      color: '#fff',
    }}>

      {/* Grid overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Glow top left */}
      <div style={{
        position: 'fixed',
        width: '600px', height: '400px',
        top: '-100px', left: '-100px',
        background: 'rgba(0,119,255,0.06)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Glow right */}
      <div style={{
        position: 'fixed',
        width: '400px', height: '400px',
        top: '20%', right: '-100px',
        background: 'rgba(0,212,255,0.04)',
        filter: 'blur(100px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* All content above background */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Navbar */}
        <div style={{ position: 'relative' }}>
          <Navbar />
        </div>

        {/* Main content */}
        <div style={{ padding: '112px 48px 48px' }}>

          {/* Title */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              color: 'rgba(255,255,255,0.3)',
              fontSize: '11px',
              letterSpacing: '0.2em',
              marginBottom: '8px',
              fontFamily: "'Michroma', sans-serif",
            }}>
              COLLECTION
            </div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              margin: 0,
              color: '#fff',
              fontFamily: "'Michroma', sans-serif",
            }}>
              ALL VEHICLES
            </h1>
          </div>

          {/* Filters */}
          <ShopFilters active={activeFilter} onChange={setActiveFilter} />

          {/* Loading */}
          {isLoading && (
            <div style={{
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em',
              fontSize: '12px',
              fontFamily: "'Michroma', sans-serif",
              marginTop: '48px',
            }}>
              LOADING...
            </div>
          )}

          {/* Error */}
          {isError && (
            <div style={{
              color: '#ff4444',
              letterSpacing: '0.2em',
              fontSize: '12px',
              fontFamily: "'Michroma', sans-serif",
              marginTop: '48px',
            }}>
              Could not connect to API.
            </div>
          )}

          {/* Grid */}
          {!isLoading && !isError && (
            <>
              <div style={{
                color: 'rgba(255,255,255,0.2)',
                fontSize: '11px',
                letterSpacing: '0.1em',
                marginBottom: '24px',
                fontFamily: "'Michroma', sans-serif",
              }}>
                {filtered.length} VEHICLE{filtered.length !== 1 ? 'S' : ''}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '24px',
              }}>
                {filtered.map(car => (
                  <ShopCard key={car.id} car={car} />
                ))}
              </div>
            </>
          )}

        </div>
      </div>

    </div>
  )
}