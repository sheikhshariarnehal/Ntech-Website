"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { TrustedCompanyForm } from "@/components/forms/trusted-company-form";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { Loader2 } from "lucide-react";

type TrustedCompany = Database['public']['Tables']['trusted_companies']['Row'];

export default function EditTrustedCompanyPage({ params }: { params: { id: string } }) {
  const [company, setCompany] = useState<TrustedCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchCompany() {
      const { data, error } = await supabase
        .from('trusted_companies')
        .select('*')
        .eq('id', params.id)
        .single();

      if (!error && data) {
        setCompany(data);
      }
      setLoading(false);
    }

    fetchCompany();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!company) {
    return <div>Company not found</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit Trusted Company"
        description={`Edit details for ${company.name}`}
      />
      <TrustedCompanyForm initialData={company} />
    </div>
  );
}
