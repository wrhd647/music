"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, TrendingUp, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePlayer } from "@/lib/player-context"
import type { MusicPost } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ShareModal } from "./share-modal"

interface HeroFeaturedProps {
  track: MusicPost
}

export function HeroFeatured({ track }: HeroFeaturedProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayer()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const isCurrentlyPlaying = currentTrack?.id === track.id && isPlaying

  const handlePlay = () => {
    playTrack(track)
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#05001A]/40 backdrop-blur-xl transition-all duration-1000">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60" />
      
      <div className="relative grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12 lg:p-16">
        {/* Track Info */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-8">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[10px] font-black tracking-[0.2em] text-primary border border-primary/20 uppercase">
              <TrendingUp className="h-3 w-3" />
              Cosmic Featured
            </Badge>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-black leading-[1.1] tracking-tighter text-[#F0F8FF] md:text-5xl lg:text-7xl">
              {track.title}
            </h2>
            <p className="text-xl font-bold text-primary sm:text-2xl">
              {track.uploaderNickname}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <Button
              size="lg"
              className="group h-16 rounded-full bg-white px-10 text-lg font-black text-black transition-all hover:scale-105 hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              onClick={handlePlay}
            >
              {isCurrentlyPlaying ? "Pause Resonance" : "Ignite Sound"}
              <Play className={cn("ml-3 h-5 w-5 fill-current transition-transform group-hover:translate-x-1", isCurrentlyPlaying && "hidden")} />
            </Button>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                className="h-16 w-16 rounded-full border-primary/40 bg-primary/10 p-0 text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(138,43,226,0.2)]"
                onClick={() => setIsShareOpen(true)}
              >
                <Share2 className="h-6 w-6" />
              </Button>
              <div className="flex flex-col">
                <span className="text-base font-black text-white">{formatCount(track.likeCount)}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C0C0C0]/60">Echoes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative order-first md:order-last">
          <div className="group relative aspect-square overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/5">
            <Image
              src={track.thumbnailUrl}
              alt={track.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
              priority
            />
            {/* Play overlay on hover */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-500 group-hover:opacity-100"
            >
              <div className={cn(
                "flex h-24 w-24 items-center justify-center rounded-full bg-primary/90 text-white shadow-2xl transition-transform duration-500 hover:scale-110",
                isCurrentlyPlaying && "animate-pulse"
              )}>
                <Play className="h-10 w-10 fill-current translate-x-1" />
              </div>
            </button>

            {/* Equalizer animation when playing */}
            {isCurrentlyPlaying && (
              <div className="absolute bottom-6 left-6 flex items-end gap-1.5 rounded-2xl bg-black/60 p-4 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(138,43,226,0.5)]">
                <span className="h-4 w-1 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0ms", animationDuration: "0.6s" }} />
                <span className="h-7 w-1 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.15s", animationDuration: "0.6s" }} />
                <span className="h-5 w-1 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.3s", animationDuration: "0.6s" }} />
                <span className="h-8 w-1 animate-bounce bg-primary rounded-full" style={{ animationDelay: "0.45s", animationDuration: "0.6s" }} />
              </div>
            )}
          </div>

          {/* Decorative glows */}
          <div className="absolute -inset-10 -z-10 rounded-full bg-primary/20 opacity-30 blur-[80px] animate-pulse" />
          <div className="absolute top-0 right-0 -inset-10 -z-10 rounded-full bg-amber-500/5 opacity-20 blur-[60px]" />
        </div>
      </div>
      <ShareModal post={track} open={isShareOpen} onOpenChange={setIsShareOpen} />
    </section>
  )
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}
