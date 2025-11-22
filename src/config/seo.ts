import { Metadata } from "next";
import { siteConfig } from "./site";

export const defaultSEO: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: `${siteConfig.name} - ${siteConfig.tagline}`,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: siteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - ${siteConfig.tagline}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.name,
        description: siteConfig.description,
        images: [siteConfig.ogImage],
        creator: "@ntechsolutions",
        site: "@ntechsolutions",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: "/icons/favicon.webp",
        shortcut: "/icons/favicon.webp",
        apple: "/icons/favicon.webp",
    },
    manifest: "/site.webmanifest",
    verification: {
        google: "google-site-verification-code",
        // Add other verification codes as needed
    },
};

export function generatePageSEO({
    title,
    description,
    path = "",
    image,
    noIndex = false,
}: {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const url = `${siteConfig.url}${path}`;
    const ogImage = image || siteConfig.ogImage;

    return {
        title,
        description,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title,
            description,
            url,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
            creator: "@ntechsolutions",
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
        },
    };
}
