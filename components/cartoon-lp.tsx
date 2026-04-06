"use client"

import { usePlayer } from "@/lib/player-context"
import { Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

export function CartoonLP() {
  const { currentTrack, isPlaying, togglePlay } = usePlayer()

  if (!currentTrack) return null

  return (
    <div className="relative mx-auto mt-16 mb-32 flex max-w-2xl flex-col items-center">
      <div className="relative flex items-center justify-center w-full min-h-[350px]">
        {/* Album + LP Container */}
        <div className="relative flex items-center group">
          {/* Album Cover (The Sleeve) */}
          <div 
            className="relative z-20 overflow-hidden rounded-md bg-card shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            style={{
               width: "300px",
               height: "300px",
               boxShadow: "25px 0 70px rgba(0,0,0,0.9), -1px -1px 3px rgba(255,255,255,0.1)",
            }}
          >
            <img 
              src={currentTrack.thumbnailUrl} 
              alt="Album Cover" 
              className="h-full w-full object-cover"
            />
            {/* Subtle light/shading on sleeve */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5 pointer-events-none" />
            <div className="absolute inset-0 border border-white/5 rounded-md pointer-events-none" />
            
            {/* Slit shadow on the right edge */}
            <div className="absolute right-0 top-0 h-full w-2 bg-gradient-to-l from-black/80 to-transparent" />

            {/* Play/Pause Button - Placed directly on the Album Cover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className={cn(
                  "flex h-24 w-24 items-center justify-center rounded-full border-4 border-primary text-primary backdrop-blur-sm transition-all duration-500 hover:scale-110 focus:outline-none shadow-[0_0_30px_rgba(160,140,255,0.3)]",
                  !isPlaying && "animate-pulse"
                )}
              >
                {isPlaying ? <Pause className="h-10 w-10" fill="currentColor" /> : <Play className="h-10 w-10 ml-2" fill="currentColor" />}
              </button>
            </div>
          </div>

          {/* The LP Record (Peaking out) */}
          <div 
            className={cn(
              "absolute z-10 transition-all duration-1000 ease-in-out",
              isPlaying ? "translate-x-[230px] opacity-100" : "translate-x-[100px] opacity-90"
            )}
            style={{
              width: "280px",
              height: "280px",
              left: "0px"
            }}
          >
            <div 
              className={cn(
                "relative flex h-full w-full items-center justify-center rounded-full bg-[#080808] border-2 border-[#1a1a1a] shadow-[0_0_50px_rgba(0,0,0,0.7)] cursor-pointer overflow-hidden",
                isPlaying ? "animate-spin-slow" : "rotate-[15deg]",
                "hover:border-primary/40"
              )}
              onClick={togglePlay}
            >
              {/* Vinyl Grooves - Realistic concentric circles */}
               <div className="absolute inset-0 opacity-30" 
                    style={{ background: "repeating-radial-gradient(circle at center, #222 0, #222 1px, transparent 1px, transparent 4px)" }} />
               <div className="absolute inset-4 rounded-full border border-white/5 opacity-20"></div>
               <div className="absolute inset-12 rounded-full border border-white/5 opacity-15"></div>
               <div className="absolute inset-24 rounded-full border border-white/5 opacity-10"></div>
              
              {/* Record Label - Reverted size */}
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-[#080808] shadow-inner">
                <img 
                  src={currentTrack.thumbnailUrl || "/placeholder.svg"} 
                  alt="Label" 
                  className="h-full w-full object-cover grayscale-[0.2]"
                />
                {/* Spindle hole */}
                <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-black border border-white/20 shadow-lg" />
              </div>
              
              {/* Vinyl Shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Info - Adjusted margin for better flow without the intermediate button */}
      <div className="mt-12 flex flex-col items-center animate-float" style={{ animationDuration: '4s' }}>
        <div className="relative group px-10 py-6">
          {/* Glassmorphic Background Card */}
          <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-1 group-hover:rotate-0 transition-transform duration-1000 ease-out" />
          
          {/* Inner Content */}
          <div className="relative z-10 text-center pointer-events-none">
            <div className="mb-2 flex items-center justify-center gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Now Spinning</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-3 bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent drop-shadow-2xl">
              {currentTrack.title}
            </h2>
            
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-primary/40" />
              <p className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs">
                 {currentTrack.uploaderNickname}
              </p>
              <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
          </div>
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-primary/40 rounded-tl-sm" />
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-primary/40 rounded-br-sm" />
        </div>
      </div>
    </div>
  )
}
