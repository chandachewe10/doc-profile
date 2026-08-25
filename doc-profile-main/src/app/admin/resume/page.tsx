"use client";

import { useEffect, useState } from "react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";

export default function ResumeAdminPage() {
  const [form, setForm] = useState({ filename: "", label: "Download CV" });

  useEffect(() => {
    fetch("/api/resume")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setForm({
            filename: data.filename || "Mwenya-Mubanga-CV.pdf",
            label: data.label || "Download CV",
          });
        }
      });
  }, []);

  const save = async () => {
    await fetch("/api/resume", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: form.filename.endsWith(".pdf") ? form.filename : `${form.filename}.pdf`,
        url: "/generated",
        label: form.label,
      }),
    });
  };

  return (
    <div>
      <PageHeader
        title="Resume / CV"
        description="The downloadable CV is generated automatically from your profile content and matches the public site design."
        action={<SaveButton onSave={save} />}
      />
      <div className="admin-card space-y-4">
        <p className="text-sm leading-relaxed text-gray-600">
          Update homepage, about, publications, leadership, and experience in the admin — those sections
          appear in the PDF. Use the button below to preview the generated file.
        </p>
        <a
          href="/api/resume/download"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-btn-secondary inline-flex"
        >
          Preview generated CV
        </a>
        <FormField label="Download button label">
          <input
            className="admin-input"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />
        </FormField>
        <FormField label="Download filename">
          <input
            className="admin-input"
            value={form.filename}
            onChange={(e) => setForm({ ...form, filename: e.target.value })}
            placeholder="Mwenya-Mubanga-CV.pdf"
          />
        </FormField>
      </div>
    </div>
  );
}
