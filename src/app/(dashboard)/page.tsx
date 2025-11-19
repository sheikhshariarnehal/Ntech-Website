import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Manage your account and services.",
};

export default function DashboardPage() {
    return (
        <>
            <PageHeader
                title="Dashboard"
                subtitle="Welcome back! Here's an overview of your account."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Active Services
                    </div>
                    <div className="text-2xl font-bold">2</div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Pending Orders
                    </div>
                    <div className="text-2xl font-bold">1</div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Total Spend
                    </div>
                    <div className="text-2xl font-bold">$1,250.00</div>
                </Card>
            </div>
        </>
    );
}
