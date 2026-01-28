"use client"

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
    ArrowDownRight
} from "lucide-react"
import { cn } from "@/lib/utils"

const data = [
    { name: 'Mon', views: 400, clicks: 240 },
    { name: 'Tue', views: 300, clicks: 139 },
    { name: 'Wed', views: 600, clicks: 380 },
    { name: 'Thu', views: 800, clicks: 390 },
    { name: 'Fri', views: 500, clicks: 480 },
    { name: 'Sat', views: 900, clicks: 430 },
    { name: 'Sun', views: 1100, clicks: 610 },
];

const stats = [
    {
        label: "Total Views",
        value: "14,284",
        change: "+12.5%",
        trend: "up",
        icon: Eye,
        color: "text-bento-blue",
        bg: "bg-bento-blue/10"
    },
    {
        label: "Unique Visitors",
        value: "8,432",
        change: "+8.2%",
        trend: "up",
        icon: Users,
        color: "text-bento-green",
        bg: "bg-bento-green/10"
    },
    {
        label: "Avg. Click Rate",
        value: "42.8%",
        change: "-2.4%",
        trend: "down",
        icon: MousePointer2,
        color: "text-bento-pink",
        bg: "bg-bento-pink/10"
    },
    {
        label: "Conversion",
        value: "12.4%",
        change: "+4.1%",
        trend: "up",
        icon: TrendingUp,
        color: "text-bento-orange",
        bg: "bg-bento-orange/10"
    },
]

export default function AnalyticsPage() {
    return (
        <div className="p-4 lg:p-8 min-h-full space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">
                        Analytics
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track your digital presence performance.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-2xl w-fit">
                    {['24h', '7d', '30d', 'All'].map((period) => (
                        <button
                            key={period}
                            className={cn(
                                "px-4 py-1.5 text-xs font-bold rounded-xl transition-all",
                                period === '7d' ? "bg-foreground text-background shadow-lg" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {period}
                        </button>
                    ))}
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
                            <h2 className="text-lg font-bold tracking-tight">Views & Engagement</h2>
                            <p className="text-xs text-muted-foreground mt-1">Daily overview of your page performance</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-bento-blue" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Views</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-bento-green" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Clicks</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--bento-blue)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--bento-blue)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--bento-green)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--bento-green)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(var(--border), 0.1)" />
                                <XAxis
                                    dataKey="name"
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
                                    dataKey="views"
                                    stroke="var(--bento-blue)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="clicks"
                                    stroke="var(--bento-green)"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorClicks)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col">
                    <h2 className="text-lg font-bold tracking-tight mb-6">Top Referrers</h2>
                    <div className="space-y-6 flex-1">
                        {[
                            { name: 'Instagram', value: '4,284', percent: 45, color: 'bg-pink-500' },
                            { name: 'Twitter', value: '2,932', percent: 32, color: 'bg-sky-500' },
                            { name: 'Direct', value: '1,432', percent: 18, color: 'bg-gray-400' },
                            { name: 'YouTube', value: '843', percent: 5, color: 'bg-red-500' },
                        ].map((ref) => (
                            <div key={ref.name} className="space-y-2">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-foreground">{ref.name}</span>
                                    <span className="text-muted-foreground">{ref.value}</span>
                                </div>
                                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className={cn("h-full rounded-full", ref.color)}
                                        style={{ width: `${ref.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-border">
                        <button className="w-full h-12 rounded-2xl border-2 border-dashed border-border text-xs font-bold text-muted-foreground hover:border-bento-green/40 hover:text-bento-green transition-all">
                            Export Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

