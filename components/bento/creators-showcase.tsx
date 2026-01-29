"use client"

import { cn } from "@/lib/utils"

const creators = [
  { name: "Rogie", username: "@rogie", color: "bg-bento-green" },
  { name: "JoshMiller", username: "@joshmiller", color: "bg-bento-blue" },
  { name: "AndreasStorm", username: "@andreasstorm", color: "bg-bento-pink" },
  { name: "GregIsenberg", username: "@gregisenberg", color: "bg-bento-orange" },
  { name: "TruNarla", username: "@trunarla", color: "bg-purple-500" },
  { name: "JoshDunsterville", username: "@joshdunsterville", color: "bg-red-500" },
  { name: "Hustlerani", username: "@hustlerani", color: "bg-sky-500" },
  { name: "AndyAdams", username: "@andyadams", color: "bg-emerald-500" },
  { name: "Micode", username: "@micode", color: "bg-yellow-500" },
  { name: "JordiBruin", username: "@jordibruin", color: "bg-indigo-500" },
]

export function CreatorsShowcase() {
  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
          Join thousands of inspiring creatives
        </p>
      </div>

      {/* Creators grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        {creators.map((creator, index) => (
          <a
            key={creator.name}
            href="#"
            className="group flex items-center gap-3 bg-card border border-border rounded-full px-4 py-2 hover:border-bento-green/50 hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-lg"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12",
                creator.color
              )}
            >
              {creator.name[0]}
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-bento-green transition-colors">
              {creator.name}
            </span>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm font-medium">Explore the most creative Onene pages</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </section>
  )
}
