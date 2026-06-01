"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { parseJson } from "@/lib/utils";

type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "richtext" | "number" | "checkbox" | "image" | "tags";
  hint?: string;
};

type CrudEditorProps<T extends { id: string }> = {
  resource: string;
  title: string;
  description?: string;
  fields: FieldConfig[];
  jsonFields?: string[];
  emptyItem: Omit<T, "id">;
  itemLabel?: (item: T) => string;
};

export function CrudEditor<T extends { id: string } & Record<string, unknown>>({
  resource,
  title,
  description,
  fields,
  jsonFields = [],
  emptyItem,
  itemLabel = (item) => String((item as Record<string, unknown>).title || (item as Record<string, unknown>).name || item.id),
}: CrudEditorProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [editing, setEditing] = useState<Partial<T> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const res = await fetch(`/api/cms/${resource}`);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    let active = true;

    void (async () => {
      setLoading(true);
      const res = await fetch(`/api/cms/${resource}`);
      const data = await res.json();
      if (active) {
        setItems(data);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [resource]);

  const openNew = () => {
    setEditing({ ...emptyItem, id: "" } as Partial<T>);
  };

  const openEdit = (item: T) => {
    const copy = { ...item } as Record<string, unknown>;
    for (const key of jsonFields) {
      if (typeof copy[key] === "string") {
        copy[key] = parseJson(copy[key] as string, []);
      }
    }
    setEditing(copy as Partial<T>);
  };

  const saveItem = async () => {
    if (!editing) return;
    const payload = { ...editing } as Record<string, unknown>;
    for (const key of jsonFields) {
      if (Array.isArray(payload[key])) {
        payload[key] = JSON.stringify(payload[key]);
      }
    }

    const isNew = !editing.id;
    const res = await fetch(`/api/cms/${resource}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setEditing(null);
      await fetchItems();
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await fetch(`/api/cms/${resource}?id=${id}`, { method: "DELETE" });
    await fetchItems();
  };

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Loading...</div>;
  }

  return (
    <div>
      <PageHeader
        title={title}
        description={description}
        action={
          <button type="button" onClick={openNew} className="admin-btn-primary">
            <Plus className="h-4 w-4" />
            Add New
          </button>
        }
      />

      {editing && (
        <div className="admin-card mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-medium text-gray-900">
              {editing.id ? "Edit Item" : "New Item"}
            </h2>
            <button type="button" onClick={() => setEditing(null)} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <FormField key={field.key} label={field.label} hint={field.hint}>
                <FieldInput
                  field={field}
                  value={(editing as Record<string, unknown>)[field.key]}
                  onChange={(val) => setEditing({ ...editing, [field.key]: val })}
                />
              </FormField>
            ))}
          </div>

          <SaveButton onSave={saveItem} label={editing.id ? "Update" : "Create"} />
        </div>
      )}

      <div className="admin-card overflow-hidden p-0">
        {items.length === 0 ? (
          <p className="p-6 text-sm text-gray-400">No items yet. Click &quot;Add New&quot; to create one.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">{itemLabel(item)}</p>
                  {(item as Record<string, unknown>).published === false && (
                    <span className="text-xs text-amber-600">Draft</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => openEdit(item)} className="admin-btn-secondary py-1.5 px-3">
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteItem(item.id)} className="admin-btn-danger py-1.5 px-3">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: unknown;
  onChange: (val: unknown) => void;
}) {
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="admin-input"
        />
      );
    case "richtext":
      return (
        <RichTextEditor
          content={String(value ?? "")}
          onChange={(html) => onChange(html)}
          className="col-span-2"
        />
      );
    case "number":
      return (
        <input
          type="number"
          value={Number(value ?? 0)}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="admin-input"
        />
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-earth"
        />
      );
    case "image":
      return (
        <MediaPicker
          value={String(value ?? "")}
          onChange={(url) => onChange(url)}
        />
      );
    case "tags":
      return (
        <input
          type="text"
          value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="Comma-separated tags"
          className="admin-input"
        />
      );
    default:
      return (
        <input
          type="text"
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input"
        />
      );
  }
}
