import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable } from "@/components/shared/data-table";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "My Orders",
    description: "View your order history.",
};

const orders = [
    {
        id: "ORD-001",
        date: "2023-11-20",
        product: "ChatGPT Pro",
        amount: "$20.00",
        status: "Completed",
    },
    {
        id: "ORD-002",
        date: "2023-10-15",
        product: "Web Development Consultation",
        amount: "$150.00",
        status: "Completed",
    },
];

export default function OrdersPage() {
    const columns = [
        {
            header: "Order ID",
            accessor: "id" as const,
        },
        {
            header: "Date",
            accessor: "date" as const,
        },
        {
            header: "Product",
            accessor: "product" as const,
        },
        {
            header: "Amount",
            accessor: "amount" as const,
        },
        {
            header: "Status",
            accessor: "status" as const,
        },
        {
            header: "Actions",
            accessor: (row: any) => (
                <Button variant="outline" size="sm">
                    Invoice
                </Button>
            ),
        },
    ];

    return (
        <>
            <PageHeader title="Orders" subtitle="View and manage your orders." />
            <DataTable columns={columns} data={orders} />
        </>
    );
}
