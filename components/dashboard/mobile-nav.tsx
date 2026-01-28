"use client"

import { useState } from "react"
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
  Menu,
  X,
  Plus,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "Editor", href: "/dashboard", icon: LayoutGrid },
  { label: "Links", href: "/dashboard/links", icon: Link2 },
  { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-b border-border z-50 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-bento-green to-bento-blue rounded-lg flex items-center justify-center">
            <span className="text-background font-black text-sm">B</span>
          </div>
          <span className="text-lg font-bold text-foreground">Bento</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-bento-green hover:bg-bento-green/90 text-background rounded-lg"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
          >
            <div className="relative w-6 h-6">
              <Menu
                className={cn(
                  "w-6 h-6 absolute transition-all duration-300",
                  isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100"
                )}
              />
              <X
                className={cn(
                  "w-6 h-6 absolute transition-all duration-300",
                  isOpen ? "opacity-100" : "opacity-0 -rotate-90 scale-50"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed top-16 right-0 bottom-0 w-72 bg-card border-l border-border z-40 transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Preview Link */}
        <div className="p-4 border-b border-border">
          <a
            href={`/u/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl"
          >
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Preview your page</span>
          </a>
        </div>

        {/* Navigation */}
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <li
                  key={item.href}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={cn(isOpen && "animate-slide-in-right")}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
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

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
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
            onClick={() => {
              logout()
              setIsOpen(false)
            }}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-muted-foreground hover:text-destructive rounded-xl hover:bg-destructive/10 transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-xl border-t border-border z-30">
        <div className="flex items-center justify-around h-full">
          {navItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 transition-colors",
                  isActive ? "text-bento-green" : "text-muted-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
