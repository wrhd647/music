"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonMusicCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-card">
      {/* Thumbnail skeleton */}
      <Skeleton className="aspect-video w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-4 w-3/4" />
        
        {/* Uploader */}
        <Skeleton className="h-3 w-1/3" />
        
        {/* Tags */}
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-12 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonMusicSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonMusicCard key={i} />
        ))}
      </div>
    </section>
  )
}

export function SkeletonHeroFeatured() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8">
      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {/* Info */}
        <div className="flex flex-col justify-center space-y-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-16 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="h-11 w-28 rounded-full" />
          </div>
        </div>
        {/* Thumbnail */}
        <div className="order-first md:order-last">
          <Skeleton className="aspect-video w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
