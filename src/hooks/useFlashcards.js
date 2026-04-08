import { useEffect } from 'react'
import { useFlashcardStore } from '../store/flashcardStore'
import { getAllFlashcards, addFlashcard, deleteFlashcard } from '../utils/db'

export function useFlashcards() {
  const { cards, filterDifficulty, setCards, addCard, removeCard, updateCard, setFilter } = useFlashcardStore()

  useEffect(() => {
    getAllFlashcards().then(setCards)
  }, [])

  const createCard = async (cardData) => {
    const card = {
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      ...cardData,
    }
    await addFlashcard(card)
    addCard(card)
    return card
  }

  const editCard = async (id, updates) => {
    updateCard(id, updates)
    const updated = cards.find(c => c.id === id)
    if (updated) await addFlashcard({ ...updated, ...updates })
  }

  const deleteCard = async (id) => {
    await deleteFlashcard(id)
    removeCard(id)
  }

  const filteredCards = filterDifficulty === 'all'
    ? cards
    : cards.filter(c => c.difficulty === filterDifficulty)

  return {
    cards,
    filteredCards,
    filterDifficulty,
    setFilter,
    createCard,
    editCard,
    deleteCard,
  }
}