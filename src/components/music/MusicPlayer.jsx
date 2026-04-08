import { useAudioPlayer } from '../../hooks/useAudioPlayer'
import { useMusicStore } from '../../store/musicStore'
import { formatDuration } from '../../utils/formatTime'

export default function MusicPlayer() {
  const { seek, currentTrack } = useAudioPlayer()
  const {
    isPlaying, volume, currentTime, duration,
    setIsPlaying, setVolume, nextTrack, prevTrack,
  } = useMusicStore()

  if (!currentTrack) {
    return (
      <div style={{
        padding: '2rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontStyle: 'italic',
      }}>
        Select a track to begin playing
      </div>
    )
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  const btnStyle = {
    background: 'transparent',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '1.1rem',
    padding: '0.4rem 0.6rem',
    transition: 'color 0.2s',
  }

  return (
    <div style={{
      padding: '1.5rem',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-warm)',
    }}>
      {/* Track info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: 'var(--radius)',
          background: 'var(--bg-hover)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid var(--border)',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {currentTrack.coverUrl
            ? <img src={currentTrack.coverUrl} alt="cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ fontSize: '1.5rem', opacity: 0.4 }}>♫</span>
          }
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {currentTrack.title}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Now Playing
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const pct = (e.clientX - rect.left) / rect.width
            seek(pct * duration)
          }}
          style={{
            height: '4px',
            background: 'var(--border)',
            borderRadius: '2px',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--accent-gold)',
            borderRadius: '2px',
            transition: 'width 0.5s linear',
          }} />
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '0.3rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
        }}>
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span>{formatDuration(Math.floor(duration || 0))}</span>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <button style={btnStyle} onClick={prevTrack} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          ⏮
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: 'var(--accent-gold)',
            border: 'none',
            color: 'var(--text-dark)',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-amber)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-gold)'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button style={btnStyle} onClick={nextTrack} onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-gold)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
          ⏭
        </button>
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>🔈</span>
        <input
          type="range"
          min={0} max={1} step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
        />
        <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>🔊</span>
      </div>
    </div>
  )
}