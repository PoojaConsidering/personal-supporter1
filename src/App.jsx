import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import PomodoroPage from './pages/PomodoroPage'
import MusicPage from './pages/MusicPage'
import FlashcardsPage from './pages/FlashcardsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="pomodoro" element={<PomodoroPage />} />
          <Route path="music" element={<MusicPage />} />
          <Route path="flashcards" element={<FlashcardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}