"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Plus, Edit, Trash2, Eye, Search, Filter, Package, TrendingUp, DollarSign, Archive } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [billingFilter, setBillingFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, statusFilter, billingFilter]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  function filterProducts() {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.short_description?.toLowerCase().includes(query) ||
          product.slug.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((product) =>
        statusFilter === "active" ? product.is_active : !product.is_active
      );
    }

    // Billing filter
    if (billingFilter !== "all") {
      filtered = filtered.filter((product) => product.billing_interval === billingFilter);
    }

    setFilteredProducts(filtered);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchProducts();
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  }

  const getStatsData = () => {
    const totalProducts = products.length;
    const activeProducts = products.filter((p) => p.is_active).length;
    const totalValue = products.reduce((sum, p) => sum + Number(p.price), 0);
    const lowStock = products.filter((p) => p.stock !== null && p.stock < 10).length;

    return { totalProducts, activeProducts, totalValue, lowStock };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Product",
      accessor: (row: Product) => (
        <div className="flex items-center gap-3 min-w-[200px]">
          {row.thumbnail_url ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img 
                src={row.thumbnail_url} 
                alt={row.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-muted-foreground" />
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
      accessor: (row: Product) => (
        <p className="text-sm text-muted-foreground max-w-xs truncate">
          {row.short_description}
        </p>
      ),
    },
    {
      header: "Price",
      accessor: (row: Product) => (
        <div>
          <p className="font-semibold text-sm">৳{Number(row.price).toLocaleString('en-BD')}</p>
          <p className="text-xs text-muted-foreground capitalize">
            {row.billing_interval.replace('_', ' ')}
          </p>
        </div>
      ),
    },
    {
      header: "Stock",
      accessor: (row: Product) => (
        row.stock !== null ? (
          <div className="flex items-center gap-2">
            <span className={`font-medium text-sm ${row.stock < 10 ? 'text-yellow-500' : ''}`}>
              {row.stock}
            </span>
            {row.stock < 10 && row.stock > 0 && (
              <Badge variant="warning" className="text-xs">Low</Badge>
            )}
            {row.stock === 0 && (
              <Badge variant="destructive" className="text-xs">Out</Badge>
            )}
          </div>
        ) : (
          <Badge variant="secondary" className="text-xs">Unlimited</Badge>
        )
      ),
    },
    {
      header: "Status",
      accessor: (row: Product) => (
        <div className="flex flex-col gap-1">
          <Badge variant={row.is_active ? "success" : "secondary"} className="text-xs w-fit">
            {row.is_active ? "Active" : "Inactive"}
          </Badge>
          {row.is_featured && (
            <Badge variant="default" className="text-xs w-fit">Featured</Badge>
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: (row: Product) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href={`/products/${row.slug}`} target="_blank" title="View Product">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
            <Link href={`/admin/products/${row.id}/edit`} title="Edit Product">
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Delete Product"
            onClick={() => {
              setProductToDelete(row.id);
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
        <PageHeader title="Products" subtitle="Manage your digital products and subscriptions." />
        
        {/* Stats Skeleton */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
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
        <PageHeader 
          title="Products" 
          subtitle={`Manage your digital products and subscriptions. ${products.length} total products.`} 
        />
        <Button asChild className="sm:w-auto w-full">
          <Link href="/admin/products/new" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Products</p>
              <h3 className="text-2xl font-bold mt-2">{stats.totalProducts}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Products</p>
              <h3 className="text-2xl font-bold mt-2">{stats.activeProducts}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <h3 className="text-2xl font-bold mt-2">৳{Math.round(stats.totalValue).toLocaleString('en-BD')}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
              <h3 className="text-2xl font-bold mt-2">{stats.lowStock}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Archive className="h-6 w-6 text-yellow-500" />
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
              placeholder="Search products by name, description, or slug..."
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

            <div className="sm:w-40 w-full">
              <Select
                value={billingFilter}
                onChange={(e) => setBillingFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="one_time">One Time</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
                <option value="lifetime">Lifetime</option>
              </Select>
            </div>

            {(searchQuery || statusFilter !== "all" || billingFilter !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setBillingFilter("all");
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
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </Card>

      {/* Products Table */}
      <Card className="p-6">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {products.length === 0
                ? "Get started by creating your first product."
                : "Try adjusting your filters or search query."}
            </p>
            {products.length === 0 && (
              <Button asChild>
                <Link href="/admin/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Product
                </Link>
              </Button>
            )}
          </div>
        ) : (
          <DataTable
            data={filteredProducts}
            columns={columns}
            searchable={false}
          />
        )}
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (productToDelete) {
            handleDelete(productToDelete);
          }
        }}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
