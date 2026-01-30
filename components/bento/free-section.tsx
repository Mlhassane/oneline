"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const names = [
  "tito", "selim", "mary", "valerie", "mugeeb", "silvan", 
  "adeline", "dennis", "michele", "eike", "may-li", "clara"
]

export function FreeSection() {
  const [currentName, setCurrentName] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState<"left" | "right">("right")

  const goToNext = useCallback(() => {
    setDirection("right")
    setCurrentName((prev) => (prev + 1) % names.length)
  }, [])

  const goToPrev = useCallback(() => {
    setDirection("left")
    setCurrentName((prev) => (prev - 1 + names.length) % names.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentName ? "right" : "left")
    setCurrentName(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000)
  }, [currentName])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(goToNext, 2500)
    return () => clearInterval(interval)
  }, [isAutoPlaying, goToNext])

  return (
    <section className="px-4 py-24 max-w-5xl mx-auto">
      <div className="text-center">
        {/* Main headline */}
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-4">
          And the best part:
        </h2>
        <h3 className="text-5xl md:text-7xl lg:text-8xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-bento-green via-bento-blue to-bento-green animate-gradient">
          {"It's free."}
        </h3>

        {/* Unique link section */}
        <div className="mb-8">
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Your unique link.
            <br />
            <span className="text-foreground">And btw, the good ones are still free.</span>
          </p>

          {/* Animated URL display with slider controls */}
          <div className="relative inline-flex flex-col items-center gap-6">
            {/* Main URL box */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-bento-green/30 via-bento-blue/30 to-bento-pink/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-2 bg-card border border-border rounded-2xl px-8 py-5 transition-all duration-500 hover:border-bento-green/50 hover:shadow-2xl hover:shadow-bento-green/20">
                {/* Left arrow */}
                <button
                  type="button"
                  onClick={() => { goToPrev(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
                  className="absolute -left-14 p-2 rounded-full bg-card/80 border border-border text-muted-foreground hover:text-foreground hover:border-bento-green/50 hover:bg-card transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <span className="text-xl md:text-3xl font-bold text-muted-foreground">oneli.ne/</span>
                
                {/* Name slider */}
                <div className="relative w-32 md:w-44 h-10 md:h-12 overflow-hidden">
                  {names.map((name, index) => (
                    <span
                      key={name}
                      className={cn(
                        "absolute inset-0 flex items-center text-xl md:text-3xl font-bold text-bento-green transition-all duration-500",
                        index === currentName 
                          ? "opacity-100 translate-y-0" 
                          : direction === "right"
                            ? index === (currentName - 1 + names.length) % names.length
                              ? "opacity-0 -translate-y-full"
                              : "opacity-0 translate-y-full"
                            : index === (currentName + 1) % names.length
                              ? "opacity-0 translate-y-full"
                              : "opacity-0 -translate-y-full"
                      )}
                    >
                      {name}
                    </span>
                  ))}
                </div>

                {/* Right arrow */}
                <button
                  type="button"
                  onClick={() => { goToNext(); setIsAutoPlaying(false); setTimeout(() => setIsAutoPlaying(true), 5000); }}
                  className="absolute -right-14 p-2 rounded-full bg-card/80 border border-border text-muted-foreground hover:text-foreground hover:border-bento-green/50 hover:bg-card transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {names.map((_, index) => (
                <button
                  key={`dot-${names[index]}`}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "transition-all duration-300 rounded-full",
                    index === currentName
                      ? "w-8 h-2 bg-bento-green"
                      : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scrolling names marquee */}
        <div className="relative overflow-hidden py-8 mt-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex animate-marquee whitespace-nowrap">
            {[...names, ...names, ...names].map((name, index) => (
              <span
                key={`${name}-${index}`}
                className="mx-6 text-2xl md:text-4xl font-black text-muted-foreground/20 hover:text-bento-green/60 transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
