"use client";

import { useState, useEffect } from "react";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { 
  Eye, 
  Trash2, 
  Mail, 
  Search,
  RefreshCw,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Briefcase,
  DollarSign,
  FileText,
  Phone as PhoneIcon
} from "lucide-react";
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
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter, serviceFilter]);

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

  function filterLeads() {
    let filtered = [...leads];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          lead.company?.toLowerCase().includes(query) ||
          lead.phone?.toLowerCase().includes(query) ||
          lead.message.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    // Service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter((lead) => lead.service_type === serviceFilter);
    }

    setFilteredLeads(filtered);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchLeads();
      setDeleteDialogOpen(false);
      setLeadToDelete(null);
    }
  }

  async function updateLeadStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchLeads();
    }
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      new: { variant: 'default' as const, icon: AlertCircle, label: 'New', color: 'text-blue-600' },
      in_progress: { variant: 'secondary' as const, icon: Clock, label: 'In Progress', color: 'text-yellow-600' },
      closed: { variant: 'success' as const, icon: CheckCircle, label: 'Closed', color: 'text-green-600' },
      spam: { variant: 'destructive' as const, icon: XCircle, label: 'Spam', color: 'text-red-600' },
    };
    return configs[status as keyof typeof configs] || configs.new;
  };

  const getStatsData = () => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'new').length;
    const inProgress = leads.filter(l => l.status === 'in_progress').length;
    const closed = leads.filter(l => l.status === 'closed').length;
    const spam = leads.filter(l => l.status === 'spam').length;

    // Get unique service types
    const services = new Set(leads.map(l => l.service_type).filter(Boolean));
    const uniqueServices = services.size;

    return { total, newLeads, inProgress, closed, spam, uniqueServices };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Contact",
      accessor: (row: ContactSubmission) => (
        <div className="min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{row.name}</p>
              {row.company && (
                <p className="text-xs text-muted-foreground">{row.company}</p>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Info",
      accessor: (row: ContactSubmission) => (
        <div className="text-sm">
          <p className="flex items-center gap-1 mb-1">
            <Mail className="w-3 h-3 text-muted-foreground" />
            <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
          </p>
          {row.phone && (
            <p className="flex items-center gap-1 text-muted-foreground">
              <PhoneIcon className="w-3 h-3" />
              {row.phone}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Service",
      accessor: (row: ContactSubmission) => (
        <div>
          {row.service_type ? (
            <Badge variant="outline" className="text-xs capitalize">
              <Briefcase className="w-3 h-3 mr-1" />
              {row.service_type}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Budget",
      accessor: (row: ContactSubmission) => (
        <div>
          {row.budget_range ? (
            <Badge variant="secondary" className="text-xs">
              <DollarSign className="w-3 h-3 mr-1" />
              {row.budget_range}
            </Badge>
          ) : (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Message",
      accessor: (row: ContactSubmission) => (
        <div className="max-w-xs">
          <p className="text-sm text-muted-foreground truncate" title={row.message}>
            {row.message}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (row: ContactSubmission) => {
        const config = getStatusConfig(row.status);
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
      accessor: (row: ContactSubmission) => (
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
      accessor: (row: ContactSubmission) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-8 w-8 p-0"
            title="Send Email"
          >
            <a href={`mailto:${row.email}`}>
              <Mail className="h-4 w-4" />
            </a>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-8 w-8 p-0"
            title="View Details"
          >
            <Link href={`/admin/leads/${row.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          {row.status === 'new' && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-green-600"
              title="Mark In Progress"
              onClick={() => updateLeadStatus(row.id, 'in_progress')}
            >
              <Clock className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600"
            title="Delete"
            onClick={() => {
              setLeadToDelete(row.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
      className: "w-[140px]",
    },
  ];

  if (loading) {
    return (
      <>
        <AdminPageHeader title="Leads" subtitle="Manage contact form submissions." />
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading leads...</span>
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
          title="Leads & Contact Submissions" 
          subtitle={`Manage all contact form submissions. ${leads.length} total leads.`} 
        />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
              <h3 className="text-2xl font-bold mt-2">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">New Leads</p>
              <h3 className="text-2xl font-bold mt-2">{stats.newLeads}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Progress</p>
              <h3 className="text-2xl font-bold mt-2">{stats.inProgress}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Closed</p>
              <h3 className="text-2xl font-bold mt-2">{stats.closed}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Services</p>
              <h3 className="text-2xl font-bold mt-2">{stats.uniqueServices}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-purple-500" />
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
              placeholder="Search by name, email, company, or message..."
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
              <option value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
              <option value="spam">Spam</option>
            </Select>
          </div>

          {/* Service Filter */}
          <div className="w-full lg:w-48">
            <Select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <option value="all">All Services</option>
              {Array.from(new Set(leads.map(l => l.service_type).filter(Boolean))).map(service => (
                <option key={service} value={service!}>{service}</option>
              ))}
            </Select>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            onClick={fetchLeads}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No leads found</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "all" || serviceFilter !== "all"
              ? "Try adjusting your filters"
              : "Contact submissions will appear here"}
          </p>
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filteredLeads}
        />
      )}

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
