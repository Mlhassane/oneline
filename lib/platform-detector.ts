// export interface PlatformMatch {
//     type: "link" | "social" | "video" | "music" | "map" | "image"
//     social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok" | "twitch" | "email" | "telegram" | "whatsapp"
//     title: string
//     color: string
//     username?: string
// }

// // Helper to extract username from URL path
// function extractHandle(url: string, index: number = 1): string | undefined {
//     try {
//         const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
//         const parts = urlObj.pathname.split('/').filter(p => p.length > 0)
//         if (parts.length >= index) {
//             return `@${parts[index - 1]}`
//         }
//     } catch (e) {
//         return undefined
//     }
//     return undefined
// }

// export function detectPlatform(url: string): PlatformMatch | null {
//     const lowercaseUrl = url.toLowerCase()

//     if (lowercaseUrl.includes("instagram.com")) {
//         return {
//             type: "social",
//             social: "instagram",
//             title: "Instagram",
//             color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("twitter.com") || lowercaseUrl.includes("x.com")) {
//         return {
//             type: "social",
//             social: "twitter",
//             title: "Twitter",
//             color: "bg-sky-500 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("youtube.com") || lowercaseUrl.includes("youtu.be")) {
//         let username = undefined
//         if (lowercaseUrl.includes("@")) {
//             try {
//                 const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
//                 const path = urlObj.pathname
//                 const handleMatch = path.match(/@[\w.-]+/)
//                 if (handleMatch) username = handleMatch[0]
//             } catch (e) { }
//         }

//         return {
//             type: "social",
//             social: "youtube",
//             title: "YouTube",
//             color: "bg-red-600 border-none text-white",
//             username
//         }
//     }
//     if (lowercaseUrl.includes("github.com")) {
//         return {
//             type: "social",
//             social: "github",
//             title: "GitHub",
//             color: "bg-gray-900 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("facebook.com")) {
//         return {
//             type: "social",
//             social: "facebook",
//             title: "Facebook",
//             color: "bg-blue-600 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("linkedin.com")) {
//         let username = undefined
//         if (lowercaseUrl.includes("/in/")) {
//             try {
//                 const parts = new URL(url.startsWith('http') ? url : `https://${url}`).pathname.split('/in/')
//                 if (parts[1]) username = `@${parts[1].split('/')[0]}`
//             } catch (e) { }
//         }
//         return {
//             type: "social",
//             social: "linkedin",
//             title: "LinkedIn",
//             color: "bg-blue-700 border-none text-white",
//             username
//         }
//     }
//     if (lowercaseUrl.includes("drive.google.com")) {
//         return {
//             type: "social",
//             social: "drive",
//             title: "Google Drive",
//             color: "bg-amber-500 border-none text-white",
//         }
//     }
//     if (lowercaseUrl.includes("spotify.com")) {
//         return {
//             type: "social", // Changed to social to fit the grid style better
//             social: "spotify",
//             title: "Spotify",
//             color: "bg-green-500 border-none text-white",
//         }
//     }
//     if (lowercaseUrl.includes("tiktok.com")) {
//         return {
//             type: "social",
//             social: "tiktok",
//             title: "TikTok",
//             color: "bg-black border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("twitch.tv")) {
//         return {
//             type: "social",
//             social: "twitch",
//             title: "Twitch",
//             color: "bg-purple-600 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.startsWith("mailto:")) {
//         return {
//             type: "social",
//             social: "email",
//             title: "Email",
//             color: "bg-gray-100 dark:bg-gray-800 text-foreground",
//             username: url.replace("mailto:", "")
//         }
//     }
//     if (lowercaseUrl.includes("t.me")) {
//         return {
//             type: "social",
//             social: "telegram",
//             title: "Telegram",
//             color: "bg-sky-400 border-none text-white",
//             username: extractHandle(url)
//         }
//     }
//     if (lowercaseUrl.includes("wa.me") || lowercaseUrl.includes("whatsapp.com")) {
//         return {
//             type: "social",
//             social: "whatsapp",
//             title: "WhatsApp",
//             color: "bg-green-600 border-none text-white",
//         }
//     }

//     return null
// }

export interface PlatformMatch {
    type: "link" | "social" | "video" | "music" | "map" | "image" | "storage"
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok" | "twitch" | "email" | "telegram" | "whatsapp" | "reddit" | "discord" | "snapchat" | "pinterest" | "medium" | "threads" | "bluesky" | "patreon" | "onlyfans" | "soundcloud" | "deviantart" | "vimeo" | "substack" | "kofi" | "mastodon"
    title: string
    color: string
    username?: string
}
// Normalise l'URL avec le protocole
function normalizeUrl(url: string): string {
    return url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`
}
// Extrait un segment du chemin URL
function extractPathSegment(url: string, index: number = 0): string | undefined {
    try {
        const urlObj = new URL(normalizeUrl(url))
        const parts = urlObj.pathname.split('/').filter(p => p.length > 0)
        return parts[index] || undefined
    } catch {
        return undefined
    }
}
// Extrait le username avec @ depuis un chemin
function extractHandle(url: string, index: number = 0): string | undefined {
    const segment = extractPathSegment(url, index)
    return segment ? `@${segment}` : undefined
}
// Extrait un pattern spécifique depuis l'URL
function extractPattern(url: string, pattern: RegExp): string | undefined {
    try {
        const urlObj = new URL(normalizeUrl(url))
        const match = urlObj.pathname.match(pattern)
        return match?.[1]
    } catch {
        return undefined
    }
}
export function detectPlatform(url: string): PlatformMatch | null {
    if (!url || typeof url !== 'string') {
        return null
    }
    const lowercaseUrl = url.toLowerCase().trim()

    // Email (priorité car mailto: est spécifique)
    if (lowercaseUrl.startsWith("mailto:")) {
        const email = url.replace(/^mailto:/i, "").split('?')[0] // Retire les paramètres
        return {
            type: "social",
            social: "email",
            title: "Email",
            color: "bg-gray-100 dark:bg-gray-800 text-foreground",
            username: email
        }
    }

    // WhatsApp
    if (lowercaseUrl.includes("wa.me") || lowercaseUrl.includes("whatsapp.com")) {
        let username: string | undefined
        const phoneMatch = extractPathSegment(url, 0)
        if (phoneMatch && /^\+?\d+$/.test(phoneMatch)) {
            username = phoneMatch
        }
        return {
            type: "social",
            social: "whatsapp",
            title: "WhatsApp",
            color: "bg-green-600 border-none text-white",
            username
        }
    }

    // Telegram
    if (lowercaseUrl.includes("t.me") || lowercaseUrl.includes("telegram.me")) {
        return {
            type: "social",
            social: "telegram",
            title: "Telegram",
            color: "bg-sky-400 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Discord
    if (lowercaseUrl.includes("discord.gg") || lowercaseUrl.includes("discord.com/invite")) {
        return {
            type: "social",
            social: "discord",
            title: "Discord",
            color: "bg-indigo-600 border-none text-white",
        }
    }

    // YouTube
    if (lowercaseUrl.includes("youtube.com") || lowercaseUrl.includes("youtu.be")) {
        let username: string | undefined

        // Cherche les handles (@username)
        const handleMatch = lowercaseUrl.match(/@([\w.-]+)/)
        if (handleMatch) {
            username = `@${handleMatch[1]}`
        } else {
            // Cherche les channels ou users
            const channelMatch = extractPattern(url, /\/(channel|user|c)\/([\w-]+)/)
            if (channelMatch) {
                username = channelMatch
            }
        }
        return {
            type: "video",
            social: "youtube",
            title: "YouTube",
            color: "bg-red-600 border-none text-white",
            username
        }
    }

    // Spotify
    if (lowercaseUrl.includes("spotify.com")) {
        let username: string | undefined

        // Extrait user, artist, playlist, etc.
        const typeMatch = extractPattern(url, /\/(user|artist|playlist|album)\/([\w]+)/)
        if (typeMatch) {
            username = typeMatch
        }
        return {
            type: "music",
            social: "spotify",
            title: "Spotify",
            color: "bg-green-500 border-none text-white",
            username
        }
    }

    // TikTok
    if (lowercaseUrl.includes("tiktok.com")) {
        return {
            type: "video",
            social: "tiktok",
            title: "TikTok",
            color: "bg-black border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Twitch
    if (lowercaseUrl.includes("twitch.tv")) {
        return {
            type: "video",
            social: "twitch",
            title: "Twitch",
            color: "bg-purple-600 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Instagram
    if (lowercaseUrl.includes("instagram.com")) {
        return {
            type: "social",
            social: "instagram",
            title: "Instagram",
            color: "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Twitter / X
    if (lowercaseUrl.includes("twitter.com") || lowercaseUrl.includes("x.com")) {
        return {
            type: "social",
            social: "twitter",
            title: "Twitter / X",
            color: "bg-black border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // GitHub
    if (lowercaseUrl.includes("github.com")) {
        return {
            type: "social",
            social: "github",
            title: "GitHub",
            color: "bg-gray-900 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // LinkedIn
    if (lowercaseUrl.includes("linkedin.com")) {
        let username: string | undefined

        // Profile personnel (/in/)
        const profileMatch = extractPattern(url, /\/in\/([\w-]+)/)
        if (profileMatch) {
            username = `@${profileMatch}`
        } else {
            // Page entreprise (/company/)
            const companyMatch = extractPattern(url, /\/company\/([\w-]+)/)
            if (companyMatch) {
                username = companyMatch
            }
        }
        return {
            type: "social",
            social: "linkedin",
            title: "LinkedIn",
            color: "bg-blue-700 border-none text-white",
            username
        }
    }

    // Facebook
    if (lowercaseUrl.includes("facebook.com") || lowercaseUrl.includes("fb.com")) {
        return {
            type: "social",
            social: "facebook",
            title: "Facebook",
            color: "bg-blue-600 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Snapchat
    if (lowercaseUrl.includes("snapchat.com")) {
        return {
            type: "social",
            social: "snapchat",
            title: "Snapchat",
            color: "bg-yellow-400 border-none text-black",
            username: extractHandle(url, 1) // add/username
        }
    }

    // Pinterest
    if (lowercaseUrl.includes("pinterest.com") || lowercaseUrl.includes("pin.it")) {
        return {
            type: "social",
            social: "pinterest",
            title: "Pinterest",
            color: "bg-red-600 border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Medium
    if (lowercaseUrl.includes("medium.com")) {
        return {
            type: "social",
            social: "medium",
            title: "Medium",
            color: "bg-black border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Threads
    if (lowercaseUrl.includes("threads.net")) {
        return {
            type: "social",
            social: "threads",
            title: "Threads",
            color: "bg-black border-none text-white",
            username: extractHandle(url, 0)
        }
    }

    // Reddit
    if (lowercaseUrl.includes("reddit.com")) {
        let username: string | undefined

        // User profile
        const userMatch = extractPattern(url, /\/user\/([\w-]+)/)
        if (userMatch) {
            username = `u/${userMatch}`
        } else {
            // Subreddit
            const subredditMatch = extractPattern(url, /\/r\/([\w-]+)/)
            if (subredditMatch) {
                username = `r/${subredditMatch}`
            }
        }
        return {
            type: "social",
            social: "reddit",
            title: "Reddit",
            color: "bg-orange-600 border-none text-white",
            username
        }
    }

    // Google Drive
    if (lowercaseUrl.includes("drive.google.com")) {
        return {
            type: "storage",
            title: "Google Drive",
            color: "bg-amber-500 border-none text-white",
        }
    }

    // Ajouts supplémentaires : Bluesky
    if (lowercaseUrl.includes("bsky.app")) {
        let username: string | undefined;
        // Format typique : bsky.app/profile/username.bsky.social ou did:plc:...
        const profileMatch = extractPattern(url, /\/profile\/([^/]+)/);
        if (profileMatch) {
            username = `@${profileMatch}`;
        }
        return {
            type: "social",
            social: "bluesky",
            title: "Bluesky",
            color: "bg-blue-500 border-none text-white",
            username
        };
    }

    // Patreon
    if (lowercaseUrl.includes("patreon.com")) {
        return {
            type: "social",
            social: "patreon",
            title: "Patreon",
            color: "bg-orange-500 border-none text-white",
            username: extractHandle(url, 0) // patreon.com/nomcreateur
        };
    }

    // OnlyFans
    if (lowercaseUrl.includes("onlyfans.com")) {
        return {
            type: "social",
            social: "onlyfans",
            title: "OnlyFans",
            color: "bg-pink-600 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // Beacons / Linktree
    if (lowercaseUrl.includes("beacons.ai") || lowercaseUrl.includes("linktr.ee")) {
        let platform = lowercaseUrl.includes("beacons.ai") ? "Beacons" : "Linktree";
        return {
            type: "link",
            title: platform,
            color: "bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // SoundCloud
    if (lowercaseUrl.includes("soundcloud.com")) {
        let username: string | undefined;
        const parts = extractPathSegment(url, 0);
        if (parts && !["discover", "charts", "upload"].includes(parts)) {
            username = `@${parts}`;
        }
        return {
            type: "music",
            social: "soundcloud",
            title: "SoundCloud",
            color: "bg-orange-400 border-none text-white",
            username
        };
    }

    // DeviantArt
    if (lowercaseUrl.includes("deviantart.com")) {
        return {
            type: "social",
            social: "deviantart",
            title: "DeviantArt",
            color: "bg-green-600 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // Ajouts pour d'autres services de stockage et similaires (comme demandé)
    // Dropbox
    if (lowercaseUrl.includes("dropbox.com")) {
        return {
            type: "storage",
            title: "Dropbox",
            color: "bg-blue-600 border-none text-white",
        };
    }

    // OneDrive
    if (lowercaseUrl.includes("onedrive.live.com")) {
        return {
            type: "storage",
            title: "OneDrive",
            color: "bg-blue-500 border-none text-white",
        };
    }

    // iCloud
    if (lowercaseUrl.includes("icloud.com")) {
        return {
            type: "storage",
            title: "iCloud",
            color: "bg-gray-300 border-none text-black",
        };
    }

    // Amazon S3 / Drive
    if (lowercaseUrl.includes("s3.amazonaws.com") || lowercaseUrl.includes("amazon.com/drive")) {
        return {
            type: "storage",
            title: "Amazon Drive",
            color: "bg-orange-600 border-none text-white",
        };
    }

    // Google Maps (pour type "map")
    if (lowercaseUrl.includes("maps.google.com") || lowercaseUrl.includes("google.com/maps")) {
        return {
            type: "map",
            title: "Google Maps",
            color: "bg-green-500 border-none text-white",
        };
    }

    // Apple Maps
    if (lowercaseUrl.includes("maps.apple.com")) {
        return {
            type: "map",
            title: "Apple Maps",
            color: "bg-gray-800 border-none text-white",
        };
    }

    // Vimeo (vidéo alternative)
    if (lowercaseUrl.includes("vimeo.com")) {
        return {
            type: "video",
            social: "vimeo",
            title: "Vimeo",
            color: "bg-blue-400 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // Substack (blog/newsletter)
    if (lowercaseUrl.includes("substack.com")) {
        return {
            type: "social",
            social: "substack",
            title: "Substack",
            color: "bg-orange-400 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // Ko-fi (donations)
    if (lowercaseUrl.includes("ko-fi.com")) {
        return {
            type: "social",
            social: "kofi",
            title: "Ko-fi",
            color: "bg-red-500 border-none text-white",
            username: extractHandle(url, 0)
        };
    }

    // Mastodon (social décentralisé)
    if (lowercaseUrl.includes("mastodon.social") || lowercaseUrl.match(/\.social$/) || lowercaseUrl.includes("mastodon")) {
        let username: string | undefined;
        const profileMatch = extractPattern(url, /@([\w-]+)/);
        if (profileMatch) {
            username = `@${profileMatch}`;
        }
        return {
            type: "social",
            social: "mastodon",
            title: "Mastodon",
            color: "bg-purple-500 border-none text-white",
            username
        };
    }

    return null
}

export function getYoutubeThumbnail(url: string): string | null {
    if (!url) return null
    const lowercaseUrl = url.toLowerCase()
    let videoId = ""
    
    if (lowercaseUrl.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0]
    } else if (lowercaseUrl.includes("v=")) {
        videoId = url.split("v=")[1]?.split("&")[0]
    } else if (lowercaseUrl.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0]
    } else if (lowercaseUrl.includes("shorts/")) {
        videoId = url.split("shorts/")[1]?.split("?")[0]
    }

    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null
}

export function getEmbedUrl(url: string, type: string, social?: string): string | null {
    if (!url) return null
    const lowercaseUrl = url.toLowerCase()

    try {
        if (social === "youtube" || lowercaseUrl.includes("youtube.com") || lowercaseUrl.includes("youtu.be")) {
            let videoId = ""
            if (lowercaseUrl.includes("youtu.be/")) {
                videoId = url.split("youtu.be/")[1]?.split("?")[0]
            } else if (lowercaseUrl.includes("v=")) {
                videoId = url.split("v=")[1]?.split("&")[0]
            } else if (lowercaseUrl.includes("embed/")) {
                videoId = url.split("embed/")[1]?.split("?")[0]
            } else if (lowercaseUrl.includes("shorts/")) {
                videoId = url.split("shorts/")[1]?.split("?")[0]
            }
            return videoId ? `https://www.youtube.com/embed/${videoId}` : null
        }

        if (social === "spotify" || lowercaseUrl.includes("spotify.com")) {
            const parts = url.split("spotify.com/")[1]?.split("?")[0]
            return parts ? `https://open.spotify.com/embed/${parts}` : null
        }

        if (social === "tiktok" || lowercaseUrl.includes("tiktok.com")) {
            // TikTok embeds are usually more complex but we can try the basic video embed
            const videoId = url.split("/video/")[1]?.split("?")[0]
            return videoId ? `https://www.tiktok.com/embed/v2/${videoId}` : null
        }

        if (social === "vimeo" || lowercaseUrl.includes("vimeo.com")) {
            const videoId = url.split("vimeo.com/")[1]?.split("?")[0]
            return videoId ? `https://player.vimeo.com/video/${videoId}` : null
        }
    } catch (e) {
        return null
    }

    return null
}

// Fonction utilitaire pour tester plusieurs URLs
export function detectPlatforms(urls: string[]): (PlatformMatch | null)[] {
    return urls.map(url => detectPlatform(url))
}
// Fonction pour valider une URL
export function isValidUrl(url: string): boolean {
    try {
        new URL(normalizeUrl(url))
        return true
    } catch {
        return false
    }
}