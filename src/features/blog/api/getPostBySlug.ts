import { posts } from "./getPosts";

export async function getPostBySlug(slug: string) {
    return posts.find((post) => post.slug === slug);
}
