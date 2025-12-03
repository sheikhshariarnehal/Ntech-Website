
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server-client";
import {
  DollarSign,
  Package,
  ShoppingCart,
  FileText,
  TrendingUp,
  Users,
  Plus,
  ArrowUpRight,
  Activity,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Overview of your business.",
};

async function getDashboardStats() {
  const supabase = await createServerClient();

  // Get total revenue from paid orders
  const { data: paidOrders } = await supabase
    .from('orders')
    .select('total_amount, created_at')
    .eq('status', 'paid')
    .returns<any[]>();

  const totalRevenue = paidOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  // Calculate revenue from last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthRevenue = paidOrders?.filter(order =>
    new Date(order.created_at) >= lastMonth
  ).reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

  // Get total orders count
  const { count: ordersCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  // Get active products count
  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  // Get published posts count
  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true);

  // Get total customers
  const { count: customersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'customer');

  // Get recent orders with customer info
  const { data: recentOrders } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      total_amount,
      created_at,
      customer:profiles!orders_user_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  return {
    totalRevenue,
    lastMonthRevenue,
    ordersCount: ordersCount || 0,
    productsCount: productsCount || 0,
    postsCount: postsCount || 0,
    customersCount: customersCount || 0,
    recentOrders: recentOrders || []
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      description: `+$${stats.lastMonthRevenue.toFixed(2)} this month`,
      icon: DollarSign,
      trend: "+12.5%"
    },
    {
      title: "Total Orders",
      value: stats.ordersCount.toString(),
      description: "All time orders",
      icon: ShoppingCart,
      trend: "+8.2%"
    },
    {
      title: "Active Products",
      value: stats.productsCount.toString(),
      description: "Available for purchase",
      icon: Package,
      trend: "+4.1%"
    },
    {
      title: "Customers",
      value: stats.customersCount.toString(),
      description: "Registered users",
      icon: Users,
      trend: "+15.3%"
    },
  ];

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

  return (
    <div className="space-y-8">
      <AdminPageHeader title="Dashboard" subtitle="Welcome back! Here's an overview of your business." />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="grid gap-2">
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest customer orders from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {stats.recentOrders.map((order: any) => (
                <div key={order.id} className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {order.customer?.full_name || order.customer?.email || 'Unknown Customer'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer?.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    +${Number(order.total_amount).toFixed(2)}
                  </div>
                  <Badge variant={getStatusColor(order.status) as any} className="ml-4">
                    {order.status}
                  </Badge>
                </div>
              ))}
              {stats.recentOrders.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No orders yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks to manage your business.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/products/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/services/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Service
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Blog Post
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Project
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Published Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.postsCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/blog" className="hover:underline">
                Manage Blog
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productsCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/products" className="hover:underline">
                Manage Products
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.customersCount}</div>
            <p className="text-xs text-muted-foreground">
              <Link href="/admin/customers" className="hover:underline">
                View Customers
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
