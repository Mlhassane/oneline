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
