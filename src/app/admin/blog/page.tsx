import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { getPosts } from "@/features/blog/api/getPosts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Blog",
    description: "Manage blog posts.",
};

export default async function AdminBlogPage() {
    const posts = await getPosts();

    const columns = [
        {
            header: "Title",
            accessorKey: "title" as const,
        },
        {
            header: "Author",
            accessorKey: "author" as const,
        },
        {
            header: "Published",
            accessorKey: "publishedAt" as const,
        },
        {
            header: "Actions",
            accessorKey: "slug" as const,
            cell: (row: any) => (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between">
                <PageHeader title="Blog Posts" subtitle="Manage your blog content." />
                <Button>Add New Post</Button>
            </div>
            <DataTable columns={columns} data={posts} />
        </>
    );
}
