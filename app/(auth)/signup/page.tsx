"use client"

import React from "react"
import Link from "next/link"
import { SignUp } from "@clerk/nextjs"
import { cn } from "@/lib/utils"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-card relative overflow-hidden">
        {/* Floating shapes */}
        <div className="absolute inset-0">
          <div
            className="absolute top-20 right-20 w-32 h-32 bg-bento-pink/20 rounded-3xl animate-float"
            style={{ "--rotate": "-12deg" } as React.CSSProperties}
          />
          <div
            className="absolute top-40 left-20 w-24 h-24 bg-bento-green/20 rounded-2xl animate-float animation-delay-200"
            style={{ "--rotate": "12deg" } as React.CSSProperties}
          />
          <div
            className="absolute bottom-40 right-1/4 w-20 h-20 bg-bento-orange/20 rounded-xl animate-float animation-delay-400"
            style={{ "--rotate": "-45deg" } as React.CSSProperties}
          />
          <div
            className="absolute bottom-20 left-1/3 w-28 h-28 bg-bento-blue/20 rounded-3xl animate-float animation-delay-600"
            style={{ "--rotate": "6deg" } as React.CSSProperties}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-foreground mb-4">
              Create something beautiful
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of creators sharing their world through Onene.
            </p>

            {/* Testimonial */}
            <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border">
              <p className="text-foreground italic mb-4">
                {"\"Onene changed how I share my work. It's simple, beautiful, and my audience loves it.\""}
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-background font-bold shadow-lg shadow-bento-green/20">
                  S
                </div>
                <div className="text-left">
                  <p className="text-foreground font-medium">Sarah Chen</p>
                  <p className="text-muted-foreground text-sm">Designer & Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 lg:px-24 bg-background">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2.5 mb-12 group">
            <div className="relative">
              <div className="absolute inset-0 bg-bento-green rounded-xl blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
              <div className="relative w-10 h-10 bg-linear-to-br from-bento-green to-bento-blue rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <span className="text-background font-black text-lg">O</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-foreground">Onene</span>
          </Link>

          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: "bg-bento-green hover:bg-bento-green/90 text-background border-none shadow-lg shadow-bento-green/20 h-12 rounded-xl text-sm font-bold transition-all",
                card: "bg-transparent border-none shadow-none p-0",
                headerTitle: "text-3xl font-black text-foreground text-left",
                headerSubtitle: "text-muted-foreground text-left",
                socialButtonsBlockButton: "rounded-xl border-border bg-card hover:bg-secondary/50 h-12 transition-all",
                formFieldInput: "h-12 bg-card border-border rounded-xl focus:ring-bento-green",
                footerActionLink: "text-bento-green hover:text-bento-green/80 font-bold",
              },
            }}
            signInUrl="/login"
            routing="hash"
          />
        </div>
      </div>
    </div>
  )
}

