"use client"

import { ParticleBackground } from "@/components/particle-background"
import { MusicSection } from "@/components/music-section"
import { TagSection } from "@/components/tag-section"
import { SketchSearch } from "@/components/sketch-search"
import { SketchTags } from "@/components/sketch-tags"
import { CartoonLP } from "@/components/cartoon-lp"
import {
  getRecommendedPosts,
  getTrendingPosts,
  getNewPosts,
  getFeaturedTrack,
  popularTags,
} from "@/lib/mock-data"
import { usePlayer } from "@/lib/player-context"
import { useEffect } from "react"

export default function HomePage() {
  const recommendedPosts = getRecommendedPosts()
  const trendingPosts = getTrendingPosts()
  const newPosts = getNewPosts()
  const featuredTrack = getFeaturedTrack()
  const { recentlyPlayed, playTrack, currentTrack } = usePlayer()

  // Auto-play the featured track visually on first load if nothing is playing,
  // but just load it into the state so the LP record shows up immediately.
  useEffect(() => {
    if (!currentTrack && featuredTrack) {
        // We do not call togglePlay to avoid auto-playing sound/forcing user interaction errors
        // Currently, our provider needs a way to set the track without playing.
        // As a workaround, we'll let the user click play on a music-card or we can just rely on user action.
        // Actually, just playTrack but it might not start dummy interval correctly without user gesture.
        // We'll leave it empty for now, the user can click a song below.
    }
  }, [currentTrack, featuredTrack])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 transition-all duration-700">
      <ParticleBackground />
      
      {/* Cosmic Sketchbook Top Header */}
      <SketchSearch />
      
      {/* Dynamic LP Visualizer shown when a track is active */}
      {currentTrack && <CartoonLP />}

      <SketchTags tags={["신나는", "몽환적인", "우주", "휴식", "집중", "Lo-Fi", "사이버펑크"]} />

      {recentlyPlayed.length > 0 && (
        <MusicSection title="Recently Played" posts={recentlyPlayed} />
      )}

      <MusicSection title="Trending Now" posts={trendingPosts} />
      
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="flex-1">
          <MusicSection title="Recommended for You" posts={recommendedPosts} />
        </div>
        <div className="w-full lg:w-80">
          <TagSection tags={popularTags} />
        </div>
      </div>

      <MusicSection title="New Releases" posts={newPosts} />
    </div>
  )
}


