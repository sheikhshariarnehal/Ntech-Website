"use client";

import { PageHeader } from "@/components/shared/page-header";
import { TrustedCompanyForm } from "@/components/forms/trusted-company-form";

export default function NewTrustedCompanyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add Trusted Company"
        subtitle="Add a new company to the trusted list."
      />
      <TrustedCompanyForm />
    </div>
  );
}
