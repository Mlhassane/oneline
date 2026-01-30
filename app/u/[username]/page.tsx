"use client"

import { useEffect, useState, use } from "react"
import { notFound } from "next/navigation"
import {
    Link2,
    ImageIcon,
    MapPin,
    Instagram,
    Twitter,
    Youtube,
    Github,
    Facebook,
    Linkedin,
    HardDrive,
    Disc,
    Music2,
    Mail,
    Twitch,
    Send
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getPublicProfile, trackBlockClick } from "@/lib/actions/public"

interface BentoBlockType {
    id: string
    type: "link" | "text" | "image" | "video" | "music" | "map" | "social"
    title: string
    content?: string | null
    username?: string | null // Pour le pseudo social (ex: @sarah.designs)
    url?: string | null
    color?: string | null
    cols: 1 | 2 | 4
    rows: 1 | 2
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok" | "twitch" | "email" | "telegram" | "whatsapp" | null
}

interface UserData {
    id: string
    name: string | null
    username: string
    bio?: string | null
    image?: string | null
}

const socialIcons: Record<string, any> = {
    instagram: Instagram,
    twitter: Twitter,
    youtube: Youtube,
    github: Github,
    facebook: Facebook,
    linkedin: Linkedin,
    drive: HardDrive,
    spotify: Disc,
    tiktok: Music2,
    twitch: Twitch,
    email: Mail,
    telegram: Send,
    whatsapp: Send, // Using Send as placeholder or Phone icon
}

const socialColors: Record<string, string> = {
    instagram: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 border-none text-white",
    twitter: "bg-sky-500 border-none text-white", // Twitter Blue
    youtube: "bg-red-600 border-none text-white",
    github: "bg-gray-900 border-none text-white",
    facebook: "bg-blue-600 border-none text-white",
    linkedin: "bg-blue-700 border-none text-white",
    spotify: "bg-green-500 border-none text-white",
    twitch: "bg-purple-600 border-none text-white",
    tiktok: "bg-black border-none text-white",
    email: "bg-gray-100 dark:bg-gray-800 text-foreground",
    telegram: "bg-sky-400 border-none text-white",
}

const getBlockSize = (cols: number, rows: number) => {
    return `col-span-${cols} row-span-${rows}`
}

export default function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = use(params)
    const [user, setUser] = useState<UserData | null>(null)
    const [blocks, setBlocks] = useState<BentoBlockType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const data = await getPublicProfile(username)
            if (data) {
                setUser(data.user)
                setBlocks(data.blocks)
            }
            setIsLoading(false)
        }

        fetchData()
    }, [username])

    const handleBlockClick = async (blockId: string) => {
        trackBlockClick(blockId).catch(console.error)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-bento-green/30 border-t-bento-green rounded-full animate-spin" />
            </div>
        )
    }

    if (!user) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-background p-4 lg:p-8 flex justify-center selection:bg-bento-green/30">
            <div className="w-full max-w-4xl space-y-12">
                {/* Profile Header */}
                <div className="text-center pt-8">
                    <div className="inline-block mb-6">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || ""}
                                className="w-28 h-28 rounded-full shadow-2xl ring-4 ring-background object-cover"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-background text-4xl font-black shadow-2xl ring-4 ring-background">
                                {user.name?.[0]?.toUpperCase() || "O"}
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-2 tracking-tight">{user.name}</h1>
                    <p className="text-muted-foreground font-medium mb-4">@{user.username}</p>
                    {user.bio && (
                        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* Public Bento Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[130px]">
                    {blocks.map((block) => {
                        const SocialIcon = block.social ? socialIcons[block.social] : null
                        const isSocial = block.type === "social" && block.social
                        const socialColorClass = isSocial && block.social ? socialColors[block.social] : ""

                        return (
                            <a
                                key={block.id}
                                href={block.url || "#"}
                                target={block.url ? "_blank" : undefined}
                                rel={block.url ? "noopener noreferrer" : undefined}
                                onClick={() => handleBlockClick(block.id)}
                                className={cn(
                                    "group relative rounded-4xl p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden flex flex-col justify-between",
                                    getBlockSize(block.cols, block.rows),
                                    isSocial ? socialColorClass : (block.color || "bg-card"),
                                    !isSocial && "bg-card border border-border"
                                )}
                            >
                                {/* Image Background for Image Type Blocks */}
                                {block.type === "image" && block.url && (
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={block.url}
                                            alt={block.title || ""}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                    </div>
                                )}

                                <div className="h-full flex flex-col justify-between relative z-10">
                                    {/* Social Block Layout */}
                                    {isSocial && SocialIcon ? (
                                        <>
                                            <div className="flex items-start justify-between">
                                                <SocialIcon className="w-8 h-8 text-white drop-shadow-md" />
                                                {/* External Link Icon for Social */}
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                                        <polyline points="15 3 21 3 21 9" />
                                                        <line x1="10" y1="14" x2="21" y2="3" />
                                                    </svg>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                {block.username && (
                                                    <p className="text-[11px] font-bold text-white/90 mb-0.5 tracking-wide">
                                                        {block.username}
                                                    </p>
                                                )}
                                                {block.title && !block.username && (
                                                    <p className="text-[11px] font-bold text-white/90 mb-0.5 tracking-wide">
                                                        {block.title}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        /* Standard Block Layout */
                                        <>
                                            <div className="flex items-start justify-between">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-colors",
                                                    (block.color || block.type === "image") ? "bg-white/20" : "bg-secondary group-hover:bg-secondary/80"
                                                )}>
                                                    {block.type === "link" && <Link2 className={cn("w-5 h-5", block.color ? "text-white" : "text-foreground")} />}
                                                    {block.type === "map" && <MapPin className={cn("w-5 h-5", block.color ? "text-white" : "text-foreground")} />}
                                                    {block.type === "image" && <ImageIcon className="w-5 h-5 text-white" />}
                                                    {block.type === "music" && <Music2 className={cn("w-5 h-5", block.color ? "text-white" : "text-foreground")} />}
                                                </div>
                                            </div>

                                            <div className="mt-auto space-y-1">
                                                {block.title && (
                                                    <h3 className={cn(
                                                        "font-bold text-sm tracking-tight transition-colors line-clamp-1",
                                                        (block.color || block.type === "image") ? "text-white" : "text-foreground group-hover:text-bento-green"
                                                    )}>
                                                        {block.title}
                                                    </h3>
                                                )}
                                                {block.content && (
                                                    <p className={cn(
                                                        "text-[11px] leading-relaxed line-clamp-2 font-medium",
                                                        (block.color || block.type === "image") ? "text-white/90" : "text-muted-foreground"
                                                    )}>
                                                        {block.content}
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Hover Effect Overlay */}
                                {!isSocial && (
                                    <div className="absolute inset-0 bg-linear-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                )}
                            </a>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="pt-16 pb-8 text-center">
                    <a href="/" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/30 text-xs font-bold text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-all border border-border/50">
                        <span>Created with</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-md bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-[10px] text-white font-black">O</div>
                            <span className="font-black text-foreground tracking-tighter text-sm">Onene</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
