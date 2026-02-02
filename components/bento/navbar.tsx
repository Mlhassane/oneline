"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/lib/language-context"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { label: t("nav.features"), href: "#features" },
    { label: t("nav.pricing"), href: "#pricing" },
    { label: t("nav.creators"), href: "#creators" },
    { label: t("nav.examples"), href: "#examples" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out",
          isScrolled ? "w-[95%] max-w-4xl" : "w-[95%] max-w-7xl "
        )}
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 rounded-full bg-linear-to-r from-bento-green/20 via-bento-blue/20 to-bento-pink/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Main navbar container with glass effect */}
        <div
          className={cn(
            "relative rounded-full border transition-all duration-500",
            isScrolled
              ? "bg-card/60 backdrop-blur-2xl border-border/50 shadow-2xl shadow-background/50"
              : "bg-card/40 backdrop-blur-xl border-border/30"
          )}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-px rounded-full bg-linear-to-b from-white/8 to-transparent pointer-events-none" />

          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="absolute -inset-full bg-[conic-gradient(from_0deg,transparent,transparent_40%,var(--bento-green)_50%,transparent_60%,transparent)] animate-spin-slow opacity-30" style={{ animationDuration: '8s' }} />
          </div>

          <div className="relative px-4 md:px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-bento-green rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-9 h-9 bg-linear-to-br from-bento-green to-bento-blue rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-bento-green/40">
                  <span className="text-background font-black text-base">O</span>
                </div>
              </div>
              <span className="text-xl font-bold text-foreground transition-all duration-300 group-hover:text-bento-green group-hover:tracking-wide">
                Onene
              </span>

            </a>

            {/* Desktop Navigation - Center pill */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-all duration-300 text-sm font-medium rounded-full hover:bg-card/80 group"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute inset-0 rounded-full bg-bento-green/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <LanguageToggle />
              <ThemeToggle />
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-300 rounded-full px-5"
                >
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="relative bg-linear-to-r from-bento-green to-bento-blue hover:from-bento-green hover:to-bento-green text-background font-semibold rounded-full px-5 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-bento-green/30 group overflow-hidden">
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <Sparkles className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                  <span className="relative">{t("nav.getStarted")}</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-foreground rounded-xl hover:bg-secondary/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu className={cn("w-6 h-6 absolute transition-all duration-300", isMobileMenuOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100")} />
                <X className={cn("w-6 h-6 absolute transition-all duration-300", isMobileMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50")} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden transition-all duration-500",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-3xl font-bold text-foreground hover:text-bento-green transition-all duration-300",
                isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : "0ms",
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className={cn(
              "flex flex-col gap-4 mt-8 transition-all duration-300",
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
            }}
          >
            <Link href="/login" className="w-full">
              <Button
                variant="ghost"
                className="text-muted-foreground text-xl w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/signup" className="w-full">
              <Button
                className="bg-bento-green hover:bg-bento-green/90 text-background font-semibold rounded-xl px-8 py-6 text-lg w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("nav.getStarted")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
