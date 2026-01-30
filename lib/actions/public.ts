"use server"

import prisma from "@/lib/prisma"

export async function getPublicProfile(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
            include: {
                blocks: {
                    orderBy: { position: "asc" },
                },
            },
        })

        if (!user) {
            return null
        }

        // Track visit (async, don't block response)
        prisma.pageVisit.create({
            data: { userId: user.id }
        }).catch(e => console.error("Failed to track visit:", e))

        return {
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                bio: user.bio,
                image: user.image,
            },
            blocks: user.blocks.map((b: any) => ({
                ...b,
                size: b.size as any,
                type: b.type as any,
                social: b.social as any,
            })),
        }
    } catch (error) {
        console.error("Failed to get public profile:", error)
        return null
    }
}

export async function trackBlockClick(blockId: string) {
    try {
        await prisma.blockClick.create({
            data: { blockId }
        })
        return { success: true }
    } catch (error) {
        console.error("Failed to track click:", error)
        return { success: false }
    }
}
