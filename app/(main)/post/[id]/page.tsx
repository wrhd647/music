"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, Play, ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CommentSection } from "@/components/comment-section"
import { usePlayer } from "@/lib/player-context"
import { getPostById, getPostComments, mockComments } from "@/lib/mock-data"
import { notFound } from "next/navigation"

interface PostPageProps {
  params: Promise<{ id: string }>
}

export default function PostPage({ params }: PostPageProps) {
  const { id } = use(params)
  const post = getPostById(id)
  const [comments, setComments] = useState(getPostComments(id))
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.likeCount ?? 0)
  const { playTrack, currentTrack, isPlaying } = usePlayer()

  if (!post) {
    notFound()
  }

  const isCurrentlyPlaying = currentTrack?.id === post.id && isPlaying

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handlePlay = () => {
    playTrack(post)
  }

  const handleAddComment = (text: string) => {
    const newComment = {
      id: `c${Date.now()}`,
      nickname: "You",
      text,
      timestamp: new Date().toISOString(),
    }
    setComments([newComment, ...comments])
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Video Player */}
      <div className="relative mb-6 aspect-video overflow-hidden rounded-xl bg-card">
        <Image
          src={post.thumbnailUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Button
            size="lg"
            className="h-16 w-16 rounded-full"
            onClick={handlePlay}
          >
            <Play className="h-8 w-8 fill-current" />
            <span className="sr-only">Play</span>
          </Button>
        </div>
        {isCurrentlyPlaying && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            <span className="flex gap-0.5">
              <span className="h-3 w-1 animate-pulse bg-primary-foreground" style={{ animationDelay: "0ms" }} />
              <span className="h-4 w-1 animate-pulse bg-primary-foreground" style={{ animationDelay: "150ms" }} />
              <span className="h-3 w-1 animate-pulse bg-primary-foreground" style={{ animationDelay: "300ms" }} />
            </span>
            Now Playing
          </div>
        )}
      </div>

      {/* Post Info */}
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold leading-tight md:text-3xl">
          {post.title}
        </h1>

        {/* Uploader Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {post.uploaderNickname.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${post.uploaderNickname}`}
              className="font-medium hover:text-primary"
            >
              {post.uploaderNickname}
            </Link>
            <p className="text-xs text-muted-foreground" suppressHydrationWarning>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag}`}>
                <Badge
                  variant="secondary"
                  className="cursor-pointer rounded-full transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Description */}
        {post.description && (
          <p className="text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Button
            variant={isLiked ? "default" : "secondary"}
            className="gap-2"
            onClick={handleLike}
          >
            <Heart className={isLiked ? "h-4 w-4 fill-current" : "h-4 w-4"} />
            {likeCount}
          </Button>
          <Button variant="secondary" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Divider */}
      <hr className="mb-8 border-border" />

      {/* Comments Section */}
      <CommentSection comments={comments} onAddComment={handleAddComment} />
    </div>
  )
}
