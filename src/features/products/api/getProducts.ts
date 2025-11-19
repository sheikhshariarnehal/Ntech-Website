export const products = [
    {
        title: "ChatGPT Pro",
        price: "$20/mo",
        description: "Access to GPT-4, faster response times, and priority access.",
        slug: "chatgpt-pro",
        features: ["GPT-4 Access", "Faster response speed", "Priority access to new features"],
    },
    {
        title: "Gemini Pro",
        price: "$19.99/mo",
        description: "Google's most capable AI model for complex tasks.",
        slug: "gemini-pro",
        features: ["Gemini Ultra 1.0", "2TB Storage", "Advanced reasoning"],
    },
    {
        title: "Canva Pro",
        price: "$12.99/mo",
        description: "Design anything with premium content and tools.",
        slug: "canva-pro",
        features: ["Unlimited premium content", "Brand Kit", "Magic Resize"],
    },
];

export async function getProducts() {
    return products;
}
