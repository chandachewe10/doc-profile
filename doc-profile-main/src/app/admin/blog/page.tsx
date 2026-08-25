"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function BlogAdminPage() {
  return (
    <CrudEditor
      resource="blog"
      title="Blog / News"
      description="Publish updates, news, and blog posts"
      fields={[
        { key: "title", label: "Title" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "content", label: "Content", type: "richtext" },
        { key: "coverImage", label: "Cover Image", type: "image" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        coverImage: "",
        published: false,
      }}
    />
  );
}
