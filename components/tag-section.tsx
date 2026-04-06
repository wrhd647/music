"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface TagSectionProps {
  tags: { name: string; count: number }[]
}

export function TagSection({ tags }: TagSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold tracking-tight md:text-2xl">
        Popular Tags
      </h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link key={tag.name} href={`/tag/${tag.name}`}>
            <Badge
              variant="secondary"
              className="cursor-pointer rounded-full px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              #{tag.name}
              <span className="ml-2 text-xs text-muted-foreground">
                {formatCount(tag.count)}
              </span>
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  )
}

function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}
