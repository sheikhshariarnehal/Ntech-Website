"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Eye, 
  Search, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  RefreshCw,
  UserCheck,
  Mail,
  Phone as PhoneIcon
} from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface CustomerWithOrders extends Profile {
  order_count: number;
  total_spent: number;
  last_order_date: string | null;
  email?: string;
  phone?: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerWithOrders[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerWithOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    filterCustomers();
  }, [customers, searchQuery, roleFilter]);

  async function fetchCustomers() {
    setLoading(true);

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError || !profiles) {
      setLoading(false);
      return;
    }

    // For each customer, get their order statistics
    const customersWithStats = await Promise.all(
      profiles.map(async (profile) => {
        const profileData = profile as Database['public']['Tables']['profiles']['Row'];
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount, created_at, status, email')
          .eq('user_id', profileData.id)
          .order('created_at', { ascending: false });

        type OrderData = { total_amount: number; created_at: string; status: string; email: string };
        const ordersList = (orders as OrderData[]) || [];
        const paidOrders = ordersList.filter(o => o.status === 'paid');
        const total_spent = paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        const lastOrder = ordersList[0];

        return {
          ...profileData,
          order_count: ordersList.length,
          total_spent,
          last_order_date: lastOrder?.created_at || null,
          email: lastOrder?.email || '',
          phone: null,
        };
      })
    );

    setCustomers(customersWithStats);
    setLoading(false);
  }

  function filterCustomers() {
    let filtered = [...customers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (customer) =>
          customer.full_name?.toLowerCase().includes(query) ||
          customer.email?.toLowerCase().includes(query) ||
          customer.phone?.toLowerCase().includes(query)
      );
    }

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter((customer) => customer.role === roleFilter);
    }

    setFilteredCustomers(filtered);
  }

  const getStatsData = () => {
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter((c) => c.order_count > 0).length;
    const customerRole = customers.filter((c) => c.role === 'customer').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.total_spent, 0);
    const avgOrderValue = activeCustomers > 0 
      ? totalRevenue / customers.reduce((sum, c) => sum + c.order_count, 0) 
      : 0;

    return { totalCustomers, activeCustomers, customerRole, totalRevenue, avgOrderValue };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Customer",
      accessor: (row: CustomerWithOrders) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-sm">{row.full_name || "No Name"}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {row.email || "No Email"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: (row: CustomerWithOrders) => (
        <div className="text-sm">
          {row.phone ? (
            <p className="flex items-center gap-1 text-muted-foreground">
              <PhoneIcon className="w-3 h-3" />
              {row.phone}
            </p>
          ) : (
            <span className="text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Role",
      accessor: (row: CustomerWithOrders) => (
        <Badge 
          variant={row.role === 'admin' ? 'default' : 'secondary'} 
          className="text-xs capitalize"
        >
          {row.role}
        </Badge>
      ),
    },
    {
      header: "Orders",
      accessor: (row: CustomerWithOrders) => (
        <div className="text-center">
          <Badge variant="outline" className="text-xs">
            {row.order_count}
          </Badge>
        </div>
      ),
    },
    {
      header: "Total Spent",
      accessor: (row: CustomerWithOrders) => (
        <div>
          <p className="font-semibold text-sm">৳{Math.round(row.total_spent).toLocaleString('en-BD')}</p>
        </div>
      ),
    },
    {
      header: "Last Order",
      accessor: (row: CustomerWithOrders) => (
        row.last_order_date ? (
          <div className="text-sm">
            <p>{new Date(row.last_order_date).toLocaleDateString()}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(row.last_order_date).toLocaleTimeString()}
            </p>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">Never</span>
        )
      ),
    },
    {
      header: "Joined",
      accessor: (row: CustomerWithOrders) => (
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
      accessor: (row: CustomerWithOrders) => (
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="h-8 w-8 p-0"
          title="View Customer"
        >
          <Link href={`/admin/customers/${row.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      ),
      className: "w-[80px]",
    },
  ];

  if (loading) {
    return (
      <>
        <PageHeader title="Customers" subtitle="Manage your customer base." />
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading customers...</span>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <PageHeader 
          title="Customers" 
          subtitle={`Manage your customer base. ${customers.length} registered users.`} 
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalCustomers}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
              <h3 className="text-2xl font-bold mt-2">{stats.activeCustomers}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-500" />
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

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
              <h3 className="text-2xl font-bold mt-2">
                ৳{Math.round(stats.avgOrderValue).toLocaleString('en-BD')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-500" />
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
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Role Filter */}
          <div className="w-full lg:w-48">
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </Select>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            onClick={fetchCustomers}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Customers Table */}
      {filteredCustomers.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No customers found</h3>
          <p className="text-muted-foreground">
            {searchQuery || roleFilter !== "all"
              ? "Try adjusting your filters"
              : "Customers will appear here once they register"}
          </p>
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filteredCustomers}
        />
      )}
    </>
  );
}
