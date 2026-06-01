"use client";

import { useEffect, useState } from "react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { parseJson } from "@/lib/utils";

type JsonItem = { num?: string; label?: string; text?: string; url?: string; org?: string; title?: string; body?: string };

export default function HomepageAdminPage() {
  const [form, setForm] = useState({
    eyebrow: "",
    name: "",
    nameEmphasis: "",
    tagline: "",
    photoUrl: "",
    degrees: [] as string[],
    roles: [] as JsonItem[],
    stats: [] as JsonItem[],
    ctaPrimary: { text: "", url: "" },
    ctaSecondary: { text: "", url: "" },
  });

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((data) => {
        if (!data) return;
        setForm({
          eyebrow: data.eyebrow || "",
          name: data.name || "",
          nameEmphasis: data.nameEmphasis || "",
          tagline: data.tagline || "",
          photoUrl: data.photoUrl || "",
          degrees: parseJson<string[]>(data.degrees, []),
          roles: parseJson<JsonItem[]>(data.roles, []),
          stats: parseJson<JsonItem[]>(data.stats, []),
          ctaPrimary: parseJson(data.ctaPrimary, { text: "", url: "" }),
          ctaSecondary: parseJson(data.ctaSecondary, { text: "", url: "" }),
        });
      });
  }, []);

  const save = async () => {
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  };

  return (
    <div>
      <PageHeader
        title="Homepage Hero"
        description="Edit the main landing section visitors see first"
        action={<SaveButton onSave={save} />}
      />

      <div className="space-y-6">
        <div className="admin-card space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">Profile Photo</h2>
          <MediaPicker
            value={form.photoUrl}
            onChange={(url) => setForm({ ...form, photoUrl: url })}
          />
        </div>

        <div className="admin-card grid gap-4 sm:grid-cols-2">
          <FormField label="Eyebrow Text">
            <input className="admin-input" value={form.eyebrow} onChange={(e) => setForm({ ...form, eyebrow: e.target.value })} />
          </FormField>
          <FormField label="Name">
            <input className="admin-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </FormField>
          <FormField label="Name Emphasis (italic part)">
            <input className="admin-input" value={form.nameEmphasis} onChange={(e) => setForm({ ...form, nameEmphasis: e.target.value })} />
          </FormField>
          <FormField label="Tagline" hint="Short description under your name">
            <textarea className="admin-input" rows={3} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </FormField>
          <FormField label="Degrees" hint="One per line">
            <textarea
              className="admin-input"
              rows={4}
              value={form.degrees.join("\n")}
              onChange={(e) => setForm({ ...form, degrees: e.target.value.split("\n").filter(Boolean) })}
            />
          </FormField>
          <FormField label="Stats" hint="Format: number|label per line">
            <textarea
              className="admin-input"
              rows={4}
              value={form.stats.map((s) => `${s.num}|${s.label}`).join("\n")}
              onChange={(e) =>
                setForm({
                  ...form,
                  stats: e.target.value
                    .split("\n")
                    .filter(Boolean)
                    .map((line) => {
                      const [num, label] = line.split("|");
                      return { num: num?.trim() || "", label: label?.trim() || "" };
                    }),
                })
              }
            />
          </FormField>
          <FormField label="Primary Button Text">
            <input className="admin-input" value={form.ctaPrimary.text} onChange={(e) => setForm({ ...form, ctaPrimary: { ...form.ctaPrimary, text: e.target.value } })} />
          </FormField>
          <FormField label="Primary Button URL">
            <input className="admin-input" value={form.ctaPrimary.url} onChange={(e) => setForm({ ...form, ctaPrimary: { ...form.ctaPrimary, url: e.target.value } })} />
          </FormField>
          <FormField label="Secondary Button Text">
            <input className="admin-input" value={form.ctaSecondary.text} onChange={(e) => setForm({ ...form, ctaSecondary: { ...form.ctaSecondary, text: e.target.value } })} />
          </FormField>
          <FormField label="Secondary Button URL">
            <input className="admin-input" value={form.ctaSecondary.url} onChange={(e) => setForm({ ...form, ctaSecondary: { ...form.ctaSecondary, url: e.target.value } })} />
          </FormField>
        </div>
      </div>
    </div>
  );
}
