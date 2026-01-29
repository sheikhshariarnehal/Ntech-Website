"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import {
  ArrowLeft,
  Mail,
  Phone as PhoneIcon,
  Building2,
  Briefcase,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  User,
  Globe,
  StickyNote,
  Save
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

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

export default function LeadDetailPage() {
  const params = useParams();
  const [lead, setLead] = useState<ContactSubmission | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const supabase = createClient();

  useEffect(() => {
    if (params.id) {
      fetchLead();
    }
  }, [params.id]);

  async function fetchLead() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', params.id as string)
      .single();

    if (!error && data) {
      const leadData = data as ContactSubmission;
      setLead(leadData);
      setNotes(leadData.notes || "");
      setStatus(leadData.status);
    }
    setLoading(false);
  }

  async function handleSave() {
    if (!lead) return;
    
    setSaving(true);
    
    const { error } = await supabase
      .from('contact_submissions')
      .update({
        status,
        notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', lead.id);

    if (!error) {
      fetchLead();
    }
    setSaving(false);
  }

  const getStatusConfig = (status: string) => {
    const configs = {
      new: { variant: 'default' as const, icon: AlertCircle, label: 'New', color: 'text-blue-600 bg-blue-50' },
      in_progress: { variant: 'secondary' as const, icon: Clock, label: 'In Progress', color: 'text-yellow-600 bg-yellow-50' },
      closed: { variant: 'success' as const, icon: CheckCircle, label: 'Closed', color: 'text-green-600 bg-green-50' },
      spam: { variant: 'destructive' as const, icon: XCircle, label: 'Spam', color: 'text-red-600 bg-red-50' },
    };
    return configs[status as keyof typeof configs] || configs.new;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!lead) {
    return (
      <>
        <AdminPageHeader title="Lead Not Found" subtitle="The requested lead could not be found." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">This lead may have been deleted or does not exist.</p>
          <Button asChild>
            <Link href="/admin/leads">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Leads
            </Link>
          </Button>
        </Card>
      </>
    );
  }

  const statusConfig = getStatusConfig(lead.status);
  const StatusIcon = statusConfig.icon;

  return (
    <>
      {/* Header with Back Button */}
      <div className="mb-6">
        <Button variant="outline" size="sm" asChild className="mb-4">
          <Link href="/admin/leads">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Link>
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <AdminPageHeader 
              title={lead.name}
              subtitle={lead.company ? `From ${lead.company}` : "Contact Submission"}
            />
          </div>
          <div className={`px-4 py-2 rounded-lg ${statusConfig.color}`}>
            <div className="flex items-center gap-2">
              <StatusIcon className="h-5 w-5" />
              <span className="font-semibold">{statusConfig.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Lead Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                  <p className="text-base font-semibold">{lead.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                  <a href={`mailto:${lead.email}`} className="text-base font-semibold hover:underline">
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.phone && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <PhoneIcon className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone Number</p>
                    <p className="text-base font-semibold">{lead.phone}</p>
                  </div>
                </div>
              )}

              {lead.company && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Building2 className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Company</p>
                    <p className="text-base font-semibold">{lead.company}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Message */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Message
            </h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap">{lead.message}</p>
            </div>
          </Card>

          {/* Notes Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <StickyNote className="h-5 w-5 text-primary" />
              Internal Notes
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Add notes about this lead</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes, follow-up actions, or any relevant information..."
                  rows={6}
                  className="mt-2"
                />
              </div>
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status Management</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="status">Lead Status</Label>
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-2"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                  <option value="spam">Spam</option>
                </Select>
              </div>
              <Button onClick={handleSave} disabled={saving} variant="outline" className="w-full gap-2">
                <Save className="h-4 w-4" />
                {saving ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <a href={`mailto:${lead.email}`}>
                  <Mail className="h-4 w-4" />
                  Send Email
                </a>
              </Button>
              {lead.phone && (
                <Button asChild variant="outline" className="w-full justify-start gap-2">
                  <a href={`tel:${lead.phone}`}>
                    <PhoneIcon className="h-4 w-4" />
                    Call Phone
                  </a>
                </Button>
              )}
            </div>
          </Card>

          {/* Project Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Project Details</h3>
            <div className="space-y-4">
              {lead.service_type && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Service Interest</p>
                  <Badge variant="outline" className="text-sm capitalize gap-1">
                    <Briefcase className="h-3 w-3" />
                    {lead.service_type}
                  </Badge>
                </div>
              )}

              {lead.budget_range && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Budget Range</p>
                  <Badge variant="secondary" className="text-sm gap-1">
                    <DollarSign className="h-3 w-3" />
                    {lead.budget_range}
                  </Badge>
                </div>
              )}

              {lead.source_page && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Source Page</p>
                  <Badge variant="outline" className="text-sm gap-1">
                    <Globe className="h-3 w-3" />
                    {lead.source_page}
                  </Badge>
                </div>
              )}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Submitted</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(lead.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(lead.updated_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
