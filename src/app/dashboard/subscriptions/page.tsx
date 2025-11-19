import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Subscriptions",
    description: "Manage your subscriptions.",
};

const subscriptions = [
    {
        name: "ChatGPT Pro",
        status: "Active",
        price: "$20.00/mo",
        nextBilling: "2023-12-20",
    },
];

export default function SubscriptionsPage() {
    const columns = [
        {
            header: "Name",
            accessorKey: "name" as const,
        },
        {
            header: "Status",
            accessorKey: "status" as const,
            cell: (row: any) => (
                <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Price",
            accessorKey: "price" as const,
        },
        {
            header: "Next Billing",
            accessorKey: "nextBilling" as const,
        },
        {
            header: "Actions",
            accessorKey: "name" as const,
            cell: (row: any) => (
                <Button variant="outline" size="sm">
                    Manage
                </Button>
            ),
        },
    ];

    return (
        <>
            <PageHeader
                title="Subscriptions"
                subtitle="Manage your active subscriptions."
            />
            <DataTable columns={columns} data={subscriptions} />
        </>
    );
}
