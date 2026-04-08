import { DIFFICULTIES, DIFFICULTY_KEYS } from '../../utils/difficultyLevels'

export default function DifficultyFilter({ current, onChange }) {
  const all = [{ key: 'all', label: 'All', color: 'var(--text-secondary)', bg: 'transparent', border: 'var(--border)' },
    ...DIFFICULTY_KEYS.map(k => ({ key: k, ...DIFFICULTIES[k] }))]

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {all.map(({ key, label, color, bg, border }) => {
        const isActive = current === key
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            style={{
              background: isActive ? bg : 'transparent',
              border: `1px solid ${isActive ? border : 'var(--border)'}`,
              color: isActive ? color : 'var(--text-muted)',
              padding: '0.3rem 0.9rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s ease',
            }}
          >
            {label.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}