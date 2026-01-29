"use client"

import { BentoEditor } from "@/components/dashboard/bento-editor"
import { useAuth } from "@/lib/auth-context"
import { ExternalLink, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    const { user } = useAuth()

    return (
        <div className="p-4 lg:p-8 min-h-full">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                            Editor
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Customize your unified digital presence.
                        </p>
                    </div>

                    {user && (
                        <Link href={`/u/${user.username}`} target="_blank">
                            <Button variant="outline" className="rounded-xl border-border bg-card hover:bg-secondary/50 gap-2 h-11 px-5 shadow-sm transition-all hover:scale-[1.02]">
                                <Eye className="w-4 h-4 text-bento-green" />
                                <span className="text-sm font-semibold">View Public Page</span>
                                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground ml-1" />
                            </Button>
                        </Link>
                    )}
                </div>

                <BentoEditor />
            </div>
        </div>
    )
}
