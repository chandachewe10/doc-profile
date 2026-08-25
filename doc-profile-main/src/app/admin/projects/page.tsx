"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function ProjectsAdminPage() {
  return (
    <CrudEditor
      resource="projects"
      title="Projects"
      description="Showcase your portfolio projects and work"
      fields={[
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "imageUrl", label: "Image", type: "image" },
        { key: "linkUrl", label: "Link URL" },
        { key: "linkText", label: "Link Text" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "featured", label: "Featured", type: "checkbox" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        title: "",
        slug: "",
        category: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        linkText: "Learn more",
        featured: false,
        sortOrder: 0,
        published: true,
      }}
    />
  );
}
