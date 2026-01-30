import { notFound } from "next/navigation"
import { getPublicProfile } from "@/lib/actions/public"
import { PublicProfileView } from "@/components/dashboard/public-profile-view"
import { Metadata } from "next"

interface Props {
    params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username } = await params
    const data = await getPublicProfile(username)

    if (!data) return {}

    const title = data.user.seoTitle || `${data.user.name || username} | Onene`
    const description = data.user.seoDescription || data.user.bio || `Check out ${data.user.name}'s links on Onene.`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: data.user.image ? [data.user.image] : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: data.user.image ? [data.user.image] : [],
        }
    }
}

export default async function PublicPage({ params }: Props) {
    const { username } = await params
    const data = await getPublicProfile(username)

    if (!data) {
        return notFound()
    }

    return <PublicProfileView user={data.user as any} blocks={data.blocks as any} />
}
