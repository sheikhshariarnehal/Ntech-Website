"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  ShoppingCart,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye
} from "lucide-react";
import Link from "next/link";

type Profile = Database['public']['Tables']['profiles']['Row'] & {
  email?: string;
  phone?: string;
};
type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items?: Array<{
    id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    product: {
      name: string;
    } | null;
  }>;
};

export default function CustomerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const customerId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  async function fetchCustomerData() {
    setLoading(true);

    // Get customer profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', customerId)
      .single();

    if (profileError || !profile) {
      alert("Customer not found");
      router.push('/admin/customers');
      return;
    }

    // Get customer orders with items
    const { data: orderData } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(
          id,
          quantity,
          unit_price,
          subtotal,
          product:products(name)
        )
      `)
      .eq('user_id', customerId)
      .order('created_at', { ascending: false });

    // Get email from the first order if available
    const orders = (orderData as Order[]) || [];
    const userEmail = orders.length > 0 ? orders[0].email : '';

    // Create customer object with email
    const profileData = profile as Database['public']['Tables']['profiles']['Row'];
    const customerWithEmail: Profile = {
      id: profileData.id,
      created_at: profileData.created_at,
      updated_at: profileData.updated_at,
      full_name: profileData.full_name,
      role: profileData.role,
      email: userEmail,
      phone: null
    };

    setCustomer(customerWithEmail);
    setOrders(orders);
    setLoading(false);
  }

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const paidOrders = orders.filter(o => o.status === 'paid').length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalSpent = orders
      .filter(o => o.status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount), 0);
    const avgOrderValue = paidOrders > 0 ? totalSpent / paidOrders : 0;

    return { totalOrders, paidOrders, pendingOrders, totalSpent, avgOrderValue };
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      paid: { variant: "success" as const, icon: CheckCircle, label: "Paid" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
      canceled: { variant: "destructive" as const, icon: XCircle, label: "Canceled" },
      refunded: { variant: "secondary" as const, icon: RefreshCw, label: "Refunded" },
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  if (loading) {
    return (
      <>
        <AdminPageHeader title="Customer Details" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-2" />
          <p className="text-muted-foreground">Loading customer data...</p>
        </Card>
      </>
    );
  }

  if (!customer) {
    return (
      <>
        <AdminPageHeader title="Customer Not Found" subtitle="This customer does not exist." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">Customer not found</p>
          <Button asChild>
            <Link href="/admin/customers">Back to Customers</Link>
          </Button>
        </Card>
      </>
    );
  }

  const stats = getOrderStats();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <AdminPageHeader 
          title={customer.full_name || 'Customer Details'} 
          subtitle={customer.email || ''}
        />
        <Button variant="outline" size="sm" asChild className="flex-shrink-0">
          <Link href="/admin/customers" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back to Customers</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Order Stats & History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                  <p className="text-xl font-bold">{stats.totalOrders}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Paid</p>
                  <p className="text-xl font-bold">{stats.paidOrders}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Spent</p>
                  <p className="text-lg font-bold">৳{Math.round(stats.totalSpent).toLocaleString('en-BD')}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Package className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Avg Order</p>
                  <p className="text-lg font-bold">৳{Math.round(stats.avgOrderValue).toLocaleString('en-BD')}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Order History */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order History
            </h3>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const statusConfig = getStatusConfig(order.status);
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-mono text-sm font-medium">#{order.id.slice(0, 8)}</p>
                            <Badge variant={statusConfig.variant} className="text-xs gap-1">
                              <StatusIcon className="h-3 w-3" />
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">৳{Number(order.total_amount).toLocaleString('en-BD')}</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            asChild
                            className="h-7 text-xs gap-1 mt-1"
                          >
                            <Link href={`/admin/orders/${order.id}`}>
                              <Eye className="h-3 w-3" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                      
                      {order.order_items && order.order_items.length > 0 && (
                        <div className="border-t pt-3 space-y-1">
                          {order.order_items.map((item) => (
                            <p key={item.id} className="text-xs text-muted-foreground">
                              • {item.product?.name || 'Unknown'} × {item.quantity}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column - Customer Info */}
        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{customer.full_name || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm break-all">{customer.email || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{customer.phone || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <Badge variant={customer.role === 'admin' ? 'default' : 'secondary'} className="capitalize">
                    {customer.role}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Account Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Account Timeline
            </h3>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium text-sm">
                  {new Date(customer.created_at).toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Last Updated</p>
                <p className="font-medium text-sm">
                  {new Date(customer.updated_at).toLocaleString()}
                </p>
              </div>

              {orders.length > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Order</p>
                  <p className="font-medium text-sm">
                    {new Date(orders[0].created_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending Orders</span>
                <Badge variant="secondary">{stats.pendingOrders}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completed Orders</span>
                <Badge variant="success">{stats.paidOrders}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Customer Since</span>
                <span className="text-sm font-medium">
                  {Math.floor((Date.now() - new Date(customer.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
