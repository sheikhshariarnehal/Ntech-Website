"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BlogTable } from "@/features/blog/components/blog-table";
import { PostWithAuthor } from "@/features/blog/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filter by status
      if (filterStatus === "published" && !post.is_published) return false;
      if (filterStatus === "draft" && post.is_published) return false;

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [posts, searchQuery, filterStatus]);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/blog");
      const data = await response.json();
      
      if (data.posts) {
        setPosts(data.posts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (post: PostWithAuthor) => {
    router.push(`/admin/blog/edit/${post.id}`);
  };

  const handleCreate = () => {
    router.push("/admin/blog/new");
  };

  // Delete post
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      await fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  };

  // Toggle publish status
  const handleTogglePublish = async (post: PostWithAuthor) => {
    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_published: !post.is_published }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post status");
      }

      await fetchPosts();
    } catch (error) {
      console.error("Error toggling publish status:", error);
      alert("Failed to update post status");
    }
  };

  // Calculate stats
  const stats = useMemo(() => {
    const published = posts.filter((p) => p.is_published).length;
    const drafts = posts.length - published;
    return { total: posts.length, published, drafts };
  }, [posts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Blog Posts"
          subtitle="Create and manage your blog content"
        />
        <Button onClick={handleCreate}>Create New Post</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Total Posts</div>
          <div className="text-2xl font-bold">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Published</div>
          <div className="text-2xl font-bold text-green-600">{stats.published}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-medium text-muted-foreground">Drafts</div>
          <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
        </Card>
      </div>

      {/* Filters */}
      {posts.length > 0 && (
        <Card className="p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search posts by title, excerpt, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "published" ? "default" : "outline"}
                onClick={() => setFilterStatus("published")}
                size="sm"
              >
                Published
              </Button>
              <Button
                variant={filterStatus === "draft" ? "default" : "outline"}
                onClick={() => setFilterStatus("draft")}
                size="sm"
              >
                Drafts
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Posts List */}
      {posts.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first blog post.
          </p>
          <Button onClick={handleCreate}>Create Your First Post</Button>
        </Card>
      ) : filteredPosts.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria.
          </p>
        </Card>
      ) : (
        <BlogTable
          posts={filteredPosts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePublish={handleTogglePublish}
        />
      )}
    </>
  );
}
