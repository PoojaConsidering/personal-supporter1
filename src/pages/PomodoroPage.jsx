import Navbar from '../components/layout/Navbar'
import PomodoroTimer from '../components/pomodoro/PomodoroTimer'

export default function PomodoroPage() {
  return (
    <div>
      <Navbar
        title="Focus Timer"
        subtitle="Work in focused intervals, rest intentionally."
      />
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <PomodoroTimer />
      </div>
    </div>
  )
}