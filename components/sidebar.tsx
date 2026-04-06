import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, TrendingUp, Compass, Heart, ListMusic, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

const mainNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Trending", href: "/trending", icon: TrendingUp },
  { label: "Discover", href: "/discover", icon: Compass },
]

const libraryItems = [
  { label: "Saved Albums", count: 12 },
  { label: "Night Ride Mix", count: 45 },
  { label: "Ambient Study", count: 28 },
  { label: "Synthwave Gems", count: 89 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-white/5 bg-[#05001A]/40 backdrop-blur-xl transition-all duration-700 lg:block">
      <ScrollArea className="h-full">
        <div className="flex h-full flex-col p-6 pt-24 space-y-10">
          {/* Main Navigation */}
          <nav className="space-y-2">
            <p className="px-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#C0C0C0]/60">
              Navigation
            </p>
            <div className="space-y-1">
              {mainNav.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
                      isActive 
                        ? "bg-primary text-white shadow-[0_0_20px_rgba(138,43,226,0.3)]" 
                        : "text-[#C0C0C0] hover:bg-white/5 hover:text-[#F0F8FF]"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", isActive && "fill-current")} />
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Library Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C0C0C0]/60">
                Your Library
              </p>
              <button className="text-[#C0C0C0]/40 hover:text-white transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-1">
              <Link
                href="/liked"
                className={cn(
                  "group flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 text-[#C0C0C0] hover:bg-white/5 hover:text-[#F0F8FF]"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg">
                  <Heart className="h-5 w-5 text-white fill-current" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate">Liked Songs</p>
                  <p className="text-[10px] font-medium text-[#C0C0C0]/40">156 tracks</p>
                </div>
              </Link>
              
              {libraryItems.map((item, i) => (
                <button
                  key={i}
                  className="group w-full flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 text-[#C0C0C0] hover:bg-white/5 hover:text-[#F0F8FF]"
                >
                  <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#C0C0C0]/20 group-hover:border-primary/40 group-hover:text-primary transition-all">
                    <ListMusic className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate">{item.label}</p>
                    <p className="text-[10px] font-medium text-[#C0C0C0]/40">Playlist • {item.count} tracks</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer info in sidebar */}
          <div className="mt-auto pt-10 px-4">
            <p className="text-[10px] font-medium leading-relaxed text-[#C0C0C0]/20">
              © 2026 Cosmic Echoes. 
              v1.5.0 • Cinematic Stable
            </p>
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
