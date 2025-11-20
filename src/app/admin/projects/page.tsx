"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { Plus, Search, ExternalLink, Github, Edit, Trash2, Star, Eye, Calendar, TrendingUp } from "lucide-react";
import Link from "next/link";

type Project = Database['public']['Tables']['projects']['Row'];

export default function ProjectsPage() {
    const supabase = createClient();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [featuredFilter, setFeaturedFilter] = useState("all");

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await (supabase as any)
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setProjects(data as Project[]);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const { error } = await (supabase as any)
            .from('projects')
            .delete()
            .eq('id', id);

        if (!error) {
            fetchProjects();
        } else {
            alert("Error deleting project: " + error.message);
        }
    };

    const toggleFeatured = async (project: Project) => {
        const { error } = await (supabase as any)
            .from('projects')
            .update({ is_featured: !project.is_featured })
            .eq('id', project.id);

        if (!error) {
            fetchProjects();
        }
    };

    // Filter projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = 
            project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.client_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.short_description?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = 
            statusFilter === "all" ||
            (statusFilter === "published" && project.published_at) ||
            (statusFilter === "draft" && !project.published_at);

        const matchesFeatured = 
            featuredFilter === "all" ||
            (featuredFilter === "featured" && project.is_featured) ||
            (featuredFilter === "regular" && !project.is_featured);

        return matchesSearch && matchesStatus && matchesFeatured;
    });

    // Calculate stats
    const stats = {
        total: projects.length,
        published: projects.filter(p => p.published_at).length,
        featured: projects.filter(p => p.is_featured).length,
        draft: projects.filter(p => !p.published_at).length,
    };

    if (loading) {
        return (
            <>
                <PageHeader title="Projects" subtitle="Manage your portfolio projects." />
                <Card className="p-8 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <p className="text-muted-foreground">Loading projects...</p>
                    </div>
                </Card>
            </>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <PageHeader title="Projects" subtitle="Manage your portfolio projects." />
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Projects</p>
                            <p className="text-2xl font-bold">{stats.total}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg">
                            <Eye className="h-6 w-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Published</p>
                            <p className="text-2xl font-bold">{stats.published}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-yellow-500/10 rounded-lg">
                            <Star className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Featured</p>
                            <p className="text-2xl font-bold">{stats.featured}</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gray-500/10 rounded-lg">
                            <Calendar className="h-6 w-6 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Drafts</p>
                            <p className="text-2xl font-bold">{stats.draft}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects by title, client, or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border rounded-md bg-background"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                    </select>
                    <select
                        value={featuredFilter}
                        onChange={(e) => setFeaturedFilter(e.target.value)}
                        className="px-4 py-2 border rounded-md bg-background"
                    >
                        <option value="all">All Projects</option>
                        <option value="featured">Featured Only</option>
                        <option value="regular">Regular Only</option>
                    </select>
                </div>
            </Card>

            {/* Projects Grid */}
            {filteredProjects.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== "all" || featuredFilter !== "all" 
                            ? "No projects match your filters." 
                            : "No projects found. Create your first project!"}
                    </p>
                    {!searchQuery && statusFilter === "all" && featuredFilter === "all" && (
                        <Button asChild>
                            <Link href="/admin/projects/new">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Project
                            </Link>
                        </Button>
                    )}
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filteredProjects.map((project) => (
                        <Card key={project.id} className="p-6 hover:shadow-lg transition-all group">
                            <div className="flex gap-4">
                                {/* Thumbnail */}
                                {project.thumbnail_url ? (
                                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={project.thumbnail_url}
                                            alt={project.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 flex-shrink-0 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                                        <TrendingUp className="h-12 w-12 text-muted-foreground/30" />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                                {project.is_featured && (
                                                    <Badge variant="default" className="bg-yellow-500">
                                                        <Star className="h-3 w-3 mr-1" />
                                                        Featured
                                                    </Badge>
                                                )}
                                                {project.published_at ? (
                                                    <Badge variant="default" className="bg-green-500">
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        Published
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="secondary">Draft</Badge>
                                                )}
                                            </div>
                                            {project.client_name && (
                                                <p className="text-sm text-muted-foreground">
                                                    Client: <span className="font-medium">{project.client_name}</span>
                                                </p>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => toggleFeatured(project)}
                                                title={project.is_featured ? "Remove from featured" : "Mark as featured"}
                                            >
                                                <Star className={`h-4 w-4 ${project.is_featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                            </Button>
                                            <Button size="sm" variant="ghost" asChild>
                                                <Link href={`/admin/projects/${project.id}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(project.id)}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {project.short_description}
                                    </p>

                                    {/* Links */}
                                    <div className="flex items-center gap-3 flex-wrap">
                                        {project.live_url && (
                                            <a
                                                href={project.live_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-primary hover:underline flex items-center gap-1"
                                            >
                                                <ExternalLink className="h-3 w-3" />
                                                Live Demo
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                                            >
                                                <Github className="h-3 w-3" />
                                                View Code
                                            </a>
                                        )}
                                        {project.services_used && project.services_used.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                {project.services_used.slice(0, 3).map((service, idx) => (
                                                    <Badge key={idx} variant="outline" className="text-xs">
                                                        {service}
                                                    </Badge>
                                                ))}
                                                {project.services_used.length > 3 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        +{project.services_used.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
}
