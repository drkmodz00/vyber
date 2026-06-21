import { useState, useCallback } from 'react'
import IntroOverlay from '../components/ui/IntroOverlay'
import Navbar       from '../components/ui/Navbar'
import Scene        from '../components/ui/Scene'
import CarInfo      from '../components/ui/CarInfo'
import NavArrows    from '../components/ui/NavArrows'
import ProgressDots from '../components/ui/ProgressDots'
import CarStage     from '../components/ui/CarStage'
import useCars      from '../hooks/useCars'

export default function Showroom() {
  // fixed: initialize from sessionStorage so the intro doesn't replay
  // every time this component remounts (e.g. navigating Shop -> Home)
  const [introDone, setIntroDone] = useState(
    () => sessionStorage.getItem('vyber_intro_seen') === 'true'
  )
  const [currentIdx, setCurrentIdx] = useState(0)

  const { data: cars, isLoading, isError } = useCars()

  const handleIntroDone = useCallback(() => {
    sessionStorage.setItem('vyber_intro_seen', 'true')
    setIntroDone(true)
  }, [])

  const handleNext = () => setCurrentIdx(i => (i + 1) % cars.length)
  const handlePrev = () => setCurrentIdx(i => (i - 1 + cars.length) % cars.length)

  if (isLoading) return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', color: '#fff',
      fontSize: '14px', letterSpacing: '0.2em', fontFamily: 'sans-serif',
    }}>
      LOADING...
    </div>
  )

  if (isError) return (
    <div style={{
      position: 'fixed', inset: 0, display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', color: '#ff4444',
      fontSize: '14px', letterSpacing: '0.2em', fontFamily: 'sans-serif',
    }}>
      Could not connect to API. Is Laravel running?
    </div>
  )

  return (
    <>
      {!introDone && <IntroOverlay onDone={handleIntroDone} />}
      <Scene>
        <Navbar />
        <CarStage car={cars[currentIdx]} />
        <CarInfo  car={cars[currentIdx]} />
        <NavArrows
          current={currentIdx}
          total={cars.length}
          onNext={handleNext}
          onPrev={handlePrev}
        />
        <ProgressDots
          total={cars.length}
          current={currentIdx}
          onSelect={setCurrentIdx}
        />
      </Scene>
    </>
  )
}