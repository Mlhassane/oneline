import { BentoEditor } from "@/components/dashboard/bento-editor"

export default function DashboardPage() {
    return (
        <div className="p-4 lg:p-8 min-h-full">
            <div className="max-w-7xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
                        Editor
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Customize your unified digital presence.
                    </p>
                </div>

                <BentoEditor />
            </div>
        </div>
    )
}
