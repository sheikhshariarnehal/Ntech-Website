"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";

type Profile = Database['public']['Tables']['profiles']['Row'];

interface CustomerWithOrders extends Profile {
  order_count: number;
  total_spent: number;
  last_order_date: string | null;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerWithOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);

    // Get all customers (users with role='customer')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'customer')
      .order('created_at', { ascending: false });

    if (profilesError || !profiles) {
      setLoading(false);
      return;
    }

    // For each customer, get their order statistics
    const customersWithStats = await Promise.all(
      profiles.map(async (profile) => {
        const { data: orders } = await supabase
          .from('orders')
          .select('total_amount, created_at, status')
          .eq('user_id', profile.id);

        const paidOrders = orders?.filter(o => o.status === 'paid') || [];
        const total_spent = paidOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
        const lastOrder = orders?.[0];

        return {
          ...profile,
          order_count: orders?.length || 0,
          total_spent,
          last_order_date: lastOrder?.created_at || null,
        };
      })
    );

    setCustomers(customersWithStats);
    setLoading(false);
  }

  const columns = [
    {
      header: "Customer",
      accessor: (row: CustomerWithOrders) => (
        <div>
          <p className="font-medium">{row.full_name || "N/A"}</p>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    {
      header: "Phone",
      accessor: (row: CustomerWithOrders) => (
        <span className="text-sm">{row.phone || "-"}</span>
      ),
    },
    {
      header: "Orders",
      accessor: (row: CustomerWithOrders) => (
        <Badge variant="outline">{row.order_count}</Badge>
      ),
    },
    {
      header: "Total Spent",
      accessor: (row: CustomerWithOrders) => (
        <span className="font-medium">${row.total_spent.toFixed(2)}</span>
      ),
    },
    {
      header: "Last Order",
      accessor: (row: CustomerWithOrders) => (
        row.last_order_date ? (
          <span className="text-sm text-muted-foreground">
            {new Date(row.last_order_date).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground">Never</span>
        )
      ),
    },
    {
      header: "Joined",
      accessor: (row: CustomerWithOrders) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: CustomerWithOrders) => (
        <Button variant="ghost" size="sm" asChild>
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
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Customers" subtitle={`${customers.length} registered customers`} />

      <Card className="p-6">
        <DataTable
          data={customers}
          columns={columns}
          searchable={true}
          searchPlaceholder="Search customers by name or email..."
        />
      </Card>
    </>
  );
}
