import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Overview of your business.",
};

export default function AdminDashboardPage() {
    return (
        <>
            <PageHeader title="Dashboard" subtitle="Overview of your business." />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Total Revenue
                    </div>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <div className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Subscriptions
                    </div>
                    <div className="text-2xl font-bold">+2350</div>
                    <div className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Sales
                    </div>
                    <div className="text-2xl font-bold">+12,234</div>
                    <div className="text-xs text-muted-foreground">
                        +19% from last month
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="text-sm font-medium text-muted-foreground">
                        Active Now
                    </div>
                    <div className="text-2xl font-bold">+573</div>
                    <div className="text-xs text-muted-foreground">
                        +201 since last hour
                    </div>
                </Card>
            </div>
        </>
    );
}
