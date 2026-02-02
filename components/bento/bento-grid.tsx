"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Video,
  Headphones,
  Mail,
  Camera,
  ShoppingBag,
  Radio,
  Calendar,
  Youtube,
  Instagram,
  Twitter,
  Music,
  Twitch
} from "lucide-react"

import { useLanguage } from "@/lib/language-context"

const integrations = [
  { icon: Youtube, name: "YouTube", color: "bg-red-500" },
  { icon: Instagram, name: "Instagram", color: "bg-gradient-to-br from-pink-500 to-orange-400" },
  { icon: Twitter, name: "Twitter", color: "bg-sky-500" },
  { icon: Music, name: "Spotify", color: "bg-green-500" },
  { icon: Twitch, name: "Twitch", color: "bg-purple-500" },
  { icon: Video, name: "TikTok", color: "bg-foreground" },
]

const contentTypes = [
  { icon: Video, label: "videos", color: "text-bento-pink" },
  { icon: Headphones, label: "podcasts", color: "text-bento-blue" },
  { icon: Mail, label: "newsletters", color: "text-bento-green" },
  { icon: Camera, label: "photos", color: "text-bento-orange" },
  { icon: ShoppingBag, label: "paid", color: "text-bento-yellow" },
  { icon: Radio, label: "streams", color: "text-bento-pink" },
  { icon: Calendar, label: "calendar", color: "text-bento-blue" },
]

interface BentoCardProps {
  className?: string
  children: React.ReactNode
  gradient?: string
  delay?: number
}

function BentoCard({ className, children, gradient, delay = 0 }: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-6 overflow-hidden transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1 group",
        gradient || "bg-card",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 animate-shimmer" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export function BentoGrid() {
  const { t } = useLanguage()

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-foreground mb-4">
          {t("media.bento.page")}
          <br />
          <span className="text-muted-foreground">{t("media.bento.content")}</span>
        </h2>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[120px] md:auto-rows-[140px]">
        {/* Large featured card */}
        <BentoCard className="col-span-2 row-span-2 bg-gradient-to-br from-bento-green/20 to-bento-blue/20 border border-bento-green/20">
          <div className="h-full flex flex-col justify-between">
            <div className="flex flex-wrap gap-2">
              {integrations.slice(0, 4).map((item, index) => (
                <div
                  key={item.name}
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-6",
                    item.color
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <item.icon className="w-5 h-5 text-white" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-bento-green transition-colors">{t("media.bento.socials")}</h3>
              <p className="text-sm text-muted-foreground">{t("media.bento.connected")}</p>
            </div>
          </div>
        </BentoCard>

        {/* Content type cards */}
        {contentTypes.slice(0, 2).map((item, index) => (
          <BentoCard key={item.label} className="col-span-1 border border-border hover:border-bento-green/50" delay={index * 100}>
            <div className="h-full flex flex-col justify-between">
              <item.icon className={cn("w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6", item.color)} />
              <span className="text-sm font-medium text-foreground">{t(`media.bento.${item.label}`)}</span>
            </div>
          </BentoCard>
        ))}

        {/* Pink gradient card */}
        <BentoCard className="col-span-2 row-span-2 bg-gradient-to-br from-bento-pink/30 to-bento-orange/20 border border-bento-pink/20">
          <div className="h-full flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-full h-16 bg-foreground/10 rounded-xl" />
              <div className="w-3/4 h-3 bg-foreground/10 rounded-full" />
              <div className="w-1/2 h-3 bg-foreground/10 rounded-full" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{t("media.bento.rich")}</h3>
              <p className="text-sm text-muted-foreground">{t("media.bento.noHiding")}</p>
            </div>
          </div>
        </BentoCard>

        {/* More content type cards */}
        {contentTypes.slice(2, 5).map((item, index) => (
          <BentoCard key={item.label} className="col-span-1 border border-border hover:border-bento-green/50" delay={(index + 2) * 100}>
            <div className="h-full flex flex-col justify-between">
              <item.icon className={cn("w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6", item.color)} />
              <span className="text-sm font-medium text-foreground">{t(`media.bento.${item.label}`)}</span>
            </div>
          </BentoCard>
        ))}

        {/* Blue gradient card */}
        <BentoCard className="col-span-2 md:col-span-3 row-span-1 bg-gradient-to-r from-bento-blue/20 to-bento-green/20 border border-bento-blue/20">
          <div className="h-full flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground">{t("media.bento.embed")}</h3>
              <p className="text-sm text-muted-foreground">{t("media.bento.embedDesc")}</p>
            </div>
            <div className="flex gap-2">
              {integrations.slice(0, 3).map((item) => (
                <div
                  key={item.name}
                  className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.color)}
                >
                  <item.icon className="w-4 h-4 text-white" />
                </div>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Remaining content cards */}
        {contentTypes.slice(5).map((item, index) => (
          <BentoCard key={item.label} className="col-span-1 border border-border hover:border-bento-green/50" delay={(index + 5) * 100}>
            <div className="h-full flex flex-col justify-between">
              <item.icon className={cn("w-8 h-8 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6", item.color)} />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  )
}
