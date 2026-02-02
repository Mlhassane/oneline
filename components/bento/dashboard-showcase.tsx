"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Monitor,
  Smartphone,
  Plus,
  Settings,
  Eye,
  Share2,
  Grip,
  ImageIcon,
  Link,
  Type,
  Music,
  Video,
  MapPin,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  MoreHorizontal,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock user data
const mockUser = {
  name: "Sarah Chen",
  username: "sarahchen",
  bio: "Product Designer & Creative Director. Building beautiful digital experiences.",
  avatar: "SC",
  avatarColor: "bg-gradient-to-br from-bento-pink to-bento-orange",
}

// Mock bento cards for the user's page
const mockCards = [
  {
    id: 1,
    type: "social",
    platform: "twitter",
    icon: Twitter,
    color: "bg-[#1DA1F2]",
    label: "@sarahchen",
    size: "small"
  },
  {
    id: 2,
    type: "social",
    platform: "instagram",
    icon: Instagram,
    color: "bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    label: "@sarah.designs",
    size: "small"
  },
  {
    id: 3,
    type: "image",
    src: "/placeholder-portfolio.jpg",
    alt: "Portfolio Preview",
    size: "large"
  },
  {
    id: 4,
    type: "link",
    title: "My Portfolio",
    url: "sarahchen.design",
    icon: ExternalLink,
    color: "bg-bento-green",
    size: "medium"
  },
  {
    id: 5,
    type: "social",
    platform: "youtube",
    icon: Youtube,
    color: "bg-[#FF0000]",
    label: "Design Tutorials",
    size: "small"
  },
  {
    id: 6,
    type: "social",
    platform: "linkedin",
    icon: Linkedin,
    color: "bg-[#0A66C2]",
    label: "Connect",
    size: "small"
  },
  {
    id: 7,
    type: "text",
    content: "Currently accepting freelance projects for Q1 2024",
    size: "medium"
  },
  {
    id: 8,
    type: "social",
    platform: "github",
    icon: Github,
    color: "bg-[#333]",
    label: "@sarahchen",
    size: "small"
  },
  {
    id: 9,
    type: "location",
    city: "San Francisco, CA",
    size: "small"
  },
  {
    id: 10,
    type: "music",
    track: "Lofi Beats",
    artist: "ChillHop",
    size: "medium"
  },
]

// Sidebar tools
const sidebarTools = [
  { icon: Link, label: "Link", color: "text-bento-blue" },
  { icon: Type, label: "Text", color: "text-bento-orange" },
  { icon: ImageIcon, label: "Image", color: "text-bento-pink" },
  { icon: Video, label: "Video", color: "text-bento-green" },
  { icon: Music, label: "Music", color: "text-bento-yellow" },
  { icon: MapPin, label: "Map", color: "text-bento-blue" },
]

function BentoCard({ card, isMobile }: { card: typeof mockCards[0], isMobile?: boolean }) {
  const baseClasses = "rounded-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer group overflow-hidden"

  const sizeClasses = isMobile ? {
    small: "col-span-1 row-span-1",
    medium: "col-span-2 row-span-1",
    large: "col-span-2 row-span-2",
  } : {
    small: "col-span-1 row-span-1",
    medium: "col-span-2 row-span-1",
    large: "col-span-2 row-span-2",
  }

  if (card.type === "social") {
    const Icon = card.icon
    if (!Icon) return null
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], card.color, "p-4 flex flex-col justify-between")}>
        <Icon className="w-6 h-6 text-white" />
        <span className="text-white text-xs font-medium opacity-80 group-hover:opacity-100 transition-opacity">{card.label}</span>
      </div>
    )
  }

  if (card.type === "image") {
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], "bg-gradient-to-br from-bento-pink/30 to-bento-orange/30 border border-border flex items-center justify-center")}>
        <div className="text-center">
          <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <span className="text-xs text-muted-foreground">Portfolio</span>
        </div>
      </div>
    )
  }

  if (card.type === "link") {
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], "bg-card border border-border p-4 flex flex-col justify-between")}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">{card.title}</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-bento-green transition-colors" />
        </div>
        <span className="text-xs text-muted-foreground">{card.url}</span>
      </div>
    )
  }

  if (card.type === "text") {
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], "bg-card border border-border p-4 flex items-center")}>
        <p className="text-sm text-foreground leading-relaxed">{card.content}</p>
      </div>
    )
  }

  if (card.type === "location") {
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], "bg-gradient-to-br from-bento-blue/20 to-bento-green/20 border border-border p-4 flex flex-col justify-between")}>
        <MapPin className="w-5 h-5 text-bento-blue" />
        <span className="text-xs font-medium text-foreground">{card.city}</span>
      </div>
    )
  }

  if (card.type === "music") {
    return (
      <div className={cn(baseClasses, sizeClasses[card.size as keyof typeof sizeClasses], "bg-gradient-to-br from-bento-green/20 to-bento-yellow/20 border border-border p-4 flex items-center gap-3")}>
        <div className="w-10 h-10 rounded-lg bg-bento-green/30 flex items-center justify-center">
          <Music className="w-5 h-5 text-bento-green" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{card.track}</p>
          <p className="text-xs text-muted-foreground">{card.artist}</p>
        </div>
      </div>
    )
  }

  return null
}

function DesktopDashboard() {
  return (
    <div className="bg-background rounded-2xl border border-border overflow-hidden shadow-2xl">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 px-3 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">
            oneli.ne/{mockUser.username}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            Preview
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5">
            <Share2 className="w-3.5 h-3.5" />
            Share
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5 bg-bento-green hover:bg-bento-green/90 text-background">
            <Sparkles className="w-3.5 h-3.5" />
            Publish
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-16 border-r border-border bg-card/30 py-4 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-bento-green flex items-center justify-center mb-4">
            <span className="text-background font-bold text-sm">B</span>
          </div>
          {sidebarTools.map((tool) => (
            <button
              key={tool.label}
              type="button"
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors group"
              title={tool.label}
            >
              <tool.icon className={cn("w-5 h-5 text-muted-foreground group-hover:scale-110 transition-transform", `group-hover:${tool.color}`)} />
            </button>
          ))}
          <div className="flex-1" />
          <button type="button" className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Main content area */}
        <div className="flex-1 p-6 bg-background min-h-[500px]">
          <div className="max-w-2xl mx-auto">
            {/* User header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl", mockUser.avatarColor)}>
                {mockUser.avatar}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{mockUser.name}</h3>
                <p className="text-sm text-muted-foreground">@{mockUser.username}</p>
              </div>
              <button type="button" className="p-2 hover:bg-secondary rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Bio */}
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">{mockUser.bio}</p>

            {/* Bento grid */}
            <div className="grid grid-cols-4 gap-3 auto-rows-[80px]">
              {mockCards.slice(0, 8).map((card) => (
                <BentoCard key={card.id} card={card} />
              ))}
            </div>

            {/* Add block button */}
            <button
              type="button"
              className="w-full mt-4 py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:border-bento-green hover:text-bento-green transition-colors group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-sm font-medium">Add Block</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileDashboard() {
  return (
    <div className="w-[280px] mx-auto">
      {/* Phone frame */}
      <div className="relative bg-[#1a1a1a] rounded-[40px] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1a1a1a] rounded-b-2xl z-10 flex items-center justify-center">
          <div className="w-16 h-4 bg-black rounded-full" />
        </div>

        {/* Screen */}
        <div className="bg-background rounded-[32px] overflow-hidden">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2">
            <span className="text-xs font-semibold text-foreground">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                <div className="w-1 h-2 bg-foreground rounded-full" />
                <div className="w-1 h-2.5 bg-foreground rounded-full" />
                <div className="w-1 h-3 bg-foreground rounded-full" />
                <div className="w-1 h-3.5 bg-foreground rounded-full" />
              </div>
              <div className="w-5 h-2.5 border border-foreground rounded-sm ml-1">
                <div className="w-3/4 h-full bg-bento-green rounded-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="px-4 pb-6 min-h-[520px]">
            {/* User header */}
            <div className="text-center mb-6 pt-2">
              <div className={cn("w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-3", mockUser.avatarColor)}>
                {mockUser.avatar}
              </div>
              <h3 className="text-base font-bold text-foreground">{mockUser.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">@{mockUser.username}</p>
              <p className="text-xs text-muted-foreground leading-relaxed px-4">{mockUser.bio}</p>
            </div>

            {/* Bento grid - mobile layout */}
            <div className="grid grid-cols-2 gap-2 auto-rows-[60px]">
              {mockCards.slice(0, 6).map((card) => (
                <BentoCard key={card.id} card={card} isMobile />
              ))}
            </div>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-foreground/30 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

import { useLanguage } from "@/lib/language-context"

// ... imports

// ... mockUser, mockCards, sidebarTools ... (unchanged)

// ... BentoCard ... (unchanged)

// ... DesktopDashboard ... (unchanged)

// ... MobileDashboard ... (unchanged)

export function DashboardShowcase() {
  const [activeView, setActiveView] = useState<"desktop" | "mobile">("desktop")
  const { t } = useLanguage()

  const features = [
    {
      title: t("media.dashboard.drag"),
      description: t("media.dashboard.dragDesc"),
      color: "bg-bento-green/10 border-bento-green/20 text-bento-green"
    },
    {
      title: t("media.dashboard.realtime"),
      description: t("media.dashboard.realtimeDesc"),
      color: "bg-bento-blue/10 border-bento-blue/20 text-bento-blue"
    },
    {
      title: t("media.dashboard.publish"),
      description: t("media.dashboard.publishDesc"),
      color: "bg-bento-pink/10 border-bento-pink/20 text-bento-pink"
    },
  ]

  return (
    <section className="px-4 py-24 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-bento-blue/10 border border-bento-blue/20 rounded-full text-sm font-medium text-bento-blue mb-6">
          <Grip className="w-4 h-4" />
          {t("media.dashboard.preview")}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4">
          {t("media.dashboard.title")}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("media.dashboard.desc")}
        </p>
      </div>

      {/* View toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-1 p-1 bg-card border border-border rounded-full">
          <button
            type="button"
            onClick={() => setActiveView("desktop")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeView === "desktop"
                ? "bg-bento-green text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Monitor className="w-4 h-4" />
            Desktop
          </button>
          <button
            type="button"
            onClick={() => setActiveView("mobile")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeView === "mobile"
                ? "bg-bento-green text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Smartphone className="w-4 h-4" />
            Mobile
          </button>
        </div>
      </div>

      {/* Dashboard preview */}
      <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-bento-green/10 via-bento-blue/10 to-bento-pink/10 blur-3xl -z-10" />

        {/* Desktop view */}
        <div className={cn(
          "transition-all duration-500",
          activeView === "desktop"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
        )}>
          <DesktopDashboard />
        </div>

        {/* Mobile view */}
        <div className={cn(
          "transition-all duration-500 py-8",
          activeView === "mobile"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 absolute inset-0 pointer-events-none"
        )}>
          <MobileDashboard />
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={cn(
              "p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02]",
              feature.color
            )}
          >
            <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
