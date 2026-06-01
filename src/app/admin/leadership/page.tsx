"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function LeadershipAdminPage() {
  return (
    <CrudEditor
      resource="leadership"
      title="Leadership & Service"
      description="Executive roles, advisory positions, and institutional leadership"
      fields={[
        { key: "title", label: "Role / Title" },
        { key: "organization", label: "Organization" },
        { key: "url", label: "Website URL" },
        { key: "period", label: "Period (e.g. 2020 — Present)" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        title: "",
        organization: "",
        url: "",
        period: "",
        description: "",
        sortOrder: 0,
        published: true,
      }}
      itemLabel={(item) => `${String(item.title)} — ${String(item.organization)}`}
    />
  );
}
