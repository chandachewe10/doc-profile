"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function ServicesAdminPage() {
  return (
    <CrudEditor
      resource="services"
      title="Services"
      description="Manage the services you offer"
      jsonFields={["tags"]}
      fields={[
        { key: "icon", label: "Icon (emoji)" },
        { key: "title", label: "Title" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "tags", label: "Tags", type: "tags" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        icon: "🔬",
        title: "",
        description: "",
        tags: [],
        sortOrder: 0,
        published: true,
      }}
    />
  );
}
