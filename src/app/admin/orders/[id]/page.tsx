"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Clock,
  Package,
  User,
  Mail,
  Calendar,
  CreditCard,
  Receipt
} from "lucide-react";
import Link from "next/link";

type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items?: Array<{
    id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    product: {
      id: string;
      name: string;
      thumbnail_url: string | null;
    } | null;
  }>;
  profiles?: {
    full_name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
};

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const supabase = createClient();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  async function fetchOrder() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles:user_id(full_name, email, phone),
        order_items(
          id,
          quantity,
          unit_price,
          subtotal,
          product:products(id, name, thumbnail_url)
        )
      `)
      .eq('id', orderId)
      .single();

    if (!error && data) {
      setOrder(data as Order);
    } else if (error) {
      alert("Order not found");
      router.push('/admin/orders');
    }
    setLoading(false);
  }

  async function updateOrderStatus(newStatus: string) {
    if (!order) return;
    
    setUpdating(true);
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (!error) {
      await fetchOrder();
    } else {
      alert("Error updating order status: " + error.message);
    }
    setUpdating(false);
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      paid: { variant: "success" as const, icon: CheckCircle, label: "Paid", color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending", color: "text-yellow-600" },
      canceled: { variant: "destructive" as const, icon: XCircle, label: "Canceled", color: "text-red-600" },
      refunded: { variant: "secondary" as const, icon: RefreshCw, label: "Refunded", color: "text-gray-600" },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Order Details" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading order details...</p>
        </Card>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <PageHeader title="Order Not Found" subtitle="This order does not exist." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Order not found</p>
          <Button asChild>
            <Link href="/admin/orders">Back to Orders</Link>
          </Button>
        </Card>
      </>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <PageHeader 
          title={`Order #${order.id.slice(0, 8)}`} 
          subtitle={`Created on ${new Date(order.created_at).toLocaleDateString()}`}
        />
        <Button variant="outline" size="sm" asChild className="flex-shrink-0">
          <Link href="/admin/orders" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Orders</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Items
            </h3>
            
            {order.order_items && order.order_items.length > 0 ? (
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    {item.product?.thumbnail_url ? (
                      <img
                        src={item.product.thumbnail_url}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{item.product?.name || 'Unknown Product'}</p>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity} × ৳{Number(item.unit_price).toLocaleString('en-BD')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">৳{Number(item.subtotal).toLocaleString('en-BD')}</p>
                    </div>
                  </div>
                ))}
                
                {/* Total */}
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold">Total Amount</p>
                  <p className="text-2xl font-bold">৳{Number(order.total_amount).toLocaleString('en-BD')}</p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No items in this order</p>
            )}
          </Card>

          {/* Payment Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Provider</span>
                <span className="font-medium capitalize">{order.payment_provider || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Reference</span>
                <span className="font-mono text-sm">{order.payment_reference || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Currency</span>
                <span className="font-medium uppercase">{order.currency}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <Badge variant={statusConfig.variant} className="text-lg py-2 px-4 gap-2">
                  <StatusIcon className="h-5 w-5" />
                  {statusConfig.label}
                </Badge>
              </div>

              {/* Status Actions */}
              <div className="space-y-2">
                {order.status === 'pending' && (
                  <Button
                    onClick={() => updateOrderStatus('paid')}
                    disabled={updating}
                    className="w-full gap-2"
                    variant="default"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
                
                {order.status === 'paid' && (
                  <Button
                    onClick={() => {
                      if (confirm('Are you sure you want to refund this order?')) {
                        updateOrderStatus('refunded');
                      }
                    }}
                    disabled={updating}
                    className="w-full gap-2"
                    variant="outline"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refund Order
                  </Button>
                )}
                
                {(order.status === 'pending' || order.status === 'paid') && (
                  <Button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this order?')) {
                        updateOrderStatus('canceled');
                      }
                    }}
                    disabled={updating}
                    className="w-full gap-2"
                    variant="destructive"
                  >
                    <XCircle className="h-4 w-4" />
                    Cancel Order
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Customer Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Customer
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{order.profiles?.full_name || 'Guest'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm break-all">{order.email}</p>
                </div>
              </div>

              {order.profiles?.phone && (
                <div className="flex items-start gap-2">
                  <Receipt className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{order.profiles.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Order Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium text-sm">
                  {new Date(order.created_at).toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium text-sm">
                  {new Date(order.updated_at).toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

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
