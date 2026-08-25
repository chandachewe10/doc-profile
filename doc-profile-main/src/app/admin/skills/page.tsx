"use client";

import { CrudEditor } from "@/components/admin/CrudEditor";

export default function SkillsAdminPage() {
  return (
    <CrudEditor
      resource="skills"
      title="Skills"
      description="Organize skills by category"
      jsonFields={["skills"]}
      fields={[
        { key: "name", label: "Category Name" },
        { key: "skills", label: "Skills", type: "tags" },
        { key: "sortOrder", label: "Sort Order", type: "number" },
      ]}
      emptyItem={{ name: "", skills: [], sortOrder: 0 }}
      itemLabel={(item) => String(item.name)}
    />
  );
}
