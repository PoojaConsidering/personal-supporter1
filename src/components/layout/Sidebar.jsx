import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/',           label: 'Home',       icon: '⌂' },
  { to: '/pomodoro',   label: 'Focus',      icon: '◷' },
  { to: '/music',      label: 'Music',      icon: '♪' },
  { to: '/flashcards', label: 'Cards',      icon: '◈' },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem 0',
    }}>
      {/* Logo */}
      <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: 'var(--accent-gold)',
          letterSpacing: '0.02em',
          lineHeight: 1.2,
        }}>
          Focus<br />
          <span style={{ fontStyle: 'italic', color: 'var(--accent-cream)' }}>Flow</span>
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          marginTop: '0.25rem',
          letterSpacing: '0.1em',
        }}>
          STUDY COMPANION
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1.5rem 0' }}>
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
              background: isActive ? 'var(--bg-hover)' : 'transparent',
              borderLeft: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              letterSpacing: '0.05em',
              transition: 'all 0.2s ease',
            })}
          >
            <span style={{ fontSize: '1.1rem' }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '1rem 1.5rem',
        borderTop: '1px solid var(--border)',
        fontSize: '0.7rem',
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.08em',
      }}>
        EST. {new Date().getFullYear()}
      </div>
    </aside>
  )
}