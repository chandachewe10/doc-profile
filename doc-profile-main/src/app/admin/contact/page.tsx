"use client";

import { useEffect, useState } from "react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function ContactAdminPage() {
  const [form, setForm] = useState({
    title: "",
    titleEmphasis: "",
    body: "",
    email: "",
    location: "",
  });

  useEffect(() => {
    fetch("/api/contact")
      .then((r) => r.json())
      .then((data) => data && setForm(data));
  }, []);

  const save = async () => {
    await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div>
      <PageHeader title="Contact Information" description="How visitors can reach you" action={<SaveButton onSave={save} />} />
      <div className="admin-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Title">
            <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </FormField>
          <FormField label="Title Emphasis">
            <input className="admin-input" value={form.titleEmphasis} onChange={(e) => setForm({ ...form, titleEmphasis: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <input type="email" className="admin-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </FormField>
          <FormField label="Location">
            <input className="admin-input" value={form.location || ""} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </FormField>
        </div>
        <FormField label="Message">
          <RichTextEditor content={form.body} onChange={(html) => setForm({ ...form, body: html })} />
        </FormField>
      </div>
    </div>
  );
}
