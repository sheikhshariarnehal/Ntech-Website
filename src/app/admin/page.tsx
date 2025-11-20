import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
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
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

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
    .eq('status', 'paid');

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
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" subtitle="Welcome back! Here's an overview of your business." />
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <span className="text-xs font-medium text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Orders */}
        <Card className="col-span-4 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Recent Orders</h3>
              <p className="text-sm text-muted-foreground">Latest customer orders</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/orders">
                View All
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          <div className="space-y-4">
            {stats.recentOrders.map((order: any) => (
              <div key={order.id} className="flex items-center justify-between pb-4 border-b last:border-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {order.customer?.full_name || order.customer?.email || 'Unknown Customer'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={getStatusColor(order.status) as any}>
                    {order.status}
                  </Badge>
                  <span className="text-sm font-semibold">
                    ${Number(order.total_amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {stats.recentOrders.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No orders yet
              </p>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-3 p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common tasks</p>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Product
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/services/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Service
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/blog/new">
                <Plus className="h-4 w-4 mr-2" />
                Create Blog Post
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects/new">
                <Plus className="h-4 w-4 mr-2" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/orders">
                <ShoppingCart className="h-4 w-4 mr-2" />
                View All Orders
              </Link>
            </Button>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.postsCount}</p>
              <p className="text-sm text-muted-foreground">Published Posts</p>
            </div>
          </div>
          <Button variant="link" className="mt-4 p-0 h-auto" asChild>
            <Link href="/admin/blog">Manage Blog →</Link>
          </Button>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.productsCount}</p>
              <p className="text-sm text-muted-foreground">Active Products</p>
            </div>
          </div>
          <Button variant="link" className="mt-4 p-0 h-auto" asChild>
            <Link href="/admin/products">Manage Products →</Link>
          </Button>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.customersCount}</p>
              <p className="text-sm text-muted-foreground">Total Customers</p>
            </div>
          </div>
          <Button variant="link" className="mt-4 p-0 h-auto" asChild>
            <Link href="/admin/customers">View Customers →</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
