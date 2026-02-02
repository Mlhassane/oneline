"use server"

import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function syncUser() {
    const user = await currentUser()

    if (!user) {
        return null
    }

    const dbUser = await prisma.user.upsert({
        where: { clerkId: user.id },
        update: {
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            // Don't overwrite image here to allow custom uploads
        },
        create: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            username: user.username || `user_${Math.random().toString(36).substring(2, 7)}`,
            name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
            image: user.imageUrl,
        },
    })

    return dbUser
}

export async function updateUserAction(id: string, data: { name?: string, username?: string, bio?: string, image?: string, seoTitle?: string, seoDescription?: string, theme?: string }) {
    try {
        // Check if username is taken by another user
        if (data.username) {
            const existing = await prisma.user.findUnique({
                where: { username: data.username.toLowerCase() }
            })
            if (existing && existing.id !== id) {
                return { success: false, error: "Username already taken" }
            }
        }

        const updated = await prisma.user.update({
            where: { id },
            data: {
                ...data,
                username: data.username?.toLowerCase()
            },
        })
        return { success: true, user: updated }
    } catch (error) {
        console.error("Failed to update user:", error)
        return { success: false, error: "Failed to update profile" }
    }
}