import { DIFFICULTIES } from '../../utils/difficultyLevels'

export default function CategoryBadge({ difficulty }) {
  const d = DIFFICULTIES[difficulty] || DIFFICULTIES.easy

  return (
    <span style={{
      display: 'inline-block',
      padding: '0.15rem 0.6rem',
      background: d.bg,
      border: `1px solid ${d.border}`,
      color: d.color,
      borderRadius: '2px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.65rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    }}>
      {d.label}
    </span>
  )
}