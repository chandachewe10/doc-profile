"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaPickerProps = {
  value?: string | null;
  onChange: (url: string) => void;
  accept?: string;
  label?: string;
  className?: string;
};

export function MediaPicker({
  value,
  onChange,
  accept = "image/*",
  label = "Upload image",
  className,
}: MediaPickerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {value ? (
        <div className="relative overflow-hidden rounded-lg border border-gray-200">
          {value.endsWith(".pdf") ? (
            <div className="flex items-center gap-3 p-4">
              <span className="text-2xl">📄</span>
              <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm text-earth underline">
                {value.split("/").pop()}
              </a>
            </div>
          ) : (
            <div className="relative h-48 w-full">
              <Image src={value} alt="" fill className="object-cover" />
            </div>
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-10 transition hover:border-earth hover:bg-earth/5">
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-earth" />
          ) : (
            <>
              <Upload className="mb-2 h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">{label}</span>
              <span className="mt-1 text-xs text-gray-400">Click to browse</span>
            </>
          )}
          <input type="file" accept={accept} onChange={handleUpload} className="hidden" disabled={uploading} />
        </label>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
