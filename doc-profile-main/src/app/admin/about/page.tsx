"use client";

import { useEffect, useState } from "react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { parseJson } from "@/lib/utils";

type Pillar = { num: string; title: string; body: string };

export default function AboutAdminPage() {
  const [form, setForm] = useState({
    sectionLabel: "",
    title: "",
    titleEmphasis: "",
    lead: "",
    body: "",
    pillars: [] as Pillar[],
  });

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        if (!data) return;
        setForm({
          sectionLabel: data.sectionLabel || "",
          title: data.title || "",
          titleEmphasis: data.titleEmphasis || "",
          lead: data.lead || "",
          body: data.body || "",
          pillars: parseJson<Pillar[]>(data.pillars, []),
        });
      });
  }, []);

  const save = async () => {
    await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div>
      <PageHeader title="About Me" description="Your story, research thread, and key pillars" action={<SaveButton onSave={save} />} />

      <div className="admin-card space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Section Label">
            <input className="admin-input" value={form.sectionLabel} onChange={(e) => setForm({ ...form, sectionLabel: e.target.value })} />
          </FormField>
          <FormField label="Title">
            <input className="admin-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </FormField>
          <FormField label="Title Emphasis (italic)">
            <input className="admin-input" value={form.titleEmphasis} onChange={(e) => setForm({ ...form, titleEmphasis: e.target.value })} />
          </FormField>
          <FormField label="Lead Quote">
            <input className="admin-input" value={form.lead} onChange={(e) => setForm({ ...form, lead: e.target.value })} />
          </FormField>
        </div>

        <FormField label="Main Content">
          <RichTextEditor content={form.body} onChange={(html) => setForm({ ...form, body: html })} />
        </FormField>

        <FormField label="Pillars" hint="Format per line: num|title|body">
          <textarea
            className="admin-input font-mono text-xs"
            rows={8}
            value={form.pillars.map((p) => `${p.num}|${p.title}|${p.body}`).join("\n")}
            onChange={(e) =>
              setForm({
                ...form,
                pillars: e.target.value
                  .split("\n")
                  .filter(Boolean)
                  .map((line) => {
                    const [num, title, ...rest] = line.split("|");
                    return { num: num?.trim() || "", title: title?.trim() || "", body: rest.join("|").trim() };
                  }),
              })
            }
          />
        </FormField>
      </div>
    </div>
  );
}
