"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Play, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { MusicPost } from "@/lib/types"
import { usePlayer } from "@/lib/player-context"
import { useState } from "react"
import { ShareModal } from "./share-modal"

interface MusicCardProps {
  post: MusicPost
  className?: string
}

export function MusicCard({ post, className }: MusicCardProps) {
  const { playTrack, currentTrack, isPlaying } = usePlayer()
  const [isShareOpen, setIsShareOpen] = useState(false)
  const isCurrentlyPlaying = currentTrack?.id === post.id && isPlaying

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    playTrack(post)
  }

  return (
    <Link href={`/post/${post.id}`} className={cn("group block", className)}>
      <article className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-card/40 backdrop-blur-lg transition-all duration-500",
        "hover:bg-card/60 hover:border-white/10 hover:shadow-[0_0_25px_rgba(106,13,145,0.3)] hover:-translate-y-1",
        isCurrentlyPlaying && "ring-1 ring-primary/40 shadow-[0_0_20px_rgba(138,43,226,0.2)] bg-card/60"
      )}>
        {/* Thumbnail - Reverted to Video for Centered Layout */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Play Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button
              onClick={handlePlay}
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-all duration-500 hover:scale-110",
                isCurrentlyPlaying ? "scale-100" : "scale-75"
              )}
            >
              <Play className="h-6 w-6 fill-current" />
            </button>
          </div>
          {/* Now Playing Indicator & Share Button */}
          {isCurrentlyPlaying && (
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 rounded-full bg-primary/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-primary-foreground backdrop-blur-md shadow-lg">
                Playing
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsShareOpen(true)
                }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-all hover:bg-primary hover:text-white border border-white/10"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Content - Spacious */}
        <div className="p-5">
          {/* Title */}
          <h3 className="mb-2 line-clamp-2 text-sm font-extrabold leading-tight text-[#F0F8FF] transition-colors group-hover:text-primary">
            {post.title}
          </h3>

          {/* Uploader */}
          <p className="mb-4 text-xs font-semibold text-[#C0C0C0]">
            {post.uploaderNickname}
          </p>

          {/* Social Stats - REMOVED */}
        </div>
      </article>
      <ShareModal post={post} open={isShareOpen} onOpenChange={setIsShareOpen} />
    </Link>
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
