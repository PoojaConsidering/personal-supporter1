export default function SessionTracker({ sessions }) {
  const dots = Array.from({ length: Math.max(4, sessions + 1) }, (_, i) => i < sessions)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {dots.map((filled, i) => (
          <div key={i} style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: filled ? 'var(--accent-gold)' : 'var(--border)',
            transition: 'background 0.3s ease',
          }} />
        ))}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.1em',
      }}>
        {sessions} SESSION{sessions !== 1 ? 'S' : ''} COMPLETED
      </div>
    </div>
  )
}