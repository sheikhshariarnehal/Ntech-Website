import { BlogForm } from "@/features/blog/components/blog-form";

interface EditBlogPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  const { id } = await params;
  return <BlogForm postId={id} />;
}
