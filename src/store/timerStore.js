import { create } from 'zustand'

export const useTimerStore = create((set, get) => ({
  mode: 'focus',           // 'focus' | 'break'
  focusDuration: 25 * 60, // seconds
  breakDuration: 5 * 60,
  timeLeft: 25 * 60,
  isRunning: false,
  sessions: 0,
  intervalId: null,

  setFocusDuration: (mins) => {
    const secs = mins * 60
    set({ focusDuration: secs, timeLeft: secs, isRunning: false })
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
  },

  setBreakDuration: (mins) => {
    set({ breakDuration: mins * 60 })
  },

  start: () => {
    const { isRunning } = get()
    if (isRunning) return
    const id = setInterval(() => {
      const { timeLeft, mode, breakDuration, focusDuration, sessions } = get()
      if (timeLeft <= 0) {
        clearInterval(id)
        if (mode === 'focus') {
          set({ mode: 'break', timeLeft: breakDuration, isRunning: false, intervalId: null, sessions: sessions + 1 })
        } else {
          set({ mode: 'focus', timeLeft: focusDuration, isRunning: false, intervalId: null })
        }
        return
      }
      set({ timeLeft: timeLeft - 1 })
    }, 1000)
    set({ isRunning: true, intervalId: id })
  },

  pause: () => {
    const { intervalId } = get()
    if (intervalId) clearInterval(intervalId)
    set({ isRunning: false, intervalId: null })
  },

  reset: () => {
    const { intervalId, focusDuration } = get()
    if (intervalId) clearInterval(intervalId)
    set({ isRunning: false, intervalId: null, timeLeft: focusDuration, mode: 'focus' })
  },

  skipToBreak: () => {
    const { intervalId, breakDuration, sessions } = get()
    if (intervalId) clearInterval(intervalId)
    set({ mode: 'break', timeLeft: breakDuration, isRunning: false, intervalId: null, sessions: sessions + 1 })
  },
}))