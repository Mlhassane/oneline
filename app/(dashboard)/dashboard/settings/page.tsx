"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { User, Mail, AtSign, FileText } from "lucide-react"

export default function SettingsPage() {
    const { user, updateUser } = useAuth()
    const [name, setName] = useState(user?.name || "")
    const [username, setUsername] = useState(user?.username || "")
    const [bio, setBio] = useState(user?.bio || "")
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            updateUser({
                name,
                username: username.toLowerCase(),
                bio
            })

            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("Failed to update profile")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="p-4 lg:p-8 min-h-full max-w-4xl">
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        Settings
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your profile and public identity.
                    </p>
                </div>

                <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                    <div className="p-6 lg:p-8 space-y-8">
                        {/* Profile Section */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <User className="w-5 h-5 text-bento-green" />
                                Profile Information
                            </h2>

                            <div className="grid gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        Display Name
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your display name"
                                            className="h-12 pl-12 rounded-2xl bg-secondary/30 border-none focus-visible:ring-2 focus-visible:ring-bento-green"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        Username
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            <AtSign className="w-4 h-4" />
                                        </div>
                                        <Input
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="username"
                                            className="h-12 pl-12 rounded-2xl bg-secondary/30 border-none focus-visible:ring-2 focus-visible:ring-bento-green"
                                        />
                                    </div>
                                    <p className="text-[10px] text-muted-foreground ml-1">
                                        This will change your profile URL: onene.me/{username || "username"}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                        Bio
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-4 text-muted-foreground">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <Textarea
                                            id="bio"
                                            value={bio}
                                            onChange={(e) => setBio(e.target.value)}
                                            placeholder="Tell the world about yourself..."
                                            className="min-h-[120px] pl-12 pt-4 rounded-2xl bg-secondary/30 border-none focus-visible:ring-2 focus-visible:ring-bento-green text-sm leading-relaxed"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Account Section (Read-only for now) */}
                        <div className="space-y-6 pt-8 border-t border-border">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Mail className="w-5 h-5 text-bento-blue" />
                                Account Settings
                            </h2>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                    Email Address
                                </Label>
                                <Input
                                    value={user?.email}
                                    disabled
                                    className="h-12 rounded-2xl bg-secondary/10 border-none text-muted-foreground cursor-not-allowed opacity-60"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/20 p-6 lg:px-8 flex justify-end">
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="rounded-2xl h-12 px-8 font-bold bg-foreground text-background hover:bg-foreground/90 transition-all min-w-[140px]"
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

