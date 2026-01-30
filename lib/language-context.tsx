"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Language = "en" | "fr"

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Navbar
        "nav.features": "Features",
        "nav.showcase": "Showcase",
        "nav.pricing": "Pricing",
        "nav.creators": "Creators",
        "nav.examples": "Examples",
        "nav.login": "Log in",
        "nav.getStarted": "Get Started",

        // Hero
        "hero.title": "One Link, Infinite Possibilities",
        "hero.subtitle": "Create a beautiful page that showcases everything you are, everything you create, and everything you sell.",
        "hero.cta": "Get Started for Free",
        "hero.alreadyUser": "Already using Oneline?",

        // General
        "general.createdWith": "Created with",
    },
    fr: {
        // Navbar
        "nav.features": "Fonctionnalités",
        "nav.showcase": "Galerie",
        "nav.pricing": "Tarifs",
        "nav.creators": "Créateurs",
        "nav.examples": "Exemples",
        "nav.login": "Connexion",
        "nav.getStarted": "Commencer",

        // Hero
        "hero.title": "Un Lien, Infinité de Possibilités",
        "hero.subtitle": "Créez une belle page qui présente tout ce que vous êtes, tout ce que vous créez, et tout ce que vous vendez.",
        "hero.cta": "Commencer Gratuitement",
        "hero.alreadyUser": "Déjà utilisateur de Oneline ?",

        // General
        "general.createdWith": "Créé avec",
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
    children: ReactNode
    defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
    const [language, setLanguageState] = useState<Language>(defaultLanguage)

    useEffect(() => {
        // Sync with cookie if needed or just handle side effects
        // We typically don't need to auto-detect client-side if server did it
        // unless we want to sync localStorage -> cookie on first visit
        const saved = localStorage.getItem("language") as Language | null
        if (saved && (saved === "en" || saved === "fr") && saved !== language) {
            // If localStorage has a specific intent different from server (rare if cookie works), we might respect it
            // But usually it's better to stick to the passed defaultLanguage which comes from Cookie/Header
            // Let's just update localStorage when language changes
        }
    }, [language])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
        // Set cookie for server-side persistence
        document.cookie = `language=${lang}; path=/; max-age=31536000`
    }

    const t = (key: string): string => {
        return translations[language]?.[key as keyof typeof translations.en] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
