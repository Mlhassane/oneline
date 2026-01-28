export interface PlatformMatch {
    type: "link" | "social" | "video" | "music" | "map" | "image"
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok"
    title: string
    color: string
}

export function detectPlatform(url: string): PlatformMatch | null {
    const lowercaseUrl = url.toLowerCase()

    if (lowercaseUrl.includes("instagram.com")) {
        return {
            type: "social",
            social: "instagram",
            title: "Instagram",
            color: "bg-gradient-to-br from-pink-500 to-orange-500",
        }
    }
    if (lowercaseUrl.includes("twitter.com") || lowercaseUrl.includes("x.com")) {
        return {
            type: "social",
            social: "twitter",
            title: "Twitter",
            color: "bg-sky-500",
        }
    }
    if (lowercaseUrl.includes("youtube.com") || lowercaseUrl.includes("youtu.be")) {
        return {
            type: "social",
            social: "youtube",
            title: "YouTube",
            color: "bg-red-600",
        }
    }
    if (lowercaseUrl.includes("github.com")) {
        return {
            type: "social",
            social: "github",
            title: "GitHub",
            color: "bg-gray-900",
        }
    }
    if (lowercaseUrl.includes("facebook.com")) {
        return {
            type: "social",
            social: "facebook",
            title: "Facebook",
            color: "bg-blue-600",
        }
    }
    if (lowercaseUrl.includes("linkedin.com")) {
        return {
            type: "social",
            social: "linkedin",
            title: "LinkedIn",
            color: "bg-blue-700",
        }
    }
    if (lowercaseUrl.includes("drive.google.com")) {
        return {
            type: "social",
            social: "drive",
            title: "Google Drive",
            color: "bg-amber-500",
        }
    }
    if (lowercaseUrl.includes("spotify.com")) {
        return {
            type: "music",
            social: "spotify",
            title: "Spotify",
            color: "bg-green-500",
        }
    }
    if (lowercaseUrl.includes("tiktok.com")) {
        return {
            type: "social",
            social: "tiktok",
            title: "TikTok",
            color: "bg-black",
        }
    }

    return null
}
