"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Mail } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_type: string | null;
  budget_range: string | null;
  message: string;
  status: string;
  source_page: string | null;
  created_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  async function fetchLeads() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setLeads(data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchLeads();
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'in_progress':
        return 'warning';
      case 'closed':
        return 'success';
      case 'spam':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const columns = [
    {
      header: "Name",
      accessor: (row: ContactSubmission) => (
        <div>
          <p className="font-medium">{row.name}</p>
          {row.company && (
            <p className="text-sm text-muted-foreground">{row.company}</p>
          )}
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: (row: ContactSubmission) => (
        <div>
          <p className="text-sm">{row.email}</p>
          {row.phone && (
            <p className="text-sm text-muted-foreground">{row.phone}</p>
          )}
        </div>
      ),
    },
    {
      header: "Service Type",
      accessor: (row: ContactSubmission) => (
        <span className="text-sm">
          {row.service_type || "-"}
        </span>
      ),
    },
    {
      header: "Budget",
      accessor: (row: ContactSubmission) => (
        <span className="text-sm">
          {row.budget_range || "-"}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (row: ContactSubmission) => (
        <Badge variant={getStatusColor(row.status) as any}>
          {row.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      header: "Date",
      accessor: (row: ContactSubmission) => (
        <span className="text-sm text-muted-foreground">
          {new Date(row.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row: ContactSubmission) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={`mailto:${row.email}`} title="Send Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/leads/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setLeadToDelete(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
      className: "w-[140px]",
    },
  ];

  if (loading) {
    return (
      <>
        <PageHeader title="Leads" subtitle="Contact form submissions." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </>
    );
  }

  const stats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    inProgress: leads.filter(l => l.status === 'in_progress').length,
    closed: leads.filter(l => l.status === 'closed').length,
  };

  return (
    <>
      <PageHeader 
        title="Leads & Contact Submissions" 
        subtitle={`${stats.total} total submissions`} 
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Closed</p>
          <p className="text-2xl font-bold text-green-600">{stats.closed}</p>
        </Card>
      </div>

      <Card className="p-6">
        <DataTable
          data={leads}
          columns={columns}
          searchable={true}
          searchPlaceholder="Search leads by name or email..."
        />
      </Card>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (leadToDelete) {
            handleDelete(leadToDelete);
          }
        }}
        title="Delete Lead"
        description="Are you sure you want to delete this lead? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
