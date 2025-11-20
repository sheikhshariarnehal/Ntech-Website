"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

type Service = Database['public']['Tables']['services']['Row'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setServices(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchServices();
    }
  }

  const columns = [
    {
      header: "Name",
      accessor: (row: Service) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-muted-foreground">{row.slug}</p>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: (row: Service) => (
        <p className="text-sm text-muted-foreground max-w-md truncate">
          {row.short_description}
        </p>
      ),
    },
    {
      header: "Starting Price",
      accessor: (row: Service) => (
        row.starting_price ? (
          <span className="font-medium">${row.starting_price}</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      ),
    },
    {
      header: "Status",
      accessor: (row: Service) => (
        <Badge variant={row.is_active ? "success" : "secondary"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Featured",
      accessor: (row: Service) => (
        <Badge variant={row.is_featured ? "default" : "outline"}>
          {row.is_featured ? "Yes" : "No"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Service) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/services/${row.slug}`} target="_blank">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/services/${row.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setServiceToDelete(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
      className: "w-[120px]",
    },
  ];

  if (loading) {
    return (
      <>
        <PageHeader title="Services" subtitle="Manage your service offerings." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Services" subtitle="Manage your service offerings." />
        <Button asChild>
          <Link href="/admin/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      <Card className="p-6">
        <DataTable
          data={services}
          columns={columns}
          searchable={true}
          searchPlaceholder="Search services..."
        />
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (serviceToDelete) {
            handleDelete(serviceToDelete);
          }
        }}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
