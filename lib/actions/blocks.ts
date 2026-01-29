"use server"

import prisma from "@/lib/prisma"
import { BentoBlock } from "@/lib/blocks-context"

export async function getBlocks(userId: string) {
    try {
        const blocks = await prisma.block.findMany({
            where: { userId },
            orderBy: { position: "asc" },
        })

        return blocks.map((b: any) => ({
            ...b,
            size: b.size as BentoBlock["size"],
            type: b.type as BentoBlock["type"],
            social: b.social as BentoBlock["social"] || null,
        }))
    } catch (error) {
        console.error("Failed to get blocks:", error)
        return []
    }
}

export async function addBlockAction(userId: string, type: string) {
    try {
        const count = await prisma.block.count({ where: { userId } })

        const block = await prisma.block.create({
            data: {
                userId,
                type,
                title: `New ${type}`,
                size: "medium",
                position: count,
            },
        })

        return block
    } catch (error) {
        console.error("Failed to add block:", error)
        return null
    }
}

export async function updateBlockAction(id: string, data: any) {
    try {
        const block = await prisma.block.update({
            where: { id },
            data,
        })
        return block
    } catch (error) {
        console.error("Failed to update block:", error)
        return null
    }
}

export async function deleteBlockAction(id: string) {
    try {
        await prisma.block.delete({
            where: { id },
        })
        return true
    } catch (error) {
        console.error("Failed to delete block:", error)
        return false
    }
}

export async function reorderBlocksAction(userId: string, blockIds: string[]) {
    try {
        const updates = blockIds.map((id, index) =>
            prisma.block.update({
                where: { id },
                data: { position: index }
            })
        )

        await prisma.$transaction(updates)
        return true
    } catch (error) {
        console.error("Failed to reorder blocks:", error)
        return false
    }
}
