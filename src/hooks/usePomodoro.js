import { useTimerStore } from '../store/timerStore'

export function usePomodoro() {
  const {
    mode, timeLeft, isRunning, sessions,
    focusDuration, breakDuration,
    start, pause, reset, skipToBreak,
    setFocusDuration, setBreakDuration,
  } = useTimerStore()

  const progress = mode === 'focus'
    ? 1 - timeLeft / focusDuration
    : 1 - timeLeft / breakDuration

  return {
    mode,
    timeLeft,
    isRunning,
    sessions,
    focusDuration,
    breakDuration,
    progress,
    start,
    pause,
    reset,
    skipToBreak,
    setFocusDuration,
    setBreakDuration,
  }
}