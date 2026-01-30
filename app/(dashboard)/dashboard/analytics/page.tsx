"use client"

import { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import {
    TrendingUp,
    Users,
    MousePointer2,
    Eye,
    ArrowUpRight,
    ArrowDownRight,
    Loader2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"
import { getAnalyticsData } from "@/lib/actions/analytics"

export default function AnalyticsPage() {
    const { user } = useAuth()
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchAnalytics() {
            if (user?.id) {
                const result = await getAnalyticsData(user.id)
                setData(result)
            }
            setIsLoading(false)
        }

        fetchAnalytics()
    }, [user?.id])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-bento-green animate-spin" />
            </div>
        )
    }

    if (!data) return null

    const stats = [
        {
            label: "Total Visits",
            value: data.totalVisits.toLocaleString(),
            change: "+100%", // Mock change for now
            trend: "up",
            icon: Eye,
            color: "text-bento-blue",
            bg: "bg-bento-blue/10"
        },
        {
            label: "Total Clicks",
            value: data.totalClicks.toLocaleString(),
            change: "+100%",
            trend: "up",
            icon: MousePointer2,
            color: "text-bento-green",
            bg: "bg-bento-green/10"
        },
        {
            label: "Avg. Click Rate",
            value: `${data.avgClickThroughRate.toFixed(1)}%`,
            change: "0%",
            trend: "up",
            icon: TrendingUp,
            color: "text-bento-pink",
            bg: "bg-bento-pink/10"
        },
        {
            label: "Active Blocks",
            value: data.topBlocks.length.toString(),
            change: "0%",
            trend: "up",
            icon: Users,
            color: "text-bento-orange",
            bg: "bg-bento-orange/10"
        },
    ]

    return (
        <div className="p-4 lg:p-8 min-h-full space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        Analytics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your digital presence performance in last 7 days.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center", stat.bg)}>
                                <stat.icon className={cn("w-5 h-5", stat.color)} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full",
                                stat.trend === 'up' ? "bg-bento-green/10 text-bento-green" : "bg-red-500/10 text-red-500"
                            )}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.change}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-2xl font-black tabular-nums">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card border border-border rounded-3xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-lg font-bold tracking-tight">Profile Visits</h2>
                            <p className="text-xs text-muted-foreground mt-1">Daily views for the last 7 days</p>
                        </div>
                    </div>

                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.chartData}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--bento-blue)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--bento-blue)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(var(--border), 0.1)" />
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--muted-foreground)' }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 600, fill: 'var(--muted-foreground)' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        borderRadius: '16px',
                                        border: '1px solid var(--border)',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                    }}
                                    itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="var(--bento-blue)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold tracking-tight mb-6">Top Performing Blocks</h2>
                    <div className="space-y-6 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {data.topBlocks.slice(0, 5).map((block: any) => (
                            <div key={block.id} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-foreground truncate max-w-[150px]">{block.title}</span>
                                    <span className="text-muted-foreground">{block.clicks} clicks</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full bg-bento-green")}
                                        style={{ width: `${data.totalClicks > 0 ? (block.clicks / data.totalClicks) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {data.topBlocks.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-8">
                                No click data yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
