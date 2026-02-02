export const themes = [
    {
        id: "modern",
        name: "Modern Dark",
        description: "The classic Onene look with deep grays and vibrant accents.",
        colors: ["bg-[#0A0A0A]", "bg-bento-green", "bg-bento-blue"],
        className: "bg-[#0A0A0A] text-white selection:bg-bento-green/30"
    },
    {
        id: "minimal",
        name: "Minimal Light",
        description: "Clean, white and spacious. Perfect for professional portfolios.",
        colors: ["bg-white", "bg-gray-200", "bg-gray-400"],
        className: "bg-white text-zinc-900 selection:bg-black/10"
    },
    {
        id: "midnight",
        name: "Midnight Ocean",
        description: "Deep blues and purples for a dreamy, high-end feel.",
        colors: ["bg-[#020617]", "bg-indigo-500", "bg-purple-500"],
        className: "bg-[#020617] text-white selection:bg-indigo-500/30"
    },
    {
        id: "emerald",
        name: "Emerald Garden",
        description: "Organic tones with sophisticated greens and beige.",
        colors: ["bg-[#FBFAF8]", "bg-emerald-600", "bg-emerald-200"],
        className: "bg-[#FBFAF8] text-emerald-950 selection:bg-emerald-500/30"
    },
]

export function getTheme(id?: string) {
    return themes.find(t => t.id === id) || themes[0]
}
