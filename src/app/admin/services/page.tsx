import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { getServices } from "@/features/services/api/getServices";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Services",
    description: "Manage your services.",
};

export default async function AdminServicesPage() {
    const services = await getServices();

    const columns = [
        {
            header: "Title",
            accessorKey: "title" as const,
        },
        {
            header: "Slug",
            accessorKey: "slug" as const,
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
                <PageHeader title="Services" subtitle="Manage your services." />
                <Button>Add New Service</Button>
            </div>
            <DataTable columns={columns} data={services} />
        </>
    );
}
