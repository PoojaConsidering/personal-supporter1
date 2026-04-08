import Navbar from '../components/layout/Navbar'
import FlashcardForm from '../components/flashcards/FlashcardForm'
import FlashcardDeck from '../components/flashcards/FlashcardDeck'
import DifficultyFilter from '../components/flashcards/DifficultyFilter'
import { useFlashcards } from '../hooks/useFlashcards'

export default function FlashcardsPage() {
  const { filterDifficulty, setFilter, filteredCards, cards } = useFlashcards()

  return (
    <div>
      <Navbar
        title="Flashcards"
        subtitle="Create, review, and master your study material."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <FlashcardForm />
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
          }}>
            {filteredCards.length} / {cards.length} CARDS
          </div>
        </div>

        {/* Filter */}
        <DifficultyFilter current={filterDifficulty} onChange={setFilter} />

        {/* Cards */}
        <FlashcardDeck />
      </div>
    </div>
  )
}