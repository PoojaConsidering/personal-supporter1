import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import { useTimerStore } from '../store/timerStore'
import { useFlashcardStore } from '../store/flashcardStore'
import { useMusicStore } from '../store/musicStore'
import { formatTime } from '../utils/formatTime'

const Card = ({ to, icon, title, desc, stat, statLabel }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <div style={{
      padding: '1.75rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      height: '100%',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--accent-gold)'
        e.currentTarget.style.boxShadow = 'var(--shadow-warm)'
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
        {title}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1rem' }}>
        {desc}
      </div>
      {stat !== undefined && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>
            {stat} {statLabel}
          </span>
        </div>
      )}
    </div>
  </Link>
)

export default function HomePage() {
  const { sessions, timeLeft, mode } = useTimerStore()
  const { cards } = useFlashcardStore()
  const { tracks } = useMusicStore()

  const greeting = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div>
      <Navbar
        title={`${greeting()}.`}
        subtitle="Ready to focus? Your study space is waiting."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '1rem',
        marginBottom: '2.5rem',
      }}>
        <Card
          to="/pomodoro"
          icon="◷"
          title="Focus Timer"
          desc="Pomodoro sessions to keep you on track"
          stat={sessions}
          statLabel={`session${sessions !== 1 ? 's' : ''} today`}
        />
        <Card
          to="/music"
          icon="♪"
          title="Music"
          desc="Your personal study playlist"
          stat={tracks.length}
          statLabel={`track${tracks.length !== 1 ? 's' : ''} in library`}
        />
        <Card
          to="/flashcards"
          icon="◈"
          title="Flashcards"
          desc="Study and review your cards"
          stat={cards.length}
          statLabel={`card${cards.length !== 1 ? 's' : ''} created`}
        />
      </div>

      {/* Current timer status */}
      {sessions > 0 && (
        <div style={{
          padding: '1rem 1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--accent-gold)',
          letterSpacing: '0.1em',
        }}>
          ◷ TIMER — {mode.toUpperCase()} · {formatTime(timeLeft)} remaining · {sessions} sessions complete
        </div>
      )}
    </div>
  )
}