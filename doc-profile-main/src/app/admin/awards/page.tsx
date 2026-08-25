"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function AwardsAdminPage() {
  return (
    <CrudEditor
      resource="awards"
      title="Awards & Recognition"
      description="Honours, citations highlights, and professional recognition"
      fields={[
        { key: "title", label: "Title" },
        { key: "year", label: "Year" },
        { key: "organization", label: "Organization" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        title: "",
        year: "",
        organization: "",
        description: "",
        sortOrder: 0,
        published: true,
      }}
    />
  );
}
