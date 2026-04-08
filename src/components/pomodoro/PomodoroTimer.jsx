import { usePomodoro } from '../../hooks/usePomodoro'
import { formatTime } from '../../utils/formatTime'
import TimerControls from './TimerControls'
import TimerSettings from './TimerSettings'
import SessionTracker from './SessionTracker'

const RADIUS = 110
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function PomodoroTimer() {
  const { mode, timeLeft, isRunning, sessions, progress } = usePomodoro()

  const strokeDashoffset = CIRCUMFERENCE * (1 - progress)
  const isFocus = mode === 'focus'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem' }}>

      {/* Mode Badge */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.2em',
        color: isFocus ? 'var(--accent-gold)' : 'var(--accent-sage)',
        padding: '0.3rem 1rem',
        border: `1px solid ${isFocus ? 'var(--accent-gold)' : 'var(--accent-sage)'}`,
        borderRadius: '2px',
        opacity: 0.9,
      }}>
        {isFocus ? '— FOCUS TIME —' : '— TAKE A BREAK —'}
      </div>

      {/* Ring Timer */}
      <div style={{ position: 'relative', width: '280px', height: '280px' }}>
        <svg width="280" height="280" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background ring */}
          <circle
            cx="140" cy="140" r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
          />
          {/* Progress ring */}
          <circle
            cx="140" cy="140" r={RADIUS}
            fill="none"
            stroke={isFocus ? 'var(--accent-gold)' : 'var(--accent-sage)'}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>

        {/* Time display */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '3.5rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.05em',
            lineHeight: 1,
          }}>
            {formatTime(timeLeft)}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: '0.4rem',
            fontStyle: 'italic',
          }}>
            {isRunning ? 'in progress' : 'paused'}
          </div>
        </div>
      </div>

      <TimerControls />
      <SessionTracker sessions={sessions} />
      <TimerSettings />
    </div>
  )
}