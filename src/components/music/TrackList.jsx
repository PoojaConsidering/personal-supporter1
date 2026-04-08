import { useMusicStore } from '../../store/musicStore'
import TrackItem from './TrackItem'

export default function TrackList() {
  const { tracks } = useMusicStore()

  if (!tracks.length) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
        fontSize: '0.95rem',
      }}>
        Your library is empty — upload some music above
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      {tracks.map((track, index) => (
        <TrackItem key={track.id} track={track} index={index} />
      ))}
    </div>
  )
}