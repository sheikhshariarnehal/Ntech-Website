export const services = [
    {
        title: "Web Development",
        description:
            "Custom websites and web applications built with modern technologies like Next.js and React.",
        slug: "web-development",
    },
    {
        title: "App Development",
        description:
            "Native and cross-platform mobile applications for iOS and Android.",
        slug: "app-development",
    },
    {
        title: "AI Automation",
        description:
            "Streamline your business processes with custom AI solutions and automation workflows.",
        slug: "ai-automation",
    },
];

export async function getServices() {
    return services;
}
