export const posts = [
    {
        title: "The Future of AI in Business",
        excerpt: "How artificial intelligence is transforming industries and creating new opportunities.",
        content: "Artificial intelligence is no longer just a buzzword. It's a powerful tool that is reshaping the way businesses operate. From automating routine tasks to providing deep insights into customer behavior, AI is driving efficiency and innovation across all sectors...",
        slug: "future-of-ai-in-business",
        publishedAt: "2023-10-25",
        author: "John Doe",
    },
    {
        title: "Why You Need a Custom Website",
        excerpt: "The benefits of having a tailored web presence for your brand.",
        content: "In today's digital age, your website is often the first point of contact for potential customers. While templates can be a good starting point, a custom website offers the flexibility and scalability you need to stand out from the competition...",
        slug: "why-you-need-custom-website",
        publishedAt: "2023-11-02",
        author: "Jane Smith",
    },
    {
        title: "Top 5 Tools for Remote Teams",
        excerpt: "Essential software to keep your distributed team productive and connected.",
        content: "Remote work is here to stay. To ensure your team remains productive and connected, you need the right set of tools. Here are our top 5 recommendations for communication, project management, and collaboration...",
        slug: "top-5-tools-remote-teams",
        publishedAt: "2023-11-10",
        author: "Mike Johnson",
    },
];

export async function getPosts() {
    return posts;
}
