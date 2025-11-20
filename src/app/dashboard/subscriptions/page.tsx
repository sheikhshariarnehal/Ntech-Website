import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

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
            accessor: "name" as const,
        },
        {
            header: "Status",
            accessor: (row: any) => (
                <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Price",
            accessor: "price" as const,
        },
        {
            header: "Next Billing",
            accessor: "nextBilling" as const,
        },
        {
            header: "Actions",
            accessor: (row: any) => (
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
