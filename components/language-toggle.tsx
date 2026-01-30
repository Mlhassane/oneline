"use client"

import * as React from "react"
import { Languages } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageToggle() {
    const { language, setLanguage } = useLanguage()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="rounded-full">
                <Languages className="h-5 w-5" />
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border-border bg-card">
                <DropdownMenuItem
                    onClick={() => setLanguage("en")}
                    className={`cursor-pointer rounded-xl ${language === "en" ? "bg-bento-green/10 text-bento-green font-bold" : ""}`}
                >
                    🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setLanguage("fr")}
                    className={`cursor-pointer rounded-xl ${language === "fr" ? "bg-bento-green/10 text-bento-green font-bold" : ""}`}
                >
                    🇫🇷 Français
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
