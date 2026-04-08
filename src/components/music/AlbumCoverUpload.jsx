import { useRef } from 'react'
import { useMusicStore } from '../../store/musicStore'
import { addTrack, getAllTracks } from '../../utils/db'

export default function AlbumCoverUpload({ track }) {
  const fileRef = useRef()
  const { tracks, setTracks } = useMusicStore()

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) return
    const coverUrl = URL.createObjectURL(file)

    // Update in DB
    const updated = { ...track, coverUrl }
    await addTrack(updated)

    // Update store
    const updatedTracks = tracks.map(t => t.id === track.id ? updated : t)
    setTracks(updatedTracks)
  }

  return (
    <div
      onClick={() => fileRef.current.click()}
      title="Click to set album cover"
      style={{
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        cursor: 'pointer',
        background: 'var(--bg-hover)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--border)',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {track.coverUrl ? (
        <img
          src={track.coverUrl}
          alt="cover"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>♫</span>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])}
      />
    </div>
  )
}