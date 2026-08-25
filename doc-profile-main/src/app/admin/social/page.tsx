"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function SocialAdminPage() {
  return (
    <CrudEditor
      resource="social"
      title="Social Links"
      description="Manage social media and external profile links"
      fields={[
        { key: "platform", label: "Platform" },
        { key: "label", label: "Display Label" },
        { key: "url", label: "URL" },
        { key: "icon", label: "Icon key (linkedin, orcid, scholar, etc.)" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
        { key: "showInFooter", label: "Show in Footer", type: "checkbox" },
        { key: "showInContact", label: "Show in Contact", type: "checkbox" },
      ]}
      emptyItem={{
        platform: "",
        label: "",
        url: "",
        icon: "",
        sortOrder: 0,
        showInFooter: true,
        showInContact: true,
      }}
      itemLabel={(item) => String(item.platform)}
    />
  );
}
