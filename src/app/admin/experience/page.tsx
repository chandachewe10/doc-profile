"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function ExperienceAdminPage() {
  return (
    <CrudEditor
      resource="experiences"
      title="Experience"
      description="Your career timeline and roles"
      jsonFields={["skills"]}
      fields={[
        { key: "period", label: "Period (e.g. 2020 — Present)" },
        { key: "role", label: "Role / Title" },
        { key: "organization", label: "Organization" },
        { key: "country", label: "Country" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "skills", label: "Skills", type: "tags" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        period: "",
        role: "",
        organization: "",
        country: "",
        description: "",
        skills: [],
        sortOrder: 0,
        published: true,
      }}
      itemLabel={(item) => `${String(item.role)} — ${String(item.organization)}`}
    />
  );
}
