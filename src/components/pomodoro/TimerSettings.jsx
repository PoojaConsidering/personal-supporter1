import { useState } from 'react'
import { usePomodoro } from '../../hooks/usePomodoro'

export default function TimerSettings() {
  const { focusDuration, breakDuration, setFocusDuration, setBreakDuration } = usePomodoro()
  const [open, setOpen] = useState(false)

  const inputStyle = {
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    padding: '0.4rem 0.75rem',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.9rem',
    width: '70px',
    borderRadius: '2px',
    textAlign: 'center',
  }

  return (
    <div style={{ width: '100%', maxWidth: '320px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.12em',
          cursor: 'pointer',
          display: 'block',
          margin: '0 auto',
          opacity: 0.7,
        }}
      >
        {open ? '▲ HIDE SETTINGS' : '▼ SETTINGS'}
      </button>

      {open && (
        <div style={{
          marginTop: '1rem',
          padding: '1.25rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
              FOCUS (MIN)
            </label>
            <input
              type="number"
              style={inputStyle}
              min={1} max={90}
              defaultValue={focusDuration / 60}
              onChange={e => setFocusDuration(Number(e.target.value))}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-secondary)' }}>
              BREAK (MIN)
            </label>
            <input
              type="number"
              style={inputStyle}
              min={1} max={30}
              defaultValue={breakDuration / 60}
              onChange={e => setBreakDuration(Number(e.target.value))}
            />
          </div>
        </div>
      )}
    </div>
  )
}