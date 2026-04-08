import { create } from 'zustand'

export const useMusicStore = create((set, get) => ({
  tracks: [],
  currentTrackIndex: null,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,

  setTracks: (tracks) => set({ tracks }),

  addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),

  removeTrack: (id) => set((state) => {
    const tracks = state.tracks.filter(t => t.id !== id)
    return { tracks, currentTrackIndex: null, isPlaying: false }
  }),

  setCurrentTrack: (index) => set({ currentTrackIndex: index, isPlaying: true }),

  setIsPlaying: (val) => set({ isPlaying: val }),

  setVolume: (val) => set({ volume: val }),

  setCurrentTime: (val) => set({ currentTime: val }),

  setDuration: (val) => set({ duration: val }),

  nextTrack: () => {
    const { tracks, currentTrackIndex } = get()
    if (!tracks.length) return
    const next = (currentTrackIndex + 1) % tracks.length
    set({ currentTrackIndex: next, isPlaying: true })
  },

  prevTrack: () => {
    const { tracks, currentTrackIndex } = get()
    if (!tracks.length) return
    const prev = (currentTrackIndex - 1 + tracks.length) % tracks.length
    set({ currentTrackIndex: prev, isPlaying: true })
  },
}))