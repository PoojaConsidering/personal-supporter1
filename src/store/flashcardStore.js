import { create } from 'zustand'

export const useFlashcardStore = create((set) => ({
  cards: [],
  filterDifficulty: 'all',

  setCards: (cards) => set({ cards }),

  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),

  updateCard: (id, updates) => set((state) => ({
    cards: state.cards.map(c => c.id === id ? { ...c, ...updates } : c),
  })),

  removeCard: (id) => set((state) => ({
    cards: state.cards.filter(c => c.id !== id),
  })),

  setFilter: (difficulty) => set({ filterDifficulty: difficulty }),

  getFilteredCards: (state) => {
    if (state.filterDifficulty === 'all') return state.cards
    return state.cards.filter(c => c.difficulty === state.filterDifficulty)
  },
}))