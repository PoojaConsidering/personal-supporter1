import { useMusicStore } from '../../store/musicStore'
import AlbumCoverUpload from './AlbumCoverUpload'
import { deleteTrack } from '../../utils/db'

export default function TrackItem({ track, index }) {
  const { currentTrackIndex, isPlaying, setCurrentTrack, setIsPlaying, removeTrack } = useMusicStore()
  const isActive = currentTrackIndex === index

  const handlePlay = () => {
    if (isActive) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrack(index)
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    await deleteTrack(track.id)
    removeTrack(track.id)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '0.75rem 1rem',
      background: isActive ? 'var(--bg-hover)' : 'transparent',
      borderLeft: isActive ? '2px solid var(--accent-gold)' : '2px solid transparent',
      borderRadius: 'var(--radius)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    }}
      onClick={handlePlay}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      <AlbumCoverUpload track={track} />

      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: isActive ? 'var(--accent-gold)' : 'var(--text-primary)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {track.title}
        </div>
      </div>

      {/* Play indicator */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        color: isActive ? 'var(--accent-gold)' : 'var(--text-muted)',
        minWidth: '20px',
        textAlign: 'center',
      }}>
        {isActive && isPlaying ? '▶' : isActive ? '⏸' : `${index + 1}`}
      </div>

      <button
        onClick={handleDelete}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          padding: '0.2rem 0.4rem',
          opacity: 0.5,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
        title="Remove track"
      >
        ✕
      </button>
    </div>
  )
}