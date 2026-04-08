import { openDB } from 'idb'

const DB_NAME = 'focusflow-db'
const DB_VERSION = 1

let dbPromise = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Music tracks store
        if (!db.objectStoreNames.contains('tracks')) {
          const trackStore = db.createObjectStore('tracks', { keyPath: 'id' })
          trackStore.createIndex('title', 'title')
        }

        // Flashcards store
        if (!db.objectStoreNames.contains('flashcards')) {
          const cardStore = db.createObjectStore('flashcards', { keyPath: 'id' })
          cardStore.createIndex('difficulty', 'difficulty')
        }
      },
    })
  }
  return dbPromise
}

// --- Tracks ---
export async function getAllTracks() {
  const db = await getDB()
  return db.getAll('tracks')
}

export async function addTrack(track) {
  const db = await getDB()
  return db.put('tracks', track)
}

export async function deleteTrack(id) {
  const db = await getDB()
  return db.delete('tracks', id)
}

// --- Flashcards ---
export async function getAllFlashcards() {
  const db = await getDB()
  return db.getAll('flashcards')
}

export async function addFlashcard(card) {
  const db = await getDB()
  return db.put('flashcards', card)
}

export async function deleteFlashcard(id) {
  const db = await getDB()
  return db.delete('flashcards', id)
}