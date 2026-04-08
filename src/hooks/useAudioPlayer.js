import { useEffect, useRef } from 'react'
import { useMusicStore } from '../store/musicStore'

export function useAudioPlayer() {
  const audioRef = useRef(new Audio())
  const {
    tracks, currentTrackIndex, isPlaying, volume,
    setIsPlaying, setCurrentTime, setDuration,
    nextTrack,
  } = useMusicStore()

  const currentTrack = currentTrackIndex !== null ? tracks[currentTrackIndex] : null

  // Load track when it changes
  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack) return
    audio.src = currentTrack.url
    audio.load()
    if (isPlaying) audio.play().catch(() => {})
  }, [currentTrackIndex, currentTrack?.id])

  // Play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!currentTrack) return
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Volume
  useEffect(() => {
    audioRef.current.volume = volume
  }, [volume])

  // Event listeners
  useEffect(() => {
    const audio = audioRef.current

    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onDuration = () => setDuration(audio.duration)
    const onEnded = () => nextTrack()

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const seek = (time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  return { audioRef, seek, currentTrack }
}