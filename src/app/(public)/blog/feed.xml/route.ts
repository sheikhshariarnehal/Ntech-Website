import { getPosts } from '@/features/blog/api/getPosts';

export async function GET() {
    const posts = await getPosts();
    
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ntech Blog</title>
    <link>https://ntech.com/blog</link>
    <description>Expert insights on web development, AI automation, digital products, and technology trends</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://ntech.com/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://ntech.com/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid>https://ntech.com/blog/${post.slug}</guid>
      <author>${post.author}</author>
      ${post.coverImageUrl ? `<enclosure url="${post.coverImageUrl}" type="image/jpeg"/>` : ''}
      ${post.tags ? post.tags.map((tag: string) => `<category>${tag}</category>`).join('\n      ') : ''}
    </item>
    `
        )
        .join('')}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
        },
    });
}
