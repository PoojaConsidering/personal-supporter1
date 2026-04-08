import { useState } from 'react'
import { useFlashcards } from '../../hooks/useFlashcards'
import { DIFFICULTY_KEYS, DIFFICULTIES } from '../../utils/difficultyLevels'

const inputStyle = {
  width: '100%',
  background: 'var(--bg-primary)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  padding: '0.6rem 0.9rem',
  fontFamily: 'var(--font-body)',
  fontSize: '1rem',
  borderRadius: 'var(--radius)',
  outline: 'none',
  resize: 'vertical',
}

export default function FlashcardForm({ onCreated }) {
  const { createCard } = useFlashcards()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) return
    await createCard({ question: question.trim(), answer: answer.trim(), difficulty })
    setQuestion('')
    setAnswer('')
    setDifficulty('easy')
    setOpen(false)
    onCreated?.()
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: 'var(--accent-gold)',
          border: 'none',
          color: 'var(--text-dark)',
          padding: '0.6rem 1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          cursor: 'pointer',
          borderRadius: 'var(--radius)',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-amber)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-gold)'}
      >
        {open ? '✕ CANCEL' : '+ NEW CARD'}
      </button>

      {open && (
        <div style={{
          marginTop: '1rem',
          padding: '1.5rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              QUESTION
            </label>
            <textarea
              rows={2}
              style={inputStyle}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="What do you want to remember?"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              ANSWER
            </label>
            <textarea
              rows={2}
              style={inputStyle}
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="The answer..."
            />
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
              DIFFICULTY
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {DIFFICULTY_KEYS.map(key => {
                const d = DIFFICULTIES[key]
                const isSelected = difficulty === key
                return (
                  <button
                    key={key}
                    onClick={() => setDifficulty(key)}
                    style={{
                      background: isSelected ? d.bg : 'transparent',
                      border: `1px solid ${isSelected ? d.border : 'var(--border)'}`,
                      color: isSelected ? d.color : 'var(--text-muted)',
                      padding: '0.3rem 0.9rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                    }}
                  >
                    {d.label.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              background: 'transparent',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              padding: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              cursor: 'pointer',
              borderRadius: 'var(--radius)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-gold)'; e.currentTarget.style.color = 'var(--text-dark)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-gold)' }}
          >
            SAVE CARD
          </button>
        </div>
      )}
    </div>
  )
}