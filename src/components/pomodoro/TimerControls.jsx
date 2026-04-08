import { usePomodoro } from '../../hooks/usePomodoro'

const btn = (color, border) => ({
  background: 'transparent',
  border: `1px solid ${border || color}`,
  color: color,
  padding: '0.6rem 1.6rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.75rem',
  letterSpacing: '0.15em',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderRadius: '2px',
})

export default function TimerControls() {
  const { isRunning, start, pause, reset, skipToBreak, mode } = usePomodoro()

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      {isRunning ? (
        <button style={btn('var(--accent-amber)', 'var(--accent-amber)')} onClick={pause}>
          ⏸ PAUSE
        </button>
      ) : (
        <button style={btn('var(--accent-gold)', 'var(--accent-gold)')} onClick={start}>
          ▶ START
        </button>
      )}

      <button style={btn('var(--text-muted)', 'var(--border)')} onClick={reset}>
        ↺ RESET
      </button>

      {mode === 'focus' && (
        <button style={btn('var(--accent-sage)', 'var(--accent-sage)')} onClick={skipToBreak}>
          ⇥ SKIP
        </button>
      )}
    </div>
  )
}