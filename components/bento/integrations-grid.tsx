"use client"

import { cn } from "@/lib/utils"
import {
  Youtube,
  Instagram,
  Twitter,
  Music,
  Twitch,
  Video,
  Linkedin,
  Github,
  Globe,
  Podcast,
  ShoppingCart,
  CreditCard,
  Mail,
  Rss,
  Camera,
  MessageCircle
} from "lucide-react"

import { useLanguage } from "@/lib/language-context"

// ... imports

const integrations = [
  { icon: Youtube, name: "YouTube", color: "bg-red-500" },
  { icon: Instagram, name: "Instagram", color: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500" },
  { icon: Twitter, name: "Twitter", color: "bg-sky-500" },
  { icon: Music, name: "Spotify", color: "bg-green-500" },
  { icon: Twitch, name: "Twitch", color: "bg-purple-500" },
  { icon: Video, name: "TikTok", color: "bg-foreground" },
  { icon: Linkedin, name: "LinkedIn", color: "bg-blue-600" },
  { icon: Github, name: "GitHub", color: "bg-gray-800" },
  { icon: Globe, name: "website", color: "bg-bento-green" },
  { icon: Podcast, name: "podcasts", color: "bg-purple-600" },
  { icon: ShoppingCart, name: "shop", color: "bg-bento-orange" },
  { icon: CreditCard, name: "payments", color: "bg-bento-blue" },
  { icon: Mail, name: "newsletters", color: "bg-bento-pink" },
  { icon: Rss, name: "RSS", color: "bg-orange-500" },
  { icon: Camera, name: "photos", color: "bg-pink-500" },
  { icon: MessageCircle, name: "Discord", color: "bg-indigo-500" },
]

export function IntegrationsGrid() {
  const { t } = useLanguage()

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
          <span className="text-muted-foreground">{t("media.integrations.your")}</span> {t("media.integrations.videos")}. {t("media.integrations.podcasts")}.
          <br className="hidden md:block" />
          {t("media.integrations.newsletters")}. {t("media.integrations.photos")}. <span className="text-bento-green">{t("media.integrations.paid")}.</span>
          <br className="hidden md:block" />
          {t("media.integrations.streams")}. {t("media.integrations.calendar")}.
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("media.integrations.desc")}
          <br />
          <span className="text-foreground">{t("media.integrations.noHiding")}</span>
        </p>
      </div>

      {/* Integrations grid */}
      <div className="grid grid-cols-4 md:grid-cols-8 gap-4 max-w-4xl mx-auto mt-12">
        {integrations.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              "aspect-square rounded-2xl flex items-center justify-center transition-all duration-500 hover:scale-125 hover:shadow-xl hover:-rotate-6 cursor-pointer group",
              item.color
            )}
            style={{
              animationDelay: `${index * 50}ms`,
            }}
            title={["website", "podcasts", "shop", "payments", "newsletters", "photos"].includes(item.name) ? t(`media.integrations.${item.name}`) : item.name}
          >
            <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
        ))}
      </div>

      {/* "And many more" text */}
      <div className="text-center mt-12">
        <p className="text-muted-foreground font-medium">{t("media.integrations.manyMore")}</p>
      </div>
    </section>
  )
}
