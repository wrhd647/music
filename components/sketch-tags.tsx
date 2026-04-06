"use client"

import { cn } from "@/lib/utils"

interface SketchTagsProps {
  tags: string[]
  onTagClick?: (tag: string) => void
}

const shapes = [
  "255px 15px 225px 15px/15px 225px 15px 255px",
  "15px 255px 15px 225px/255px 15px 225px 15px",
  "225px 15px 255px 15px/15px 255px 15px 225px",
  "50% 50% 50% 50% / 60% 40% 60% 40%" // More elliptical cloud
]

export function SketchTags({ tags, onTagClick }: SketchTagsProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center my-8">
      {tags.map((tag, i) => {
        // Pseudo-random shape based on index
        const shape = shapes[i % shapes.length]
        
        return (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className={cn(
              "relative px-6 py-3 font-bold text-lg tracking-wider",
              "bg-[#0A0520] text-white border-2 border-white/80",
              "shadow-[3px_3px_0px_#ffffff]",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-2 hover:scale-110",
              "hover:border-primary hover:text-primary",
              "hover:shadow-[5px_5px_0px_var(--primary)]",
              "animate-float focus:outline-none"
            )}
            style={{
              borderRadius: shape,
              animationDelay: `${i * 0.2}s`
            }}
          >
            #{tag}
          </button>
        )
      })}
    </div>
  )
}
