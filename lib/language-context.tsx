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

        // Creators Showcase
        "media.creators.title": "Join thousands of inspiring creatives",
        "media.creators.explore": "Explore the most creative Onene pages",
        // Bento Grid
        "media.bento.page": "Your page.",
        "media.bento.content": "Your content.",
        "media.bento.socials": "All your socials",
        "media.bento.connected": "Connected in one place",
        "media.bento.videos": "Videos",
        "media.bento.podcasts": "Podcasts",
        "media.bento.newsletters": "Newsletters",
        "media.bento.photos": "Photos",
        "media.bento.paid": "Paid Products",
        "media.bento.streams": "Streams",
        "media.bento.calendar": "Calendar",
        "media.bento.rich": "Rich Previews",
        "media.bento.noHiding": "No more hiding behind links",
        "media.bento.embed": "Embed anything",
        "media.bento.embedDesc": "YouTube, Spotify, and more",
        // Free Section (Now Pricing)
        "media.free.part": "And the best part:",
        "media.free.free": "It's just $1.",
        "media.free.link": "Your unique link.",
        "media.free.btw": "Premium design. Pocket change price.",
        // Dashboard Showcase
        "media.dashboard.preview": "Dashboard Preview",
        "media.dashboard.title": "Your creative space",
        "media.dashboard.desc": "Drag, drop, and customize. Build your perfect page in minutes with our intuitive dashboard.",
        "media.dashboard.drag": "Drag & Drop",
        "media.dashboard.dragDesc": "Intuitive editor to arrange your content exactly how you want it.",
        "media.dashboard.realtime": "Real-time Preview",
        "media.dashboard.realtimeDesc": "See changes instantly as you build your perfect page.",
        "media.dashboard.publish": "One-click Publish",
        "media.dashboard.publishDesc": "Go live in seconds. Share your page with the world.",
        // Integrations Grid
        "media.integrations.your": "Your",
        "media.integrations.videos": "Videos",
        "media.integrations.podcasts": "Podcasts",
        "media.integrations.newsletters": "Newsletters",
        "media.integrations.photos": "Photos",
        "media.integrations.paid": "Paid Products",
        "media.integrations.streams": "Streams",
        "media.integrations.calendar": "Calendar",
        "media.integrations.payments": "Payments",
        "media.integrations.shop": "Shop",
        "media.integrations.website": "Website",
        "media.integrations.desc": "All your content integrated into your personal page.",
        "media.integrations.noHiding": "No more hiding your content behind links.",
        "media.integrations.manyMore": "And many more...",
        // Footer
        "media.footer.designed": "Designed in Berlin. Built for Creatives.",
        "media.footer.about": "About us",
        "media.footer.changelog": "Changelog",
        "media.footer.explore": "Explore",
        "media.footer.assets": "Brand Assets",
        "media.footer.emailPlaceholder": "Email Address",
        "media.footer.waitlist": "You're on the waitlist!",
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
        "hero.title": "Un lien pour tout partager.",
        "hero.subtitle": "Partagez votre contenu, développez votre audience et vendez vos produits. Le tout avec un seul lien personnel.",
        "hero.cta": "Commencer Gratuitement",
        "hero.alreadyUser": "Déjà utilisateur de Oneline ?",
        "hero.noCreditCard": "Pas de carte requise",
        // Creators Showcase
        "media.creators.title": "Rejoignez des milliers de créatifs inspirants",
        "media.creators.explore": "Explorer les pages Onene les plus créatives",
        // Bento Grid
        "media.bento.page": "Votre page.",
        "media.bento.content": "Votre contenu.",
        "media.bento.socials": "Tous vos réseaux",
        "media.bento.connected": "Connectés au même endroit",
        "media.bento.videos": "Vidéos",
        "media.bento.podcasts": "Podcasts",
        "media.bento.newsletters": "Newsletters",
        "media.bento.photos": "Photos",
        "media.bento.paid": "Produits Payants",
        "media.bento.streams": "Streams",
        "media.bento.calendar": "Calendrier",
        "media.bento.rich": "Aperçus enrichis",
        "media.bento.noHiding": "Ne cachez plus rien derrière des liens",
        "media.bento.embed": "Intégrez tout",
        "media.bento.embedDesc": "YouTube, Spotify, et bien plus",
        // Free Section (Now Pricing)
        "media.free.part": "Et le meilleur :",
        "media.free.free": "C'est juste 1$.",
        "media.free.link": "Votre lien unique.",
        "media.free.btw": "Design premium. Prix dérisoire.",
        // Dashboard Showcase
        "media.dashboard.preview": "Aperçu du Dashboard",
        "media.dashboard.title": "Votre espace créatif",
        "media.dashboard.desc": "Glissez, déposez et personnalisez. Créez votre page parfaite en quelques minutes avec notre dashboard intuitif.",
        "media.dashboard.drag": "Glisser & Déposer",
        "media.dashboard.dragDesc": "Éditeur intuitif pour organiser votre contenu exactement comme vous le souhaitez.",
        "media.dashboard.realtime": "Aperçu Temps Réel",
        "media.dashboard.realtimeDesc": "Voyez les changements instantanément pendant que vous créez.",
        "media.dashboard.publish": "Publication en un clic",
        "media.dashboard.publishDesc": "En ligne en quelques secondes. Partagez votre page avec le monde.",
        // Integrations Grid
        "media.integrations.your": "Vos",
        "media.integrations.videos": "Vidéos",
        "media.integrations.podcasts": "Podcasts",
        "media.integrations.newsletters": "Newsletters",
        "media.integrations.photos": "Photos",
        "media.integrations.paid": "Produits Payants",
        "media.integrations.streams": "Streams",
        "media.integrations.calendar": "Calendrier",
        "media.integrations.payments": "Paiements",
        "media.integrations.shop": "Boutique",
        "media.integrations.website": "Site Web",
        "media.integrations.desc": "Tout votre contenu intégré dans votre page personnelle.",
        "media.integrations.noHiding": "Ne cachez plus votre contenu derrière des liens.",
        "media.integrations.manyMore": "Et bien plus encore...",
        // Footer
        "media.footer.designed": "Conçu à Berlin. Fait pour les Créatifs.",
        "media.footer.about": "À propos",
        "media.footer.changelog": "Nouveautés",
        "media.footer.explore": "Explorer",
        "media.footer.assets": "Marque",
        "media.footer.emailPlaceholder": "Adresse Email",
        "media.footer.waitlist": "Vous êtes sur la liste !",
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
