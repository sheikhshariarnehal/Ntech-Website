"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, Building2, Loader2 } from "lucide-react";
import Link from "next/link";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import Image from "next/image";

type TrustedCompany = Database['public']['Tables']['trusted_companies']['Row'];

export default function TrustedCompaniesPage() {
  const [companies, setCompanies] = useState<TrustedCompany[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<TrustedCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const supabase = createClient();

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    filterCompanies();
  }, [companies, searchQuery]);

  async function fetchCompanies() {
    setLoading(true);
    const { data, error } = await supabase
      .from('trusted_companies')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCompanies(data);
    }
    setLoading(false);
  }

  function filterCompanies() {
    let filtered = [...companies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (company) =>
          company.name.toLowerCase().includes(query)
      );
    }

    setFilteredCompanies(filtered);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('trusted_companies')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchCompanies();
      setDeleteDialogOpen(false);
      setCompanyToDelete(null);
    }
  }

  const columns = [
    {
      header: "Logo",
      accessor: (row: TrustedCompany) => (
        <div className="relative h-10 w-10 overflow-hidden rounded bg-muted">
          {row.logo_url ? (
            <Image 
              src={row.logo_url} 
              alt={row.name} 
              fill 
              className="object-contain p-1" 
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <Building2 className="h-5 w-5" />
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Name",
      accessor: (row: TrustedCompany) => (
        <div className="font-medium">{row.name}</div>
      ),
    },
    {
      header: "Website",
      accessor: (row: TrustedCompany) => (
        row.website_url ? (
          <a href={row.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
            {row.website_url}
          </a>
        ) : <span className="text-muted-foreground text-sm">-</span>
      ),
    },
    {
      header: "Status",
      accessor: (row: TrustedCompany) => (
        <Badge variant={row.is_active ? "default" : "secondary"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row: TrustedCompany) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/trusted-companies/${row.id}`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => {
              setCompanyToDelete(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trusted Companies"
        subtitle="Manage the companies displayed in the 'Trusted by' section."
        className="mb-0"
      />
      <div className="flex justify-end mb-6">
          <Link href="/admin/trusted-companies/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </Link>
      </div>

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredCompanies}
          />
        )}
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Company"
        description="Are you sure you want to delete this company? This action cannot be undone."
        onConfirm={() => companyToDelete && handleDelete(companyToDelete)}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
