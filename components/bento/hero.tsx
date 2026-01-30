"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"


import { useLanguage } from "@/lib/language-context"

export function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 pt-32 overflow-hidden">

      {/* Background decorative elements with floating animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-32 h-32 bg-bento-green/20 rounded-3xl animate-float animate-pulse-glow"
          style={{ "--rotate": "12deg" } as React.CSSProperties}
        />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-bento-pink/20 rounded-2xl animate-float animation-delay-200"
          style={{ "--rotate": "-12deg" } as React.CSSProperties}
        />
        <div
          className="absolute bottom-40 left-1/4 w-20 h-20 bg-bento-blue/20 rounded-xl animate-float animation-delay-400"
          style={{ "--rotate": "45deg" } as React.CSSProperties}
        />
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-bento-orange/20 rounded-3xl animate-float animation-delay-600"
          style={{ "--rotate": "-6deg" } as React.CSSProperties}
        />
        <div
          className="absolute top-1/3 right-10 w-16 h-16 bg-bento-yellow/15 rounded-2xl animate-float animation-delay-300"
          style={{ "--rotate": "20deg" } as React.CSSProperties}
        />
        <div
          className="absolute bottom-1/3 left-10 w-14 h-14 bg-bento-pink/15 rounded-xl animate-float animation-delay-500"
          style={{ "--rotate": "-30deg" } as React.CSSProperties}
        />
      </div>

      {/* Main headline with staggered animations */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <div className="opacity-0 animate-fade-in-up">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-bento-green/10 border border-bento-green/20 rounded-full text-sm font-medium text-bento-green mb-8">
            <Sparkles className="w-4 h-4" />
            Now in public beta
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground leading-tight tracking-tight mb-6">
          <span className="block opacity-0 animate-fade-in-up animation-delay-100">
             <span className="bg-clip-text text-transparent bg-linear-to-r from-bento-green via-bento-blue to-bento-pink animate-gradient pb-2">
               {t("hero.title")}
             </span>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up animation-delay-500">
          {t("hero.subtitle")}
        </p>
      </div>

      {/* Email signup form with animation */}
      <div className="w-full max-w-md mx-auto mb-12 opacity-0 animate-fade-in-up animation-delay-600">
        <Link href="/signup">
          <Button
            className="w-full h-14 px-8 bg-bento-green hover:bg-bento-green/90 text-background font-semibold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-bento-green/25 group"
          >
            {t("hero.cta")}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {/* Already have access link with animation */}
      <div className="text-center text-muted-foreground opacity-0 animate-fade-in-up animation-delay-700">
        <p className="text-sm">
          {t("hero.alreadyUser")}{" "}
          <Link href="/login" className="text-foreground underline hover:text-bento-green transition-colors duration-300">
            {t("nav.login")}
          </Link>
        </p>
      </div>


      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle opacity-0 animate-fade-in-up animation-delay-800">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
