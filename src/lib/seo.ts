import { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function getBaseMetadata({
    title,
    description,
    image,
}: {
    title?: string;
    description?: string;
    image?: string;
} = {}): Metadata {
    return {
        title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
        description: description || siteConfig.description,
        openGraph: {
            title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
            description: description || siteConfig.description,
            url: siteConfig.url,
            siteName: siteConfig.name,
            images: [
                {
                    url: image || siteConfig.ogImage,
                    width: 1200,
                    height: 630,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
            description: description || siteConfig.description,
            images: [image || siteConfig.ogImage],
        },
        metadataBase: new URL(siteConfig.url),
    };
}
