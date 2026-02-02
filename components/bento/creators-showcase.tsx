"use client"

import { cn } from "@/lib/utils"

import { useLanguage } from "@/lib/language-context"

const showcaseUsers = [
  { name: "Sarah", role: "Product Designer", color: "bg-bento-pink", blocks: ["bg-bento-pink/20", "bg-bento-blue/20", "bg-bento-green/20"] },
  { name: "Mike", role: "Indie Hacker", color: "bg-bento-blue", blocks: ["bg-bento-blue/20", "bg-bento-orange/20", "bg-bento-pink/20"] },
  { name: "Jessica", role: "Content Creator", color: "bg-bento-green", blocks: ["bg-bento-green/20", "bg-bento-yellow/20", "bg-bento-blue/20"] },
  { name: "Alex", role: "Photographer", color: "bg-bento-orange", blocks: ["bg-bento-orange/20", "bg-bento-pink/20", "bg-bento-green/20"] },
]

function MiniProfileCard({ user, index }: { user: typeof showcaseUsers[0], index: number }) {
  return (
    <div
      className="relative group bg-card border border-border rounded-3xl p-4 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-bento-green/30 w-full aspect-[4/5] flex flex-col gap-3 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header / Avatar */}
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg", user.color)}>
          {user.name[0]}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground group-hover:text-bento-green transition-colors">{user.name}</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{user.role}</span>
        </div>
      </div>

      {/* Mini Bento Grid */}
      <div className="flex-1 grid grid-cols-2 gap-2 mt-2">
        <div className={cn("rounded-xl col-span-2 row-span-1 min-h-[40px] transition-transform duration-500 group-hover:scale-[1.02]", user.blocks[0])} />
        <div className={cn("rounded-xl col-span-1 row-span-2 min-h-[80px] transition-transform duration-500 group-hover:scale-[1.02] delay-75", user.blocks[1])} />
        <div className={cn("rounded-xl col-span-1 row-span-1 min-h-[35px] transition-transform duration-500 group-hover:scale-[1.02] delay-100", user.blocks[2])} />
        <div className="rounded-xl col-span-1 row-span-1 bg-secondary/50 min-h-[35px] transition-transform duration-500 group-hover:scale-[1.02] delay-150" />
      </div>

      {/* Floating Decor */}
      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gradient-to-br from-white/5 to-white/0 rounded-full blur-2xl group-hover:bg-bento-green/10 transition-colors duration-500" />
    </div>
  )
}

export function CreatorsShowcase() {
  const { t } = useLanguage()

  return (
    <section className="px-4 py-24 max-w-7xl mx-auto overflow-hidden">
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-bento-green/20 blur-[100px] rounded-full -z-10" />
        <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
          {t("media.creators.title")}
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span className="text-sm font-medium border-b border-transparent group-hover:border-foreground transition-all">{t("media.creators.explore")}</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>

      {/* Showcase Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {showcaseUsers.map((user, index) => (
          <MiniProfileCard key={user.name} user={user} index={index} />
        ))}
      </div>
    </section>
  )
}
