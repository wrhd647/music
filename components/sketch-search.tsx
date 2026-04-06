"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function SketchSearch() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative mx-auto w-full max-w-md my-8">
      {/* Hand-drawn style container */}
      <div 
        className={cn(
          "relative flex items-center overflow-hidden bg-[#0A0520]",
          "border-4 border-white/80 rounded-2xl",
          "shadow-[4px_4px_0px_#ffffff]",
          "transition-all duration-300",
          isFocused ? "animate-wiggle border-primary shadow-[6px_6px_0px_var(--primary)]" : "hover:-translate-y-1 hover:shadow-[6px_6px_0px_#ffffff]"
        )}
        style={{
          // Irregular border radius for sketch feel
          borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px"
        }}
      >
        <div className="pl-4 pr-2">
          <Search className={cn("h-6 w-6", isFocused ? "text-primary" : "text-white/70")} />
        </div>
        <input
          type="text"
          placeholder="Search for space tunes..."
          className="w-full bg-transparent py-4 pl-2 pr-4 text-white placeholder-white/50 outline-none font-bold text-lg"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      {/* Decorative sparks */}
      {isFocused && (
        <>
          <div className="absolute -top-4 -left-4 text-primary animate-bounce">✨</div>
          <div className="absolute -bottom-4 -right-4 text-primary animate-bounce delay-100">✨</div>
        </>
      )}
    </div>
  )
}
