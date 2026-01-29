"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"
import {
  LayoutGrid,
  Link2,
  Palette,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Eye,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Editor", href: "/dashboard", icon: LayoutGrid },
  { label: "Links", href: "/dashboard/links", icon: Link2 },
  { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-bento-green rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <div className="relative w-8 h-8 bg-gradient-to-br from-bento-green to-bento-blue rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <span className="text-background font-black text-sm">O</span>
            </div>
          </div>
          <span className="text-lg font-bold text-foreground">Onene</span>
        </Link>
      </div>


      {/* Add Block Button */}
      <div className="p-4">
        <Button className="w-full h-11 bg-bento-green hover:bg-bento-green/90 text-background font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-bento-green/25 group">
          <Plus className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
          Add Block
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-bento-green/10 text-bento-green"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className={cn("w-5 h-5", isActive && "text-bento-green")} />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Preview Link */}
      <div className="px-4 py-3 border-t border-border">
        <a
          href={`/u/${user?.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-4 py-3 bg-secondary/50 hover:bg-secondary rounded-xl transition-all duration-300 group"
        >
          <div className="flex items-center gap-3">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">onene.me/{user?.username}</span>
          </div>

          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>

      {/* User section */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bento-green to-bento-blue flex items-center justify-center text-background font-bold">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">@{user?.username}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive rounded-xl hover:bg-destructive/10 transition-all duration-300"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  )
}
