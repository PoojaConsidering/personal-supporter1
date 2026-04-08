export default function Navbar({ title, subtitle }) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '2.5rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          color: 'var(--text-primary)',
          fontWeight: 700,
          lineHeight: 1.2,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginTop: '0.25rem',
            fontStyle: 'italic',
          }}>
            {subtitle}
          </p>
        )}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.08em',
        textAlign: 'right',
        marginTop: '0.5rem',
      }}>
        {dateStr.toUpperCase()}
      </div>
    </div>
  )
}