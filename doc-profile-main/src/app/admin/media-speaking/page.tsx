"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

const mediaTypes = "Documentary, Conference, Interview, Presentation, Public Writing, Public Engagement, Media Coverage";

export default function MediaAdminPage() {
  return (
    <CrudEditor
      resource="media"
      title="Media & Speaking"
      description="Conferences, interviews, presentations, and public engagements"
      fields={[
        { key: "title", label: "Title" },
        { key: "type", label: "Type", hint: mediaTypes },
        { key: "outlet", label: "Outlet / Venue" },
        { key: "date", label: "Date or Location" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "linkUrl", label: "Link URL" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "published", label: "Published", type: "checkbox" },
      ]}
      emptyItem={{
        title: "",
        type: "Conference",
        outlet: "",
        date: "",
        description: "",
        linkUrl: "",
        sortOrder: 0,
        published: true,
      }}
    />
  );
}
