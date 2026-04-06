"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { Comment } from "@/lib/types"

interface CommentSectionProps {
  comments: Comment[]
  onAddComment?: (text: string) => void
}

export function CommentSection({ comments, onAddComment }: CommentSectionProps) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    onAddComment?.(newComment.trim())
    setNewComment("")
    setIsSubmitting(false)
  }

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold">
        Comments ({comments.length})
      </h3>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Avatar className="h-10 w-10 flex-shrink-0">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none bg-secondary/50"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size="sm"
              disabled={!newComment.trim() || isSubmitting}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              Comment
            </Button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        )}
      </div>
    </section>
  )
}

function CommentItem({ comment }: { comment: Comment }) {
  return (
    <article className="flex gap-3">
      <Avatar className="h-10 w-10 flex-shrink-0">
        <AvatarImage src={comment.avatar} alt={comment.nickname} />
        <AvatarFallback>
          {comment.nickname.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{comment.nickname}</span>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(comment.timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {comment.text}
        </p>
      </div>
    </article>
  )
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "Just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  
  return date.toLocaleDateString()
}
