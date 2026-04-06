/**
 * Senior Creative Technologist Style - Particle Engine
 * Optimized for performance and visual elegance.
 */

interface Point {
  x: number
  y: number
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  alpha: number
  targetAlpha: number
  life: number
  maxLife: number
  color: string
  hue: number

  constructor(width: number, height: number, _unusedHue: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.baseSize = Math.random() * 2.0 + 0.8
    this.size = this.baseSize
    this.alpha = 0
    this.targetAlpha = Math.random() * 0.7 + 0.3
    this.life = 0
    this.maxLife = Math.random() * 300 + 150
    
    // 85% Deep Purple, 15% Celestial Pale Gold
    const isAmber = Math.random() > 0.85
    if (isAmber) {
      this.hue = 45 // Celestial Pale Gold
      this.color = `hsla(45, 40%, 85%,`
    } else {
      this.hue = 280 // Deep Cosmic Purple
      this.color = `hsla(280, 80%, 45%,`
    }
  }

  update(
    mouse: Point & { active: boolean },
    intensity: number,
    width: number,
    height: number
  ) {
    // 1. Life Cycle & alpha
    this.life++
    if (this.life < 50) {
      // Fade in
      this.alpha += (this.targetAlpha - this.alpha) * 0.05
    } else if (this.life > this.maxLife - 50) {
      // Fade out
      this.alpha *= 0.95
    }

    if (this.life >= this.maxLife) {
      this.reset(width, height)
    }

    // 2. Physics - Brownian Motion
    this.vx += (Math.random() - 0.5) * 0.015
    this.vy += (Math.random() - 0.5) * 0.015

    // 3. Audio Reactivity - Balanced size and speed
    const audioMultiplier = 1 + intensity * 2.0 // Toned down from 3.0
    this.size = this.baseSize * audioMultiplier
    
    // Boost velocity on intensity - subtle energy
    if (intensity > 0.1) {
      this.vx += (Math.random() - 0.5) * intensity * 0.2
      this.vy += (Math.random() - 0.5) * intensity * 0.2
    }

    // 4. Mouse Repulsion (Fluid Easing)
    if (mouse.active) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const limit = 120

      if (dist < limit) {
        const force = (1 - dist / limit) * 0.5
        const angle = Math.atan2(dy, dx)
        this.vx += Math.cos(angle) * force
        this.vy += Math.sin(angle) * force
      }
    }

    // Apply Velocity
    this.x += this.vx
    this.y += this.vy

    // Friction
    this.vx *= 0.96
    this.vy *= 0.96

    // Edge Wrap
    if (this.x < 0) this.x = width
    if (this.x > width) this.x = 0
    if (this.y < 0) this.y = height
    if (this.y > height) this.y = 0
  }

  reset(width: number, height: number) {
    this.x = Math.random() * width
    this.y = Math.random() * height
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
    this.life = 0
    this.alpha = 0
    this.maxLife = Math.random() * 200 + 100
  }

  draw(ctx: CanvasRenderingContext2D, intensity: number) {
    if (this.alpha <= 0.01) return

    const glowRadius = this.size * (3 + intensity * 8)
    
    // Radial Gradient for Soft Glow
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, glowRadius
    )
    
    const brightness = 50 + intensity * 30
    gradient.addColorStop(0, `${this.color} ${this.alpha * 0.85})`)
    gradient.addColorStop(0.1, `hsla(${this.hue}, 80%, ${brightness}%, ${this.alpha * 0.4})`)
    gradient.addColorStop(0.3, `hsla(${this.hue}, 60%, 15%, ${this.alpha * 0.15})`)
    gradient.addColorStop(1, `hsla(${this.hue}, 0%, 0%, 0)`)

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)

    ctx.fill()

    // Sharp Core (More prominent)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.95})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size * 0.6, 0, Math.PI * 2)
    ctx.fill()
  }
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private particles: Particle[]
  private width: number
  private height: number
  private mouse: Point & { active: boolean }
  private intensity: number
  private hue: number

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d", { alpha: true })!
    this.particles = []
    this.width = canvas.width
    this.height = canvas.height
    this.mouse = { x: -1000, y: -1000, active: false }
    this.intensity = 0
    this.hue = 220 // Default Navy

    this.init()
  }

  private init() {
    this.resize()
    const count = Math.floor((this.width * this.height) / 7500) // Balanced density between 10000 and 4000
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.width, this.height, this.hue))
    }
  }

  public resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.canvas.width = this.width
    this.canvas.height = this.height
  }

  public setMouse(x: number, y: number, active: boolean) {
    this.mouse.x = x
    this.mouse.y = y
    this.mouse.active = active
  }

  public setHue(_hue: number) {
    // Hue is now fixed per particle for the Interstellar theme
    // We can use this to nudge the overall atmosphere if needed, 
    // but for now we follow the 80/20 cyan/amber rule.
  }

  public update(intensity: number) {
    this.intensity = intensity
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height)

    // Update and Draw particles
    for (const particle of this.particles) {
      particle.update(this.mouse, this.intensity, this.width, this.height)
      particle.draw(this.ctx, this.intensity)
    }
  }
}
