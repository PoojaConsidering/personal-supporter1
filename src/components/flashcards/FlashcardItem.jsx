import { useState } from 'react'
import CategoryBadge from './CategoryBadge'
import { useFlashcards } from '../../hooks/useFlashcards'

export default function FlashcardItem({ card }) {
  const [flipped, setFlipped] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { deleteCard } = useFlashcards()

  return (
    <div style={{ perspective: '1000px' }}>
      <div
        onClick={() => setFlipped(f => !f)}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '160px',
          cursor: 'pointer',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CategoryBadge difficulty={card.difficulty} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              QUESTION
            </span>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '1rem', flex: 1, fontStyle: 'italic' }}>
            {card.question}
          </p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            tap to reveal ↩
          </p>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'var(--bg-hover)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <CategoryBadge difficulty={card.difficulty} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-gold)', letterSpacing: '0.1em' }}>
              ANSWER
            </span>
          </div>
          <p style={{ color: 'var(--accent-cream)', fontSize: '1rem', flex: 1 }}>
            {card.answer}
          </p>
        </div>
      </div>

      {/* Delete button outside the flip */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
        {confirmDelete ? (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => deleteCard(card.id)}
              style={{ background: 'transparent', border: '1px solid var(--accent-rust)', color: 'var(--accent-rust)', padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', borderRadius: '2px' }}
            >
              CONFIRM
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', cursor: 'pointer', borderRadius: '2px' }}
            >
              CANCEL
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', opacity: 0.5, fontFamily: 'var(--font-mono)' }}
          >
            delete
          </button>
        )}
      </div>
    </div>
  )
}