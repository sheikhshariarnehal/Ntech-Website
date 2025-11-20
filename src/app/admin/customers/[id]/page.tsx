"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  async function fetchCustomerData() {
    setLoading(true);

    // Get customer profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', customerId)
      .single();

    // Get customer orders
    const { data: orderData } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    setCustomer(profile);
    setOrders(orderData || []);
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Customer Details" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading customer data...</p>
        </Card>
      </>
    );
  }

  if (!customer) {
    return (
      <>
        <PageHeader title="Customer Details" subtitle="Not found" />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Customer not found.</p>
        </Card>
      </>
    );
  }

  const totalSpent = orders
    .filter(o => o.status === 'paid')
    .reduce((sum, o) => sum + Number(o.total_amount), 0);

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/customers">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Customer Details" subtitle={customer.email} />
      </div>

      {/* Customer Information */}
      <Card className="p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="font-medium">{customer.full_name || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{customer.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium">
              {new Date(customer.created_at).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="font-medium">{orders.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="font-medium">${totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </Card>

      {/* Order History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No orders yet
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">
                    {order.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.order_items?.length || 0} items
                  </TableCell>
                  <TableCell className="font-medium">
                    ${Number(order.total_amount).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(order.status) as any}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </>
  );
}
