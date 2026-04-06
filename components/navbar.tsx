"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, TrendingUp, Music2, X, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

const navLinks = [
  { href: "/", label: "Home", icon: Home },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleResultClick = (postId: string) => {
    router.push(`/post/${postId}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-6 pointer-events-none transition-all duration-700">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-[2rem] border border-white/10 bg-[#080024]/60 px-8 py-4 backdrop-blur-2xl shadow-2xl pointer-events-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white shadow-[0_0_15px_rgba(138,43,226,0.5)]">
            <Music2 className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">Melodify</span>
        </Link>

        {/* Center Navigation - Minimal */}
        <div className="hidden items-center gap-4 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "text-primary"
                    : "text-[#C0C0C0] hover:text-white"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Share Music Button - RESTORED */}
          <Link href="/create-post">
            <Button size="sm" className="hidden sm:flex gap-2 rounded-full font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(138,43,226,0.3)]">
              Share Music
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex items-center justify-around border-t border-white/5 py-3 md:hidden">
        {navLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                isActive ? "text-primary" : "text-[#C0C0C0]"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          )
        })}
        <Link
          href="/create-post"
          className="flex flex-col items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#C0C0C0]"
        >
          <Plus className="h-5 w-5" />
          Share
        </Link>
      </div>

    </header>
  )
}
