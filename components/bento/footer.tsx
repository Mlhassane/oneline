"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <footer className="px-4 py-20 border-t border-border">
      <div className="max-w-4xl mx-auto">
        {/* Email signup */}
        <div className="text-center mb-16">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            {!submitted ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-14 px-6 text-base bg-card border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus-visible:ring-bento-green"
                />
                <Button
                  type="submit"
                  className="h-14 px-8 bg-bento-green hover:bg-bento-green/90 text-background font-semibold rounded-2xl transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="text-center p-6 bg-bento-green/10 rounded-2xl border border-bento-green/20">
                <p className="text-bento-green font-semibold">{"You're on the waitlist!"}</p>
              </div>
            )}
          </form>
        </div>

        {/* Footer content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bento-green rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-sm">B</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Designed in Berlin. Built for Creatives.
            </span>
          </div>

          {/* Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Log In
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About us
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Changelog
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Explore
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Brand Assets
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
