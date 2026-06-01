"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function PublicationsAdminPage() {
  return (
    <CrudEditor
      resource="publications"
      title="Publications"
      description="Manage research publications and papers"
      fields={[
        { key: "year", label: "Year" },
        { key: "title", label: "Title", type: "textarea" },
        { key: "authors", label: "Authors", type: "textarea" },
        { key: "journal", label: "Journal / Source" },
        { key: "category", label: "Category (hiv, cvd, atopy, all)" },
        { key: "badge", label: "Badge Text" },
        { key: "badgeType", label: "Badge Type (new, featured)" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Visible", type: "checkbox" },
      ]}
      emptyItem={{
        year: "",
        title: "",
        authors: "",
        journal: "",
        category: "all",
        badge: "",
        badgeType: "",
        sortOrder: 0,
        published: true,
      }}
    />
  );
}
