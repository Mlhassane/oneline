"use server"

import prisma from "@/lib/prisma"
import { startOfDay, subDays, format } from "date-fns"

export async function getAnalyticsData(userId: string) {
    try {
        // 1. Get total visits
        const totalVisits = await prisma.pageVisit.count({
            where: { userId }
        })

        // 2. Get total clicks for all blocks of the user
        const totalClicks = await prisma.blockClick.count({
            where: {
                block: { userId }
            }
        })

        // 3. Get clicks per block
        const blocksWithClicks = await prisma.block.findMany({
            where: { userId },
            select: {
                id: true,
                title: true,
                type: true,
                _count: {
                    select: { clicks: true }
                }
            },
            orderBy: {
                clicks: {
                    _count: 'desc'
                }
            }
        })

        // 4. Get visits for the last 7 days (chart data)
        const sevenDaysAgo = subDays(startOfDay(new Date()), 6)
        const dailyVisits = await prisma.pageVisit.groupBy({
            by: ['createdAt'],
            where: {
                userId,
                createdAt: {
                    gte: sevenDaysAgo
                }
            },
            _count: true
        })

        // Format chart data
        const chartData = Array.from({ length: 7 }).map((_, i) => {
            const date = subDays(new Date(), 6 - i)
            const dateStr = format(date, 'MMM dd')

            // Filter visits for this day
            const count = dailyVisits.reduce((acc, visit) => {
                const visitDate = format(visit.createdAt, 'MMM dd')
                if (visitDate === dateStr) {
                    return acc + visit._count
                }
                return acc
            }, 0)

            return {
                date: dateStr,
                visits: count
            }
        })

        return {
            totalVisits,
            totalClicks,
            avgClickThroughRate: totalVisits > 0 ? (totalClicks / totalVisits) * 100 : 0,
            topBlocks: blocksWithClicks.map(b => ({
                id: b.id,
                title: b.title,
                type: b.type,
                clicks: b._count.clicks
            })),
            chartData
        }
    } catch (error) {
        console.error("Failed to fetch analytics:", error)
        return null
    }
}
