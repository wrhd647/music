"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, Copy, Twitter, Facebook, Link2, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { MusicPost } from "@/lib/types"

interface ShareModalProps {
  post: MusicPost
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareModal({ post, open, onOpenChange }: ShareModalProps) {
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/post/${post.id}` : ""

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    // We could add a toast here
    alert("Link copied to clipboard!")
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] w-full max-w-md translate-x-[-50%] translate-y-[-50%] p-1 transition-all duration-500">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#080024]/80 p-8 shadow-2xl backdrop-blur-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/20 blur-[60px]" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-blue-600/10 blur-[60px]" />

            <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full p-2 text-[#C0C0C0] transition-colors hover:bg-white/5 hover:text-white">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>

            <div className="relative space-y-8">
              <div className="text-center space-y-2">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-[0_0_30px_rgba(138,43,226,0.3)]">
                  <Share2 className="h-7 w-7" />
                </div>
                <DialogPrimitive.Title className="text-2xl font-black tracking-tight text-white">
                  Share this Resonance
                </DialogPrimitive.Title>
                <DialogPrimitive.Description className="text-sm font-medium text-[#C0C0C0]/60">
                  Spread the cosmic echoes with your universe.
                </DialogPrimitive.Description>
              </div>

              {/* Preview Card */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:bg-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-white/10">
                    <Image
                      src={post.thumbnailUrl}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-bold text-white">{post.title}</p>
                    <p className="truncate text-xs font-medium text-[#C0C0C0]/60">{post.uploaderNickname}</p>
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="grid grid-cols-4 gap-4">
                <button className="flex flex-col items-center gap-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#C0C0C0] transition-all group-hover:bg-[#1DA1F2]/20 group-hover:text-[#1DA1F2] group-hover:border-[#1DA1F2]/20">
                    <Twitter className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#C0C0C0]/60 uppercase tracking-widest">X</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#C0C0C0] transition-all group-hover:bg-[#4267B2]/20 group-hover:text-[#4267B2] group-hover:border-[#4267B2]/20">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#C0C0C0]/60 uppercase tracking-widest">FB</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#C0C0C0] transition-all group-hover:bg-primary/20 group-hover:text-primary group-hover:border-primary/20">
                    <Link2 className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#C0C0C0]/60 uppercase tracking-widest">Copy</span>
                </button>
                <button className="flex flex-col items-center gap-2 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-[#C0C0C0] transition-all group-hover:bg-emerald-500/20 group-hover:text-emerald-500 group-hover:border-emerald-500/20">
                    <Share2 className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-[#C0C0C0]/60 uppercase tracking-widest">More</span>
                </button>
              </div>

              {/* Link Input */}
              <div className="relative">
                <input
                  readOnly
                  value={shareUrl}
                  className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 pr-12 text-xs font-medium text-[#C0C0C0] focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#C0C0C0] transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
