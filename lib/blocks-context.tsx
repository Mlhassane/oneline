"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useAuth } from "./auth-context"
import {
    getBlocks,
    addBlockAction,
    updateBlockAction,
    deleteBlockAction,
    reorderBlocksAction
} from "./actions/blocks"

export interface BentoBlock {
    id: string
    type: "link" | "text" | "image" | "video" | "music" | "map" | "social"
    title: string
    content?: string | null
    username?: string | null
    url?: string | null
    color?: string | null
    cols: 1 | 2 | 4
    rows: 1 | 2
    social?: "instagram" | "twitter" | "youtube" | "github" | "facebook" | "linkedin" | "drive" | "spotify" | "tiktok" | "twitch" | "email" | "telegram" | "whatsapp" | "reddit" | "discord" | "snapchat" | "pinterest" | "medium" | "threads" | "bluesky" | "patreon" | "onlyfans" | "soundcloud" | "deviantart" | "vimeo" | "substack" | "kofi" | "mastodon" | null
}


interface BlocksContextType {
    blocks: BentoBlock[]
    addBlock: (type: BentoBlock["type"]) => Promise<void>
    updateBlock: (id: string, data: Partial<BentoBlock>) => Promise<void>
    deleteBlock: (id: string) => Promise<void>
    setBlocks: (blocks: BentoBlock[]) => Promise<void>
    isLoading: boolean
}

const BlocksContext = createContext<BlocksContextType | undefined>(undefined)

export function BlocksProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth()
    const [blocks, setBlocksState] = useState<BentoBlock[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchBlocks() {
            if (user?.id) {
                const data = await getBlocks(user.id)
                setBlocksState(data as BentoBlock[])
            } else {
                setBlocksState([])
            }
            setIsLoading(false)
        }

        fetchBlocks()
    }, [user?.id])

    const addBlock = async (type: BentoBlock["type"]) => {
        if (!user) return

        const newBlock = await addBlockAction(user.id, type)
        if (newBlock) {
            setBlocksState([...blocks, newBlock as any])
        }
    }

    const updateBlock = async (id: string, data: Partial<BentoBlock>) => {
        // Optimistic UI update
        const previousBlocks = [...blocks]
        setBlocksState(blocks.map((b) => (b.id === id ? { ...b, ...data } : b)))

        const success = await updateBlockAction(id, data)
        if (!success) {
            setBlocksState(previousBlocks)
        }
    }

    const deleteBlock = async (id: string) => {
        // Optimistic UI update
        const previousBlocks = [...blocks]
        setBlocksState(blocks.filter((b) => b.id !== id))

        const success = await deleteBlockAction(id)
        if (!success) {
            setBlocksState(previousBlocks)
        }
    }

    const setBlocks = async (newBlocks: BentoBlock[]) => {
        setBlocksState(newBlocks)
        if (user) {
            await reorderBlocksAction(user.id, newBlocks.map(b => b.id))
        }
    }

    return (
        <BlocksContext.Provider
            value={{
                blocks,
                addBlock,
                updateBlock,
                deleteBlock,
                setBlocks,
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
