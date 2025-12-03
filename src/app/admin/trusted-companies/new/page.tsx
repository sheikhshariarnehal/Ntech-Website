"use client";

import { AdminPageHeader } from "@/components/layout/admin-page-header";
import { TrustedCompanyForm } from "@/components/forms/trusted-company-form";

export default function NewTrustedCompanyPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Add Trusted Company"
        subtitle="Add a new company to the trusted companies list."
      />
      <TrustedCompanyForm />
    </div>
  );
}
