"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { MusicPost, PlayerState } from "./types"

interface PlayerContextType extends PlayerState {
  playTrack: (track: MusicPost) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  setProgress: (progress: number) => void
  nextTrack: () => void
  previousTrack: () => void
  queue: MusicPost[]
  recentlyPlayed: MusicPost[]
  addToQueue: (track: MusicPost) => void
}

const PlayerContext = createContext<PlayerContextType | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<MusicPost | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [progress, setProgressState] = useState(0)
  const [duration] = useState(0)
  const [queue, setQueue] = useState<MusicPost[]>([])
  const [recentlyPlayed, setRecentlyPlayed] = useState<MusicPost[]>([])

  const playTrack = useCallback((track: MusicPost) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgressState(0)

    setRecentlyPlayed((prev) => {
      // Remove if already exists to move it to the top
      const filtered = prev.filter((t) => t.id !== track.id)
      return [track, ...filtered].slice(0, 12) // Keep top 12
    })
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const setVolume = useCallback((vol: number) => {
    setVolumeState(Math.max(0, Math.min(1, vol)))
  }, [])

  const setProgress = useCallback((prog: number) => {
    setProgressState(prog)
  }, [])

  const addToQueue = useCallback((track: MusicPost) => {
    setQueue((prev) => [...prev, track])
  }, [])

  const nextTrack = useCallback(() => {
    if (queue.length > 0) {
      const [next, ...rest] = queue
      playTrack(next)
      setQueue(rest)
    }
  }, [queue, playTrack])

  const previousTrack = useCallback(() => {
    setProgressState(0)
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        progress,
        duration,
        queue,
        recentlyPlayed,
        playTrack,
        togglePlay,
        setVolume,
        setProgress,
        nextTrack,
        previousTrack,
        addToQueue,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
