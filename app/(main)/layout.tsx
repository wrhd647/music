"use client"

import { Navbar } from "@/components/navbar"
import { GlobalPlayer } from "@/components/global-player"
import { PlayerProvider } from "@/lib/player-context"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PlayerProvider>
      <div className="relative min-h-screen bg-[#000000] overflow-x-hidden transition-colors duration-1000">
        {/* Ambient Lighting Layer */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-[#6A0D91]/10 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-blue-600/5 blur-[100px] animate-pulse-slower" />
        </div>
        
        <Navbar />
        <main className="relative z-10 pb-24 pt-24 md:pt-16 px-4">{children}</main>
        <GlobalPlayer />
      </div>
      
      <style jsx global>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }
      `}</style>
    </PlayerProvider>
  )
}
