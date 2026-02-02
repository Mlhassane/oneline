"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Palette, Layout, Sparkles, Check, Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { updateUserAction } from "@/lib/actions/user"
import { themes } from "@/lib/themes"
import { toast } from "sonner"

export default function AppearancePage() {
    const { user, updateUser } = useAuth()
    const [selectedTheme, setSelectedTheme] = useState("modern")
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (user?.theme) {
            setSelectedTheme(user.theme)
        }
    }, [user?.theme])

    const handleSave = async () => {
        if (!user) return

        setIsSaving(true)
        try {
            const result = await updateUserAction(user.id, { theme: selectedTheme })
            if (result.success) {
                updateUser({ theme: selectedTheme })
                toast.success("Appearance updated")
            } else {
                toast.error(result.error || "Failed to update appearance")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="p-4 lg:p-8 min-h-full max-w-7xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">
                    Appearance
                </h1>
                <p className="text-muted-foreground mt-2">
                    Customize the look and feel of your public page.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                {/* Left: Theme Selection */}
                <div className="xl:col-span-2 space-y-8">
                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Palette className="w-5 h-5 text-bento-pink" />
                            <h2 className="text-lg font-bold">Base Themes</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    onClick={() => setSelectedTheme(theme.id)}
                                    className={cn(
                                        "group text-left p-6 rounded-3xl border transition-all duration-300 relative overflow-hidden",
                                        selectedTheme === theme.id
                                            ? "bg-card border-foreground/10 shadow-xl ring-2 ring-foreground/5"
                                            : "bg-background border-border hover:border-foreground/10 hover:bg-card/50"
                                    )}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex -space-x-2">
                                            {theme.colors.map((color, i) => (
                                                <div
                                                    key={i}
                                                    className={cn("w-8 h-8 rounded-full border-2 border-card shadow-sm", color)}
                                                />
                                            ))}
                                        </div>
                                        {selectedTheme === theme.id && (
                                            <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center">
                                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-foreground">{theme.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {theme.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-2">
                            <Layout className="w-5 h-5 text-bento-blue" />
                            <h2 className="text-lg font-bold">Layout Density</h2>
                        </div>

                        <div className="bg-card border border-border rounded-3xl p-6">
                            <div className="flex flex-wrap gap-4">
                                {['Compact', 'Balanced', 'Spacious'].map((density) => (
                                    <button
                                        key={density}
                                        className={cn(
                                            "px-8 py-3 rounded-2xl text-sm font-bold transition-all",
                                            density === 'Balanced'
                                                ? "bg-foreground text-background shadow-lg"
                                                : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                                        )}
                                    >
                                        {density}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right: Live Preview */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-bento-yellow" />
                        <h2 className="text-lg font-bold">Instant Preview</h2>
                    </div>

                    <div className="sticky top-8 aspect-[9/16] max-w-[320px] mx-auto xl:mx-0 w-full rounded-[3rem] border-8 border-foreground/5 bg-background shadow-2xl p-6 overflow-hidden flex flex-col items-center">
                        <div className="mt-8 mb-6">
                            <div className="w-20 h-20 rounded-full bg-linear-to-br from-bento-green to-bento-blue shadow-lg mb-4" />
                            <div className="h-4 w-32 bg-secondary rounded-full mx-auto" />
                            <div className="h-2 w-20 bg-secondary/50 rounded-full mx-auto mt-2" />
                        </div>

                        <div className="w-full grid grid-cols-2 gap-3 mt-4">
                            <div className="col-span-2 h-16 bg-bento-blue/10 rounded-2xl" />
                            <div className="h-16 bg-bento-green/10 rounded-2xl" />
                            <div className="h-16 bg-secondary/50 rounded-2xl" />
                            <div className="h-16 bg-secondary/50 rounded-2xl" />
                            <div className="h-16 bg-bento-pink/10 rounded-2xl" />
                        </div>

                        <div className="mt-auto pb-4">
                            <div className="h-8 w-24 bg-secondary/30 rounded-full" />
                        </div>
                    </div>
                    <p className="text-center xl:text-left text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-4">
                        Mobile Responsive View
                    </p>
                </div>
            </div>

            <div className="pt-8 border-t border-border flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="rounded-2xl h-12 px-10 font-black bg-foreground text-background hover:scale-105 transition-all text-sm uppercase tracking-wider shadow-xl"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Apply Appearance
                </Button>
            </div>
        </div>
    )
}

