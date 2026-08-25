"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { PageHeader } from "@/components/admin/AdminUI";

type MediaFile = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: string;
};

export default function MediaAdminPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const fetchFiles = () => {
    fetch("/api/upload")
      .then((r) => r.json())
      .then(setFiles);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);
    fetchFiles();
  };

  const deleteFile = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    await fetch(`/api/upload?id=${id}`, { method: "DELETE" });
    fetchFiles();
  };

  return (
    <div>
      <PageHeader
        title="Media Library"
        description="Upload and manage images and files"
        action={
          <label className="admin-btn-primary cursor-pointer">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading..." : "Upload File"}
            <input type="file" accept="image/*,application/pdf" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        }
      />

      {files.length === 0 ? (
        <div className="admin-card py-12 text-center text-gray-400">No files uploaded yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <div key={file.id} className="admin-card overflow-hidden p-0">
              <div className="relative h-40 bg-gray-100">
                {file.mimeType.startsWith("image/") ? (
                  <Image src={file.url} alt={file.alt || file.filename} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl">📄</div>
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-gray-800">{file.filename}</p>
                <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                <div className="mt-2 flex gap-2">
                  <input
                    readOnly
                    value={file.url}
                    className="flex-1 truncate rounded border border-gray-200 px-2 py-1 text-xs text-gray-500"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                  <button type="button" onClick={() => deleteFile(file.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
