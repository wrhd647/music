"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { MusicCard } from "@/components/music-card"
import type { MusicPost } from "@/lib/types"
import { cn } from "@/lib/utils"

interface MusicSectionProps {
  title: string
  posts: MusicPost[]
  viewAllHref?: string
  gridCols?: number
}

export function MusicSection({ title, posts, viewAllHref, gridCols }: MusicSectionProps) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl text-[#F0F8FF]">{title}</h2>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#C0C0C0] transition-all hover:text-primary"
          >
            Show all
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
      <div className={cn(
        "grid gap-4",
        gridCols === 1 
          ? "grid-cols-1" 
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      )}>
        {posts.map((post) => (
          <MusicCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}
