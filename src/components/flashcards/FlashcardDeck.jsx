import { useFlashcards } from '../../hooks/useFlashcards'
import FlashcardItem from './FlashcardItem'

export default function FlashcardDeck() {
  const { filteredCards } = useFlashcards()

  if (!filteredCards.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
      }}>
        No cards here yet — create one above
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1rem',
    }}>
      {filteredCards.map(card => (
        <FlashcardItem key={card.id} card={card} />
      ))}
    </div>
  )
}