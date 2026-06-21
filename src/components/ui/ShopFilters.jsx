const CATEGORIES = ['ALL', 'HYPERCAR', 'SUPERCAR', 'ELECTRIC', 'GRAND TOURER']

export default function ShopFilters({ active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: '10px', flexWrap: 'wrap',
      marginBottom: '40px',
    }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            background: active === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: `1px solid ${active === cat ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)'}`,
            color: active === cat ? '#fff' : 'rgba(255,255,255,0.4)',
            fontSize: '11px', fontWeight: 700,
            letterSpacing: '0.15em', padding: '8px 18px',
            borderRadius: '6px', cursor: 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'sans-serif',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}