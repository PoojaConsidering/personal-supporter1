import { useEffect } from 'react'
import Navbar from '../components/layout/Navbar'
import MusicPlayer from '../components/music/MusicPlayer'
import MusicUploader from '../components/music/MusicUploader'
import TrackList from '../components/music/TrackList'
import { useMusicStore } from '../store/musicStore'
import { getAllTracks } from '../utils/db'

export default function MusicPage() {
  const { setTracks } = useMusicStore()

  useEffect(() => {
    getAllTracks().then(setTracks)
  }, [])

  return (
    <div>
      <Navbar
        title="Music"
        subtitle="Upload your own tracks and study in your own soundtrack."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
        {/* Left: Library */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <MusicUploader />

          <div style={{
            padding: '1.25rem',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              color: 'var(--text-muted)',
              marginBottom: '0.75rem',
            }}>
              YOUR LIBRARY
            </div>
            <TrackList />
          </div>
        </div>

        {/* Right: Player */}
        <div style={{ position: 'sticky', top: '1rem' }}>
          <MusicPlayer />
        </div>
      </div>
    </div>
  )
}