"use client"

import { useEffect, useRef } from "react"
import { usePlayer } from "@/lib/player-context"
import { ParticleSystem } from "@/src/engine/particleEngine"

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<ParticleSystem | null>(null)
  const animationRef = useRef<number>(0)
  const { isPlaying, currentTrack } = usePlayer()
  const isPlayingRef = useRef(isPlaying)
  const currentTrackRef = useRef(currentTrack)

  // Sync refs with state for the persistent animation loop
  useEffect(() => {
    isPlayingRef.current = isPlaying
    currentTrackRef.current = currentTrack
  }, [isPlaying, currentTrack])

  // Initialize engine once
  useEffect(() => {
    if (!canvasRef.current) return

    const engine = new ParticleSystem(canvasRef.current)
    engineRef.current = engine

    const handleResize = () => engine.resize()
    const handleMouseMove = (e: MouseEvent) => engine.setMouse(e.clientX, e.clientY, true)
    const handleMouseLeave = () => engine.setMouse(-1000, -1000, false)

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    let currentIntensity = 0

      const animate = () => {
        const playing = isPlayingRef.current
        const targetIntensity = playing ? 0.6 + Math.sin(Date.now() / 500) * 0.15 : 0
        
        // Smoothly approach targetIntensity
        currentIntensity += (targetIntensity - currentIntensity) * 0.03 // Balanced easing factor
        
        // Update engine
        engine.update(currentIntensity)
        animationRef.current = requestAnimationFrame(animate)
      }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  // Update hue (atmosphere) without re-initializing engine
  useEffect(() => {
    if (!engineRef.current) return
    
    if (isPlaying && currentTrack) {
      const trackHash = currentTrack.title.length
      const hues = [220, 280, 160] // Navy, Purple, Emerald
      engineRef.current.setHue(hues[trackHash % hues.length])
    } else {
      engineRef.current.setHue(220)
    }
  }, [isPlaying, currentTrack])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      style={{ 
        background: "#000000",
      }}
    />
  )
}
