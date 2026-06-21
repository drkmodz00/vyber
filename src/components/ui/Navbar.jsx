import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' }, // fixed: was 'about' (relative path bug)
  ]

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 48px',
      height: '72px',
      borderBottom: '0.5px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(to bottom, rgba(2,5,8,0.88), transparent)',
    }}>

      <div
        onClick={() => navigate('/')}
        style={{
          fontFamily: "'Michroma', sans-serif",
          fontSize: '20px', letterSpacing: '0.3em', color: '#fff',
          display: 'flex', alignItems: 'center', cursor: 'pointer',
        }}
      >
        VY
        <span style={{ color: '#00d4ff', position: 'relative' }}>
          B
          <span style={{
            position: 'absolute', bottom: '-2px', left: 0, right: 0,
            height: '1px', background: '#00d4ff', opacity: 0.5,
          }} />
        </span>
        ER
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {links.map(link => {
          const isActive = location.pathname === link.path
          return (
            <a
              key={link.label}
              href={link.path}
              onClick={e => {
                e.preventDefault()
                if (link.path !== '#') navigate(link.path)
              }}
              style={{
                fontFamily: "'Michroma', sans-serif",
                fontSize: '12px', letterSpacing: '0.18em',
                color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase', textDecoration: 'none',
                position: 'relative', paddingBottom: '2px', cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.querySelector('span').style.width = '100%'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = isActive
                  ? 'rgba(255,255,255,0.9)'
                  : 'rgba(255,255,255,0.4)'
                if (!isActive) e.currentTarget.querySelector('span').style.width = '0'
              }}
            >
              {link.label}
              <span style={{
                position: 'absolute', bottom: '-1px', left: 0,
                height: '1px', background: '#00d4ff',
                width: isActive ? '100%' : '0',
                transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </a>
          )
        })}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '7px 20px',
            border: '0.5px solid rgba(255,255,255,0.18)',
            background: 'transparent', color: 'rgba(255,255,255,0.7)',
            borderRadius: '2px', cursor: 'pointer',
            transition: 'border-color 0.25s, color 0.25s, background 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
            e.currentTarget.style.background = 'transparent'
          }}
        >Log In</button>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)' }} />

        <button
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: '12px', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            padding: '7px 20px',
            background: '#00d4ff', color: '#000',
            border: 'none', borderRadius: '2px', cursor: 'pointer',
            transition: 'opacity 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >Sign Up</button>
      </div>

    </div>
  )
}