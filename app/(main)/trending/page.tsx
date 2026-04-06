import { MusicCard } from "@/components/music-card"
import { mockPosts } from "@/lib/mock-data"

export default function TrendingPage() {
  const trendingPosts = [...mockPosts].sort((a, b) => b.likeCount - a.likeCount)

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Trending Now
        </h1>
        <p className="text-muted-foreground">
          The most popular tracks in the community right now
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {trendingPosts.map((post) => (
          <MusicCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
