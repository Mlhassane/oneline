"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./auth-context"

export interface BentoBlock {
    id: string
    type: "link" | "text" | "image" | "video" | "music" | "map" | "social"
    title: string
    content?: string
    url?: string
    color?: string
    size: "small" | "medium" | "large"
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok"
}


interface BlocksContextType {
    blocks: BentoBlock[]
    addBlock: (type: BentoBlock["type"]) => void
    updateBlock: (id: string, data: Partial<BentoBlock>) => void
    deleteBlock: (id: string) => void
    setBlocks: (blocks: BentoBlock[]) => void
    isLoading: boolean
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined)

const BLOCKS_STORAGE_PREFIX = "bento_blocks_"

const defaultBlocks: BentoBlock[] = [
    {
        id: "1",
        type: "social",
        title: "Instagram",
        url: "https://instagram.com",
        color: "bg-gradient-to-br from-pink-500 to-orange-500",
        size: "small",
        social: "instagram",
    },
    {
        id: "2",
        type: "social",
        title: "Twitter",
        url: "https://twitter.com",
        color: "bg-sky-500",
        size: "small",
        social: "twitter",
    },
    {
        id: "3",
        type: "text",
        title: "About Me",
        content: "Creator, designer, and dreamer. Building beautiful things on the internet.",
        color: "bg-bento-green/20",
        size: "large",
    },
]

export function BlocksProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const [blocks, setBlocksState] = useState<BentoBlock[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`${BLOCKS_STORAGE_PREFIX}${user.id}`)
            if (stored) {
                try {
                    setBlocksState(JSON.parse(stored))
                } catch (e) {
                    console.error("Failed to parse blocks", e)
                    setBlocksState(defaultBlocks)
                }
            } else {
                setBlocksState(defaultBlocks)
            }
        } else {
            setBlocksState([])
        }
        setIsLoading(false)
    }, [user])

    const saveBlocks = (newBlocks: BentoBlock[]) => {
        if (user) {
            localStorage.setItem(`${BLOCKS_STORAGE_PREFIX}${user.id}`, JSON.stringify(newBlocks))
        }
        setBlocksState(newBlocks)
    }

    const addBlock = (type: BentoBlock["type"]) => {
        const newBlock: BentoBlock = {
            id: crypto.randomUUID(),
            type,
            title: `New ${type}`,
            color: "bg-card",
            size: "medium",
        }
        saveBlocks([...blocks, newBlock])
    }

    const updateBlock = (id: string, data: Partial<BentoBlock>) => {
        const newBlocks = blocks.map((b) => (b.id === id ? { ...b, ...data } : b))
        saveBlocks(newBlocks)
    }

    const deleteBlock = (id: string) => {
        const newBlocks = blocks.filter((b) => b.id !== id)
        saveBlocks(newBlocks)
    }

    return (
        <BlocksContext.Provider
            value={{
                blocks,
                addBlock,
                updateBlock,
                deleteBlock,
                setBlocks: saveBlocks,
                isLoading,
            }}
        >
            {children}
        </BlocksContext.Provider>
    )
}

export function useBlocks() {
    const context = useContext(BlocksContext)
    if (context === undefined) {
        throw new Error("useBlocks must be used within a BlocksProvider")
    }
    return context
}
