import { useRef } from 'react'
import { useMusicStore } from '../../store/musicStore'
import { addTrack } from '../../utils/db'

export default function MusicUploader() {
  const fileRef = useRef()
  const { addTrack: addToStore } = useMusicStore()

  const handleFiles = async (files) => {
    for (const file of files) {
      if (!file.type.startsWith('audio/')) continue

      const url = URL.createObjectURL(file)
      const track = {
        id: crypto.randomUUID(),
        title: file.name.replace(/\.[^/.]+$/, ''),
        url,
        coverUrl: null,
        addedAt: Date.now(),
      }

      await addTrack(track)
      addToStore(track)
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    handleFiles([...e.dataTransfer.files])
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileRef.current.click()}
      style={{
        border: '1px dashed var(--accent-gold)',
        borderRadius: 'var(--radius)',
        padding: '2rem',
        textAlign: 'center',
        cursor: 'pointer',
        background: 'rgba(201,151,58,0.04)',
        transition: 'background 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,151,58,0.08)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,151,58,0.04)'}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>♪</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.12em',
        color: 'var(--accent-gold)',
      }}>
        DROP MUSIC FILES HERE
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.3rem', fontStyle: 'italic' }}>
        or click to browse — MP3, WAV, OGG
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="audio/*"
        multiple
        style={{ display: 'none' }}
        onChange={e => handleFiles([...e.target.files])}
      />
    </div>
  )
}