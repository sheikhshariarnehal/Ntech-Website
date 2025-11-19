import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Settings",
    description: "Manage site settings.",
};

export default function AdminSettingsPage() {
    return (
        <>
            <PageHeader title="Settings" subtitle="Manage your site settings." />
            <div className="grid gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-medium mb-4">General Settings</h3>
                    <div className="grid gap-4 max-w-xl">
                        <div className="grid gap-2">
                            <label htmlFor="siteName" className="text-sm font-medium">
                                Site Name
                            </label>
                            <Input id="siteName" defaultValue="Ntech" />
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="supportEmail" className="text-sm font-medium">
                                Support Email
                            </label>
                            <Input id="supportEmail" defaultValue="support@ntech.com" />
                        </div>
                        <Button className="w-fit">Save Changes</Button>
                    </div>
                </Card>
            </div>
        </>
    );
}
