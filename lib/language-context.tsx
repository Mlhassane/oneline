"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "en" | "fr"

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
        "nav.login": "Log in",
        "nav.getStarted": "Get Started",

        // Hero
        "hero.title": "One Link, Infinite Possibilities",
        "hero.subtitle": "Create a beautiful page that showcases everything you are, everything you create, and everything you sell.",
        "hero.cta": "Get Started for Free",
        "hero.alreadyUser": "Already using Onene?",

        // General
        "general.createdWith": "Created with",
    },
    fr: {
        // Navbar
        "nav.features": "Fonctionnalités",
        "nav.showcase": "Galerie",
        "nav.pricing": "Tarifs",
        "nav.login": "Connexion",
        "nav.getStarted": "Commencer",

        // Hero
        "hero.title": "Un Lien, Infini de Possibilités",
        "hero.subtitle": "Créez une belle page qui présente tout ce que vous êtes, tout ce que vous créez, et tout ce que vous vendez.",
        "hero.cta": "Commencer Gratuitement",
        "hero.alreadyUser": "Déjà utilisateur de Onene ?",

        // General
        "general.createdWith": "Créé avec",
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>("en")

    useEffect(() => {
        // Load language from localStorage
        const saved = localStorage.getItem("language") as Language | null
        if (saved && (saved === "en" || saved === "fr")) {
            setLanguageState(saved)
        } else {
            // Auto-detect browser language
            const browserLang = navigator.language.split("-")[0]
            if (browserLang === "fr") {
                setLanguageState("fr")
            }
        }
    }, [])

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        localStorage.setItem("language", lang)
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
