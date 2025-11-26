"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  Trash2, 
  Edit,
  Search,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
  Plus,
  Mail,
  Linkedin,
  Twitter,
  Github
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  github_url: string | null;
  image_url: string | null;
  order_position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const supabase = createClient();

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [teamMembers, searchQuery, statusFilter]);

  async function fetchTeamMembers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('order_position', { ascending: true });

    if (!error && data) {
      setTeamMembers(data);
    }
    setLoading(false);
  }

  function filterMembers() {
    let filtered = [...teamMembers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(query) ||
          member.designation.toLowerCase().includes(query) ||
          member.email?.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter === "active") {
      filtered = filtered.filter((member) => member.is_active);
    } else if (statusFilter === "inactive") {
      filtered = filtered.filter((member) => !member.is_active);
    }

    setFilteredMembers(filtered);
  }

  async function handleDelete(id: string) {
    const { error } = await supabase
      .from('team')
      .delete()
      .eq('id', id);

    if (!error) {
      fetchTeamMembers();
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  }

  async function toggleActive(id: string, currentStatus: boolean) {
    const { error } = await supabase
      .from('team')
      .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchTeamMembers();
    }
  }

  const getStatsData = () => {
    const total = teamMembers.length;
    const active = teamMembers.filter(m => m.is_active).length;
    const inactive = teamMembers.filter(m => !m.is_active).length;
    const withSocial = teamMembers.filter(m => m.linkedin_url || m.twitter_url || m.github_url).length;

    return { total, active, inactive, withSocial };
  };

  const stats = getStatsData();

  const columns = [
    {
      header: "Member",
      accessor: (row: TeamMember) => (
        <div className="min-w-[200px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {row.image_url ? (
                <img src={row.image_url} alt={row.name} className="w-full h-full object-cover" />
              ) : (
                <Users className="w-5 h-5 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium text-sm">{row.name}</p>
              <p className="text-xs text-muted-foreground">{row.designation}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Contact",
      accessor: (row: TeamMember) => (
        <div className="text-sm">
          {row.email && (
            <p className="flex items-center gap-1 mb-1">
              <Mail className="w-3 h-3 text-muted-foreground" />
              <a href={`mailto:${row.email}`} className="hover:underline">{row.email}</a>
            </p>
          )}
          {row.phone && (
            <p className="text-muted-foreground">{row.phone}</p>
          )}
        </div>
      ),
    },
    {
      header: "Social Links",
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-2">
          {row.linkedin_url && (
            <a href={row.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {row.twitter_url && (
            <a href={row.twitter_url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-600">
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {row.github_url && (
            <a href={row.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900">
              <Github className="w-4 h-4" />
            </a>
          )}
          {!row.linkedin_url && !row.twitter_url && !row.github_url && (
            <span className="text-sm text-muted-foreground">-</span>
          )}
        </div>
      ),
    },
    {
      header: "Position",
      accessor: (row: TeamMember) => (
        <Badge variant="outline" className="text-xs">
          #{row.order_position}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessor: (row: TeamMember) => (
        <Badge variant={row.is_active ? "success" : "secondary"} className="text-xs gap-1">
          {row.is_active ? (
            <>
              <UserCheck className="h-3 w-3" />
              Active
            </>
          ) : (
            <>
              <UserX className="h-3 w-3" />
              Inactive
            </>
          )}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: (row: TeamMember) => (
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
            className="h-8 w-8 p-0"
            title="Edit Member"
          >
            <Link href={`/admin/team/${row.id}/edit`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title={row.is_active ? "Deactivate" : "Activate"}
            onClick={() => toggleActive(row.id, row.is_active)}
          >
            {row.is_active ? (
              <UserX className="h-4 w-4 text-yellow-600" />
            ) : (
              <UserCheck className="h-4 w-4 text-green-600" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600"
            title="Delete"
            onClick={() => {
              setMemberToDelete(row.id);
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
        <PageHeader title="Team Members" subtitle="Manage your team members." />
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading team members...</span>
          </div>
        </Card>
      </>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <PageHeader 
            title="Team Members" 
            subtitle={`Manage your team members. ${teamMembers.length} total members.`} 
          />
          <Button asChild className="gap-2 w-full sm:w-auto">
            <Link href="/admin/team/new">
              <Plus className="h-4 w-4" />
              Add Member
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Members</p>
              <h3 className="text-2xl font-bold mt-2">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Members</p>
              <h3 className="text-2xl font-bold mt-2">{stats.active}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inactive Members</p>
              <h3 className="text-2xl font-bold mt-2">{stats.inactive}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <UserX className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">With Social Links</p>
              <h3 className="text-2xl font-bold mt-2">{stats.withSocial}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Linkedin className="h-6 w-6 text-blue-500" />
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
              placeholder="Search by name, designation, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Refresh Button */}
          <Button
            variant="outline"
            onClick={fetchTeamMembers}
            className="gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </Card>

      {/* Team Table */}
      {filteredMembers.length === 0 ? (
        <Card className="p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No team members found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your filters"
              : "Get started by adding your first team member"}
          </p>
          {!searchQuery && statusFilter === "all" && (
            <Button asChild>
              <Link href="/admin/team/new">
                <Plus className="mr-2 h-4 w-4" />
                Add Team Member
              </Link>
            </Button>
          )}
        </Card>
      ) : (
        <DataTable
          columns={columns}
          data={filteredMembers}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={() => {
          if (memberToDelete) {
            handleDelete(memberToDelete);
          }
        }}
        title="Delete Team Member"
        description="Are you sure you want to delete this team member? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </>
  );
}
