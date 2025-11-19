import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { getProducts } from "@/features/products/api/getProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Products",
    description: "Manage your products.",
};

export default async function AdminProductsPage() {
    const products = await getProducts();

    const columns = [
        {
            header: "Title",
            accessorKey: "title" as const,
        },
        {
            header: "Price",
            accessorKey: "price" as const,
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
                <PageHeader title="Products" subtitle="Manage your digital products." />
                <Button>Add New Product</Button>
            </div>
            <DataTable columns={columns} data={products} />
        </>
    );
}
