"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<any>(null);
  const [customer, setCustomer] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [licenses, setLicenses] = useState<any[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchOrderData();
  }, [orderId]);

  async function fetchOrderData() {
    setLoading(true);

    // Get order with items
    const { data: orderData } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          *,
          product:products(name, slug)
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderData) {
      setOrder(orderData);
      setItems(orderData.order_items || []);

      // Get customer info
      const { data: customerData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', orderData.user_id)
        .single();

      setCustomer(customerData);

      // Get licenses/keys if any
      const { data: licenseData } = await supabase
        .from('licenses_or_keys')
        .select('*')
        .eq('order_id', orderId);

      setLicenses(licenseData || []);
    }

    setLoading(false);
  }

  async function updateOrderStatus(newStatus: string) {
    setUpdatingStatus(true);

    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      setOrder({ ...order, status: newStatus });
    } else {
      alert('Error updating status: ' + error.message);
    }

    setUpdatingStatus(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'destructive';
      case 'refunded':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Order Details" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading order data...</p>
        </Card>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <PageHeader title="Order Details" subtitle="Not found" />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Order not found.</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/orders">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader 
          title={`Order #${order.id.substring(0, 8)}`} 
          subtitle={new Date(order.created_at).toLocaleString()} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Order Details */}
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Order Details</h3>
            <Badge variant={getStatusColor(order.status) as any} className="text-sm">
              {order.status}
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Status Management */}
            <div className="flex items-end gap-4 pb-4 border-b">
              <div className="flex-1 space-y-2">
                <Label htmlFor="status">Update Status</Label>
                <Select
                  id="status"
                  value={order.status}
                  onChange={(e) => updateOrderStatus(e.target.value)}
                  disabled={updatingStatus}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </Select>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h4 className="font-semibold mb-3">Items</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.product?.slug}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${Number(item.price_at_purchase).toFixed(2)}</TableCell>
                      <TableCell className="font-medium">
                        ${(Number(item.price_at_purchase) * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">
                      Total Amount:
                    </TableCell>
                    <TableCell className="font-bold text-lg">
                      ${Number(order.total_amount).toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* License Keys */}
            {licenses.length > 0 && (
              <div className="pt-4 border-t">
                <h4 className="font-semibold mb-3">License Keys</h4>
                <div className="space-y-2">
                  {licenses.map((license) => (
                    <Card key={license.id} className="p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-mono text-sm">{license.license_key}</p>
                          <p className="text-xs text-muted-foreground">
                            Issued: {new Date(license.issued_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={license.is_active ? "success" : "secondary"}>
                          {license.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Customer & Payment Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Customer</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customer?.full_name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-sm">{customer?.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customer?.phone || "N/A"}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                <Link href={`/admin/customers/${customer?.id}`}>
                  View Customer Profile
                </Link>
              </Button>
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Payment</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold">${Number(order.total_amount).toFixed(2)}</p>
              </div>
              {order.stripe_payment_intent_id && (
                <div>
                  <p className="text-sm text-muted-foreground">Payment Intent</p>
                  <p className="font-mono text-xs">{order.stripe_payment_intent_id}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-sm">{new Date(order.created_at).toLocaleString()}</p>
              </div>
              {order.updated_at !== order.created_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm">{new Date(order.updated_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
