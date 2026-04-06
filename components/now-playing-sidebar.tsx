"use client"

import Image from "next/image"
import { usePlayer } from "@/lib/player-context"
import { VisualizerBars } from "./visualizer-bars"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function NowPlayingSidebar() {
  const { currentTrack, isPlaying } = usePlayer()

  if (!currentTrack) {
    return (
      <aside className="fixed right-0 top-0 z-40 hidden h-screen w-80 border-l border-white/5 bg-[#05001A]/40 backdrop-blur-xl transition-all duration-700 lg:block">
        <div className="flex h-full flex-col items-center justify-center p-8 text-center space-y-4">
          <div className="h-16 w-16 rounded-3xl bg-white/5 flex items-center justify-center text-[#C0C0C0]/20">
            <Info className="h-8 w-8" />
          </div>
          <p className="text-sm font-bold text-[#C0C0C0]/40 uppercase tracking-widest">
            Select a song to reveal the resonance
          </p>
        </div>
      </aside>
    )
  }

  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-screen w-80 border-l border-white/5 bg-[#05001A]/40 backdrop-blur-xl transition-all duration-700 lg:block overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex flex-col p-6 pt-24 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#C0C0C0]">Now Playing</h2>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(138,43,226,0.8)]" />
          </div>

          {/* Album Art */}
          <div className="group relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl transition-transform hover:scale-[1.02] duration-500">
            <Image
              src={currentTrack.thumbnailUrl}
              alt={currentTrack.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05001A]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <VisualizerBars isPlaying={isPlaying} />
              <div className="flex gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-primary transition-all">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h1 className="text-xl font-black tracking-tight text-white line-clamp-2 leading-tight">
                {currentTrack.title}
              </h1>
              <p className="text-sm font-bold text-primary">
                {currentTrack.uploaderNickname}
              </p>
            </div>

            <div className="flex gap-4 border-t border-white/5 pt-4">
              <div className="flex-1 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C0C0C0]/40">Likes</p>
                <p className="text-sm font-bold text-white">{currentTrack.likeCount.toLocaleString()}</p>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C0C0C0]/40">Comments</p>
                <p className="text-sm font-bold text-white">{currentTrack.commentCount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Social Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-xs font-bold text-[#F0F8FF] hover:bg-white/10 transition-all border border-white/5">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-xs font-bold text-[#F0F8FF] hover:bg-white/10 transition-all border border-white/5">
              <MessageCircle className="h-4 w-4" />
              Discuss
            </button>
          </div>

          {/* Description / Story */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <p className="text-xs font-black uppercase tracking-widest text-[#C0C0C0]">About this Resonance</p>
            <p className="text-xs leading-relaxed text-[#C0C0C0]/60 italic">
              {currentTrack.description}
            </p>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
