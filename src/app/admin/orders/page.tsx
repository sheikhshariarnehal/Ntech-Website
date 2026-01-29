"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { 
  ShoppingCart, 
  DollarSign, 
  Search, 
  Eye, 
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Package
} from "lucide-react";
import Link from "next/link";

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
  profiles?: {
    full_name: string | null;
    email: string | null;
  } | null;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchQuery, statusFilter]);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles:user_id(full_name, email),
        order_items(
          id,
          quantity,
          unit_price,
          subtotal,
          product:products(name)
        )
      `)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setLoading(false);
  }

  function filterOrders() {
    let filtered = [...orders];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          (order.profiles?.full_name?.toLowerCase() || '').includes(query) ||
          order.payment_reference?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }

  async function updateOrderStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchOrders();
    } else {
      alert("Error updating order status: " + error.message);
    }
  }

  const getStatsData = () => {
    const totalOrders = orders.length;
    const paidOrders = orders.filter((o) => o.status === 'paid').length;
    const pendingOrders = orders.filter((o) => o.status === 'pending').length;
    const totalRevenue = orders
      .filter((o) => o.status === 'paid')
      .reduce((sum, o) => sum + Number(o.total_amount), 0);

    return { totalOrders, paidOrders, pendingOrders, totalRevenue };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Order ID",
      accessor: (row: Order) => (
        <div className="font-mono text-sm">
          #{row.id.slice(0, 8)}
        </div>
      ),
    },
    {
      header: "Customer",
      accessor: (row: Order) => (
        <div>
          <p className="font-medium text-sm">
            {row.profiles?.full_name || 'Guest'}
          </p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Items",
      accessor: (row: Order) => (
        <div className="text-sm">
          {row.order_items && row.order_items.length > 0 ? (
            <div className="space-y-1">
              {row.order_items.map((item) => (
                <p key={item.id} className="text-xs">
                  {item.product?.name || 'Unknown'} x{item.quantity}
                </p>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">No items</span>
          )}
        </div>
      ),
    },
    {
      header: "Amount",
      accessor: (row: Order) => (
        <div>
          <p className="font-semibold text-sm">৳{Number(row.total_amount).toLocaleString('en-BD')}</p>
          <p className="text-xs text-muted-foreground uppercase">{row.currency}</p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: Order) => {
        const statusConfig = {
          paid: { variant: "success" as const, icon: CheckCircle, label: "Paid" },
          pending: { variant: "secondary" as const, icon: Clock, label: "Pending" },
          canceled: { variant: "destructive" as const, icon: XCircle, label: "Canceled" },
          refunded: { variant: "secondary" as const, icon: RefreshCw, label: "Refunded" },
        };
        const config = statusConfig[row.status as keyof typeof statusConfig] || statusConfig.pending;
        const Icon = config.icon;
        
        return (
          <Badge variant={config.variant} className="text-xs gap-1">
            <Icon className="h-3 w-3" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      header: "Date",
      accessor: (row: Order) => (
        <div className="text-sm">
          <p>{new Date(row.created_at).toLocaleDateString()}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(row.created_at).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Order) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-8 w-8 p-0"
            title="View Details"
          >
            <Link href={`/admin/orders/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {row.status === 'pending' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600"
              title="Mark as Paid"
              onClick={() => updateOrderStatus(row.id, 'paid')}
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
          {(row.status === 'pending' || row.status === 'paid') && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-red-600"
              title="Cancel Order"
              onClick={() => {
                if (confirm('Are you sure you want to cancel this order?')) {
                  updateOrderStatus(row.id, 'canceled');
                }
              }}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
      className: "w-[120px]",
    },
  ];

  if (loading) {
    return (
      <>
        <AdminPageHeader title="Orders" subtitle="Manage customer orders and payments." />
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading orders...</span>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <AdminPageHeader 
          title="Orders" 
          subtitle={`Manage customer orders and payments. ${orders.length} total orders.`} 
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Paid Orders</p>
              <h3 className="text-2xl font-bold mt-2">{stats.paidOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Orders</p>
              <h3 className="text-2xl font-bold mt-2">{stats.pendingOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-2">
                ৳{Math.round(stats.totalRevenue).toLocaleString('en-BD')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID, email, customer name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="canceled">Canceled</option>
              <option value="refunded">Refunded</option>
            </Select>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            onClick={fetchOrders}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Orders will appear here once customers make purchases"}
          </p>
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filteredOrders}
        />
      )}
    </>
  );
}
