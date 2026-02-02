"use client"

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
import { trackBlockClick } from "@/lib/actions/public"
import { getEmbedUrl, getYoutubeThumbnail } from "@/lib/platform-detector"
import { getTheme } from "@/lib/themes"
import { useLanguage } from "@/lib/language-context"

interface UserData {
    id: string
    name: string | null
    username: string
    bio?: string | null
    image?: string | null
    theme?: string | null
}

const socialIcons: Record<string, any> = {
    // ...
}

const socialColors: Record<string, string> = {
    // ...
}

const getBlockSize = (cols: number, rows: number) => {
    return `col-span-${cols} row-span-${rows}`
}

export function PublicProfileView({ user, blocks }: { user: UserData, blocks: BentoBlockType[] }) {
    const { t } = useLanguage()
    const activeTheme = getTheme(user.theme || undefined)

    const handleBlockClick = async (blockId: string) => {
        trackBlockClick(blockId).catch(console.error)
    }

    return (
        <div className={cn(
            "min-h-screen p-4 lg:p-8 flex justify-center transition-colors duration-500",
            activeTheme.className
        )}>
            <div className="w-full max-w-4xl space-y-12">
                {/* Profile Header */}
                <div className="text-center pt-8">
                    <div className="inline-block mb-6">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt={user.name || ""}
                                className="w-28 h-28 rounded-full shadow-2xl ring-4 ring-background/20 object-cover"
                            />
                        ) : (
                            <div className="w-28 h-28 rounded-full bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-background text-4xl font-black shadow-2xl ring-4 ring-background/20">
                                {user.name?.[0]?.toUpperCase() || "O"}
                            </div>
                        )}
                    </div>
                    {/* ... rest of header ... */}
                    <div className="text-center pt-8">
                        {/* ... */}
                    </div>
                    {/* Re-implement header because I must replace the return block */}
                    <h1 className="text-3xl font-black text-inherit mb-2 tracking-tight opacity-90">{user.name}</h1>
                    <p className="font-medium mb-4 opacity-60">@{user.username}</p>
                    {user.bio && (
                        <p className="text-sm max-w-md mx-auto leading-relaxed opacity-80">
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
                        const embedUrl = block.url ? getEmbedUrl(block.url, block.type, block.social || undefined) : null
                        const hasEmbed = !!embedUrl && (block.cols >= 2 || block.rows >= 2)

                        return (
                            <div
                                key={block.id}
                                className={cn(
                                    "group relative rounded-4xl transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl overflow-hidden flex flex-col justify-between",
                                    getBlockSize(block.cols, block.rows),
                                    isSocial ? socialColorClass : (block.color || "bg-white/5 border border-white/10"),
                                    !isSocial && !block.color && "backdrop-blur-sm"
                                )}
                            >
                                {hasEmbed ? (
                                    <div className="absolute inset-0 z-0 group">
                                        {(() => {
                                            const youtubeThumb = block.url ? getYoutubeThumbnail(block.url) : null
                                            if (youtubeThumb) {
                                                return (
                                                    <>
                                                        <img
                                                            src={youtubeThumb}
                                                            alt={block.title || ""}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
                                                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                                                            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl scale-90 group-hover:scale-100 transition-transform">
                                                                <Youtube className="w-6 h-6 fill-current" />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            return (
                                                <iframe
                                                    src={embedUrl}
                                                    className="w-full h-full border-0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                />
                                            )
                                        })()}
                                    </div>
                                ) : (
                                    <>
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

                                        <a
                                            href={block.url || "#"}
                                            target={block.url ? "_blank" : undefined}
                                            rel={block.url ? "noopener noreferrer" : undefined}
                                            onClick={() => handleBlockClick(block.id)}
                                            className="h-full w-full p-5 flex flex-col justify-between relative z-10"
                                        >
                                            {isSocial && SocialIcon ? (
                                                <>
                                                    <div className="flex items-start justify-between">
                                                        <SocialIcon className="w-8 h-8 text-white drop-shadow-md" />
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
                                                <>
                                                    <div className="flex items-start justify-between">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-2xl flex items-center justify-center transition-colors text-white",
                                                            (block.color || block.type === "image") ? "bg-white/20" : "bg-white/10 group-hover:bg-white/20"
                                                        )}>
                                                            {block.type === "link" && <Link2 className="w-5 h-5 text-inherit" />}
                                                            {block.type === "map" && <MapPin className="w-5 h-5 text-inherit" />}
                                                            {block.type === "image" && <ImageIcon className="w-5 h-5 text-white" />}
                                                            {block.type === "music" && <Music2 className="w-5 h-5 text-inherit" />}
                                                            {block.type === "video" && <Youtube className="w-5 h-5 text-inherit" />}
                                                        </div>
                                                    </div>

                                                    <div className="mt-auto space-y-1">
                                                        {block.title && (
                                                            <h3 className={cn(
                                                                "font-bold text-sm tracking-tight transition-colors line-clamp-1",
                                                                (block.color || block.type === "image") ? "text-white" : "text-inherit"
                                                            )}>
                                                                {block.title}
                                                            </h3>
                                                        )}
                                                        {block.content && (
                                                            <p className={cn(
                                                                "text-[11px] leading-relaxed line-clamp-2 font-medium opacity-70",
                                                                (block.color || block.type === "image") ? "text-white/90" : "text-inherit"
                                                            )}>
                                                                {block.content}
                                                            </p>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </a>
                                        {!isSocial && (
                                            <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        )}
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Footer */}
                <div className="pt-16 pb-8 text-center">
                    <a href="/" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/30 text-xs font-bold hover:bg-secondary/50 transition-all border border-border/10">
                        <span className="opacity-60">{t("general.createdWith")}</span>
                        <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-md bg-linear-to-br from-bento-green to-bento-blue flex items-center justify-center text-[10px] text-white font-black">O</div>
                            <span className="font-black tracking-tighter text-sm opacity-90">Onene</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
