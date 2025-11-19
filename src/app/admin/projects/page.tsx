import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { getProjects } from "@/features/projects/api/getProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Projects",
    description: "Manage your projects.",
};

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    const columns = [
        {
            header: "Title",
            accessorKey: "title" as const,
        },
        {
            header: "Client",
            accessorKey: "client" as const,
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
                <PageHeader title="Projects" subtitle="Manage your portfolio projects." />
                <Button>Add New Project</Button>
            </div>
            <DataTable columns={columns} data={projects} />
        </>
    );
}
