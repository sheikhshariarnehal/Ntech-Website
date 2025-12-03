"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Search, Briefcase, TrendingUp, DollarSign, Star } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

type Service = Database['public']['Tables']['services']['Row'];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const supabase = createClient();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchQuery, statusFilter]);

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

  function filterServices() {
    let filtered = [...services];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(query) ||
          service.short_description?.toLowerCase().includes(query) ||
          service.slug.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((service) =>
        statusFilter === "active" ? service.is_active : !service.is_active
      );
    }

    setFilteredServices(filtered);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchServices();
      setDeleteDialogOpen(false);
      setServiceToDelete(null);
    }
  }

  const getStatsData = () => {
    const totalServices = services.length;
    const activeServices = services.filter((s) => s.is_active).length;
    const avgPrice = services.length > 0 
      ? services.reduce((sum, s) => sum + (Number(s.starting_price) || 0), 0) / services.filter(s => s.starting_price).length
      : 0;

    return { totalServices, activeServices, avgPrice };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Service",
      accessor: (row: Service) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          {row.icon ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={row.icon} 
                alt={row.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-primary" />
            </div>
          )}
          <div>
            <p className="font-medium text-sm">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: (row: Service) => (
        <p className="text-sm text-muted-foreground max-w-xs truncate">
          {row.short_description}
        </p>
      ),
    },
    {
      header: "Starting Price",
      accessor: (row: Service) => (
        row.starting_price ? (
          <div>
            <p className="font-semibold text-sm">৳{Number(row.starting_price).toLocaleString('en-BD')}</p>
          </div>
        ) : (
          <Badge variant="secondary" className="text-xs">Custom Quote</Badge>
        )
      ),
    },
    {
      header: "Status",
      accessor: (row: Service) => (
        <Badge variant={row.is_active ? "success" : "secondary"} className="text-xs w-fit">
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Service) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href={`/services/${row.slug}`} target="_blank" title="View Service">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href={`/admin/services/${row.id}/edit`} title="Edit Service">
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Delete Service"
            onClick={() => {
              setServiceToDelete(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
      className: "w-[100px]",
    },
  ];

  if (loading) {
    return (
      <>
        <AdminPageHeader title="Services" subtitle="Manage your service offerings." />
        
        {/* Stats Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-muted rounded w-3/4"></div>
            </Card>
          ))}
        </div>

        {/* Table Skeleton */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded w-full"></div>
            <div className="h-64 bg-muted rounded w-full"></div>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <AdminPageHeader 
          title="Services" 
          subtitle={`Manage your service offerings. ${services.length} total services.`} 
        />
        <Button asChild className="sm:w-auto w-full">
          <Link href="/admin/services/new" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Services</p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalServices}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Services</p>
              <h3 className="text-2xl font-bold mt-2">{stats.activeServices}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg. Starting Price</p>
              <h3 className="text-2xl font-bold mt-2">
                ৳{isNaN(stats.avgPrice) ? '0' : Math.round(stats.avgPrice).toLocaleString('en-BD')}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters Section */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services by name, description, or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 lg:w-auto w-full">
            <div className="sm:w-40 w-full">
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>

            {(searchQuery || statusFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                }}
                className="sm:w-auto w-full"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredServices.length} of {services.length} services
        </div>
      </Card>

      {/* Services Table */}
      <Card className="p-6">
        {filteredServices.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {services.length === 0
                ? "Get started by creating your first service."
                : "Try adjusting your filters or search query."}
            </p>
            {services.length === 0 && (
              <Button asChild>
                <Link href="/admin/services/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Service
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <DataTable
            data={filteredServices}
            columns={columns}
            searchable={false}
          />
        )}
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
