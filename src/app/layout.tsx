import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { defaultSEO } from "@/config/seo";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ChatWidget } from "@/components/ui/ChatWidget";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = defaultSEO;

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "logo": `${siteConfig.url}${siteConfig.logo}`,
        "description": siteConfig.description,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": siteConfig.contact.phone,
            "email": siteConfig.contact.email,
            "contactType": "customer service",
            "areaServed": "US",
            "availableLanguage": ["English"]
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Silicon Valley",
            "addressRegion": "CA",
            "postalCode": "94000",
            "addressCountry": "US"
        },
        "sameAs": [
            siteConfig.links.twitter,
            siteConfig.links.linkedin,
            siteConfig.links.github,
            siteConfig.links.facebook,
            siteConfig.links.instagram,
            siteConfig.links.youtube
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Inline script to prevent FOUC - runs before anything renders */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    var theme = localStorage.getItem('theme');
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    } else {
                                        document.documentElement.classList.remove('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
                {/* Critical preconnects for third-party origins */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://lottie.host" />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link rel="preconnect" href="https://xrpgyotzqminukdmmxoq.supabase.co" />
                <link rel="preconnect" href="https://images.unsplash.com" />

                {/* DNS prefetch for additional origins */}
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

                {/* Fonts with display=swap for faster text rendering */}
                {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-preconnect */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700&display=swap"
                    rel="stylesheet"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.className
                )}
            >
                <ThemeProvider defaultTheme="light">
                    {children}
                    <Toaster />
                    <ChatWidget />
                </ThemeProvider>
            </body>
        </html>
    );
}
