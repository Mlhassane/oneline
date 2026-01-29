"use client"

import { useEffect, useState } from "react"
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
    Music2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getPublicProfile } from "@/lib/actions/public"

interface BentoBlockType {
    id: string
    type: "link" | "text" | "image" | "video" | "music" | "map" | "social"
    title: string
    content?: string
    url?: string
    color?: string
    size: "small" | "medium" | "large"
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok"
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
}

const getBlockSize = (size: string) => {
    switch (size) {
        case "small":
            return "col-span-1 row-span-1"
        case "large":
            return "col-span-2 row-span-2"
        default:
            return "col-span-2 row-span-1"
    }
}

export default function PublicProfilePage({ params }: { params: { username: string } }) {
    const { username } = params
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
                        return (
                            <a
                                key={block.id}
                                href={block.url || "#"}
                                target={block.url ? "_blank" : undefined}
                                rel={block.url ? "noopener noreferrer" : undefined}
                                className={cn(
                                    "group relative rounded-4xl p-5 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden",
                                    getBlockSize(block.size),
                                    block.color || "bg-card"
                                )}
                            >
                                <div className="h-full flex flex-col justify-between relative z-10">
                                    {block.type === "social" && SocialIcon && block.social !== "drive" ? (
                                        <div className="flex items-center justify-center h-full">
                                            <SocialIcon className="w-10 h-10 text-white drop-shadow-lg" />
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                {block.title && (
                                                    <h3 className="font-bold text-foreground text-sm mb-1.5 tracking-tight group-hover:text-bento-green transition-colors">
                                                        {block.title}
                                                    </h3>
                                                )}
                                                {block.content && (
                                                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3 font-medium opacity-80">
                                                        {block.content}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mt-auto">
                                                {block.type === "music" && !SocialIcon && (
                                                    <div className="flex items-center gap-2.5 bg-background/40 backdrop-blur-sm w-fit px-2.5 py-1 rounded-full border border-white/5">
                                                        <div className="w-1.5 h-1.5 bg-bento-green rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                                        <span className="text-[10px] font-bold text-foreground">LIVE</span>
                                                    </div>
                                                )}
                                                {block.type === "music" && SocialIcon && (
                                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                                                        <SocialIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                                {block.type === "map" && (
                                                    <div className="w-8 h-8 rounded-full bg-bento-orange/20 flex items-center justify-center border border-bento-orange/10">
                                                        <MapPin className="w-4 h-4 text-bento-orange" />
                                                    </div>
                                                )}
                                                {block.type === "link" && (
                                                    <div className="w-8 h-8 rounded-full bg-bento-blue/20 flex items-center justify-center border border-bento-blue/10">
                                                        <Link2 className="w-4 h-4 text-bento-blue" />
                                                    </div>
                                                )}
                                                {block.type === "image" && (
                                                    <div className="w-8 h-8 rounded-full bg-bento-pink/20 flex items-center justify-center border border-bento-pink/10">
                                                        <ImageIcon className="w-4 h-4 text-bento-pink" />
                                                    </div>
                                                )}
                                                {block.type === "social" && block.social === "drive" && SocialIcon && (
                                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
                                                        <SocialIcon className="w-4 h-4 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-linear-to-t from-background/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
