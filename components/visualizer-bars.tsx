"use client"

import { cn } from "@/lib/utils"

interface VisualizerBarsProps {
  isPlaying: boolean
  className?: string
}

export function VisualizerBars({ isPlaying, className }: VisualizerBarsProps) {
  return (
    <div className={cn("flex items-end gap-[2px] h-4", className)}>
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "w-[2px] bg-primary rounded-full transition-all duration-300",
            isPlaying ? "animate-visualizer-bar" : "h-[20%]"
          )}
          style={{
            animationDelay: `${i * 0.15}s`,
            height: isPlaying ? undefined : "20%"
          }}
        />
      ))}
      <style jsx>{`
        @keyframes visualizer-bar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-visualizer-bar {
          animation: visualizer-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
