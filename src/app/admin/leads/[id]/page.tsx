"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LeadDetailPage() {
  const params = useParams();
  const leadId = params.id as string;
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [lead, setLead] = useState<any>(null);
  const [notes, setNotes] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [leadId]);

  async function fetchLead() {
    setLoading(true);
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', leadId)
      .single();

    if (!error && data) {
      setLead(data);
      setNotes(data.notes || "");
    }
    setLoading(false);
  }

  async function updateStatus(newStatus: string) {
    setUpdatingStatus(true);
    const { error } = await supabase
      .from('contact_submissions')
      .update({ status: newStatus })
      .eq('id', leadId);

    if (!error) {
      setLead({ ...lead, status: newStatus });
    } else {
      alert('Error updating status: ' + error.message);
    }
    setUpdatingStatus(false);
  }

  async function saveNotes() {
    setSavingNotes(true);
    const { error } = await supabase
      .from('contact_submissions')
      .update({ notes })
      .eq('id', leadId);

    if (error) {
      alert('Error saving notes: ' + error.message);
    }
    setSavingNotes(false);
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

  if (loading) {
    return (
      <>
        <PageHeader title="Lead Details" subtitle="Loading..." />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Loading lead data...</p>
        </Card>
      </>
    );
  }

  if (!lead) {
    return (
      <>
        <PageHeader title="Lead Details" subtitle="Not found" />
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">Lead not found.</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/leads">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Link>
        </Button>
        <PageHeader title="Lead Details" subtitle={lead.email} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Lead Information */}
        <Card className="p-6 md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <Badge variant={getStatusColor(lead.status) as any}>
              {lead.status.replace('_', ' ')}
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{lead.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Company</p>
              <p className="font-medium">{lead.company || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{lead.email}</p>
                <Button variant="ghost" size="sm" asChild>
                  <a href={`mailto:${lead.email}`}>
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <div className="flex items-center gap-2">
                <p className="font-medium">{lead.phone || "N/A"}</p>
                {lead.phone && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={`tel:${lead.phone}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Service Type</p>
              <p className="font-medium">{lead.service_type || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Budget Range</p>
              <p className="font-medium">{lead.budget_range || "N/A"}</p>
            </div>
            {lead.source_page && (
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">Source Page</p>
                <p className="font-medium">{lead.source_page}</p>
              </div>
            )}
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Message</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {lead.message}
            </p>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-2">Internal Notes</h4>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this lead..."
              rows={4}
              className="mb-2"
            />
            <Button onClick={saveNotes} disabled={savingNotes}>
              {savingNotes ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </Card>

        {/* Status Management */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Status Management</h3>
            <div className="space-y-2">
              <Label htmlFor="status">Change Status</Label>
              <Select
                id="status"
                value={lead.status}
                onChange={(e) => updateStatus(e.target.value)}
                disabled={updatingStatus}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
                <option value="spam">Mark as Spam</option>
              </Select>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Timeline</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Submitted</p>
                <p className="text-sm font-medium">
                  {new Date(lead.created_at).toLocaleString()}
                </p>
              </div>
              {lead.updated_at !== lead.created_at && (
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="text-sm font-medium">
                    {new Date(lead.updated_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <a href={`mailto:${lead.email}?subject=Re: Your inquiry`}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </a>
              </Button>
              {lead.phone && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${lead.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </a>
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
