"use server"

import { put } from "@vercel/blob"
import { currentUser } from "@clerk/nextjs/server"

export async function uploadImageAction(formData: FormData) {
    try {
        const user = await currentUser()
        if (!user) {
            throw new Error("Unauthorized")
        }

        const file = formData.get("file") as File
        if (!file) {
            throw new Error("No file provided")
        }

        // Check file type
        if (!file.type.startsWith("image/")) {
            throw new Error("File must be an image")
        }

        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error("File size must be less than 5MB")
        }

        const blob = await put(`onene/${user.id}/${Date.now()}-${file.name}`, file, {
            access: "public",
        })

        return { success: true, url: blob.url }
    } catch (error: any) {
        console.error("Upload error:", error)
        return { success: false, error: error.message || "Failed to upload image" }
    }
}
