export const projects = [
    {
        title: "E-commerce Platform",
        summary: "A full-featured online store with payment integration.",
        tags: ["Next.js", "Stripe", "Supabase"],
        slug: "ecommerce-platform",
        client: "RetailCo",
        problem: "The client needed a scalable e-commerce solution to handle high traffic and complex product variants.",
        solution: "We built a custom Next.js application with Supabase for the backend and Stripe for payments.",
        results: "Increased sales by 50% and reduced page load times by 40%.",
    },
    {
        title: "Corporate Website",
        summary: "Modern corporate website for a leading finance firm.",
        tags: ["React", "Tailwind", "CMS"],
        slug: "corporate-website",
        client: "FinanceCorp",
        problem: "The client's old website was outdated and difficult to manage.",
        solution: "We designed a modern, responsive website with a headless CMS for easy content updates.",
        results: "Improved brand image and increased lead generation.",
    },
    {
        title: "AI Chatbot",
        summary: "Customer support chatbot powered by LLMs.",
        tags: ["Python", "OpenAI", "FastAPI"],
        slug: "ai-chatbot",
        client: "TechStart",
        problem: "Customer support was overwhelmed with repetitive queries.",
        solution: "We developed an AI-powered chatbot to handle common questions and escalate complex issues.",
        results: "Reduced support ticket volume by 60%.",
    },
];

export async function getProjects() {
    return projects;
}
