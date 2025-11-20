import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { createServerClient } from "@/lib/supabase/server-client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Orders Management",
    description: "Manage customer orders.",
};

export const revalidate = 0;

async function getOrders() {
    const supabase = await createServerClient();
    
    const { data: orders, error } = await supabase
        .from('orders')
        .select(`
            *,
            user:profiles(full_name),
            order_items(
                id,
                quantity,
                unit_price,
                subtotal,
                product:products(name)
            )
        `)
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Error fetching orders:', error);
        return [];
    }
    
    return orders || [];
}

function getStatusColor(status: string) {
    switch (status) {
        case 'paid':
            return 'bg-green-100 text-green-800';
        case 'pending':
            return 'bg-yellow-100 text-yellow-800';
        case 'canceled':
            return 'bg-red-100 text-red-800';
        case 'refunded':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

export default async function OrdersPage() {
    const orders = await getOrders();
    
    return (
        <>
            <PageHeader title="Orders" subtitle="Manage customer orders and payments." />
            
            <div className="grid gap-4">
                {orders.length === 0 ? (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No orders found.</p>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {orders.map((order) => (
                            <Card key={order.id} className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-lg font-semibold">Order #{order.id.slice(0, 8)}</h3>
                                            <span className={`px-2 py-1 text-xs rounded ${getStatusColor(order.status)}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            <p>
                                                <span className="text-muted-foreground">Customer:</span>{' '}
                                                {order.user ? (order.user as any).full_name : order.email}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Amount:</span>{' '}
                                                <span className="font-medium">${Number(order.total_amount).toFixed(2)} {order.currency.toUpperCase()}</span>
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Date:</span>{' '}
                                                {new Date(order.created_at).toLocaleString()}
                                            </p>
                                            {order.order_items && order.order_items.length > 0 && (
                                                <div className="mt-2">
                                                    <p className="text-muted-foreground mb-1">Items:</p>
                                                    {order.order_items.map((item: any) => (
                                                        <p key={item.id} className="ml-4 text-sm">
                                                            • {item.product?.name} x{item.quantity} - ${Number(item.subtotal).toFixed(2)}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

