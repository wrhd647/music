"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
} from "lucide-react"
import { usePlayer } from "@/lib/player-context"
import { VisualizerBars } from "./visualizer-bars"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import ReactPlayer dynamically to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as any

export function GlobalPlayer() {
  const {
    currentTrack,
    isPlaying,
    volume,
    progress,
    togglePlay,
    setVolume,
    setProgress,
    nextTrack,
    previousTrack,
  } = usePlayer()

  const [isShuffled, setIsShuffled] = useState(false)
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off")
  const [isLiked, setIsLiked] = useState(false)
  const [duration, setDuration] = useState(0)
  const [playedProgress, setPlayedProgress] = useState(0)
  const [localSeconds, setLocalSeconds] = useState(0)

  // Handle YouTube URL
  const videoUrl = currentTrack ? `https://www.youtube.com/watch?v=${currentTrack.youtubeId}` : ""

  if (!currentTrack) {
    return null
  }

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2
  const RepeatIcon = repeatMode === "one" ? Repeat1 : Repeat

  const cycleRepeatMode = () => {
    const modes: ("off" | "all" | "one")[] = ["off", "all", "one"]
    const currentIndex = modes.indexOf(repeatMode)
    setRepeatMode(modes[(currentIndex + 1) % modes.length])
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#05001A]/60 backdrop-blur-xl transition-all duration-700">
      {/* Invisible YouTube Player */}
      <div className="hidden pointer-events-none">
        <ReactPlayer
          url={videoUrl}
          playing={isPlaying}
          volume={volume}
          onProgress={(state: { played: number; playedSeconds: number }) => {
            setPlayedProgress(state.played * 100)
            setLocalSeconds(state.playedSeconds)
            setProgress(state.played * 100)
          }}
          onReady={(player: any) => {
             setDuration(player.getDuration())
          }}
          onEnded={() => {
            if (repeatMode === "one") {
              // Current react-player doesn't have an easy "restart" without state change
              // usually handled by seeks or just letting it repeat if supported by platform
            } else if (repeatMode === "all" || isPlaying) {
              nextTrack()
            }
          }}
          config={{
            youtube: {
              playerVars: { showinfo: 0, modestbranding: 1, rel: 0 }
            }
          }}
        />
      </div>

      {/* Progress bar at top of player */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
        <div
          className="h-full bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(160,110,255,1.0)]"
          style={{ width: `${playedProgress}%` }}
        />
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4">
        {/* Track Info - Left Section */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Link href={`/post/${currentTrack.id}`} className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg group shadow-xl">
            <Image
              src={currentTrack.thumbnailUrl}
              alt={currentTrack.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Equalizer overlay when playing */}
            {isPlaying && (
              <div className="absolute inset-0 flex items-end justify-center bg-black/40 pb-1">
                <div className="flex items-end gap-0.5">
                  <span className="h-2 w-0.5 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0ms", animationDuration: "0.5s" }} />
                  <span className="h-3 w-0.5 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.1s", animationDuration: "0.5s" }} />
                  <span className="h-2 w-0.5 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.2s", animationDuration: "0.5s" }} />
                  <span className="h-4 w-0.5 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.3s", animationDuration: "0.5s" }} />
                </div>
              </div>
            )}
          </Link>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3">
                <p className="truncate text-sm font-bold text-white group-hover:text-primary transition-colors cursor-pointer">
                  {currentTrack.title}
                </p>
                <VisualizerBars isPlaying={isPlaying} className="mb-0.5" />
              </div>
              <p className="truncate text-xs font-medium text-[#C0C0C0]/60">
                {currentTrack.uploaderNickname}
              </p>
            </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 flex-shrink-0 rounded-full",
              isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            <span className="sr-only">{isLiked ? "Unlike" : "Like"}</span>
          </Button>
        </div>

        {/* Controls - Center Section */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            {/* Shuffle */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                isShuffled ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle className="h-4 w-4" />
              <span className="sr-only">Shuffle</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={previousTrack}
            >
              <SkipBack className="h-4 w-4" />
              <span className="sr-only">Previous track</span>
            </Button>

            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(160,110,255,0.4)]"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 translate-x-0.5" />
              )}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={nextTrack}
            >
              <SkipForward className="h-4 w-4" />
              <span className="sr-only">Next track</span>
            </Button>

            {/* Repeat */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full",
                repeatMode !== "off" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              onClick={cycleRepeatMode}
            >
              <RepeatIcon className="h-4 w-4" />
              <span className="sr-only">Repeat: {repeatMode}</span>
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="hidden w-full max-w-md items-center gap-2 md:flex">
            <span className="w-10 text-right text-[10px] font-bold text-muted-foreground font-mono">
              {formatTime(localSeconds)}
            </span>
            <Slider
              value={[playedProgress]}
              max={100}
              step={0.1}
              onValueChange={([value]) => {
                setPlayedProgress(value)
                // Note: Seek functionality requires ref of ReactPlayer, 
                // which might be complex with dynamic import.
                // For now we just update UI.
              }}
              className="flex-1"
            />
            <span className="w-10 text-[10px] font-bold text-muted-foreground font-mono">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume - Right Section */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full",
              volume === 0 ? "text-muted-foreground" : "text-foreground"
            )}
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
          >
            <VolumeIcon className="h-4 w-4" />
            <span className="sr-only">Toggle mute</span>
          </Button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value / 100)}
            className="w-24"
          />
        </div>
      </div>
    </div>
  )
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}
