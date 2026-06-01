"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function TestimonialsAdminPage() {
  return (
    <CrudEditor
      resource="testimonials"
      title="Testimonials"
      description="Quotes and endorsements from colleagues and collaborators"
      fields={[
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "author", label: "Author" },
        { key: "role", label: "Role / Title" },
        { key: "avatarUrl", label: "Avatar", type: "image" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        quote: "",
        author: "",
        role: "",
        avatarUrl: "",
        sortOrder: 0,
        published: true,
      }}
      itemLabel={(item) => String(item.author)}
    />
  );
}
