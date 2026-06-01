import { NextRequest } from "next/server";
import { put } from "@vercel/blob";
import path from "path";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonError, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

const MAX_SIZE = parseInt(process.env.MAX_UPLOAD_SIZE || "5242880", 10);
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"];

export async function POST(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const alt = (formData.get("alt") as string) || "";

    if (!file) return jsonError("No file provided");

    if (!ALLOWED_TYPES.includes(file.type)) {
      return jsonError("File type not allowed. Use JPEG, PNG, WebP, GIF, or PDF.");
    }

    if (file.size > MAX_SIZE) {
      return jsonError(`File too large. Maximum size is ${MAX_SIZE / 1024 / 1024}MB.`);
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (file.type === "application/pdf") {
      const header = buffer.subarray(0, 5).toString("utf8");
      if (header !== "%PDF-") {
        return jsonError("Invalid PDF file. Please upload a working PDF document.");
      }
    }

    const ext = path.extname(file.name) || (file.type === "application/pdf" ? ".pdf" : ".jpg");
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return jsonError("BLOB_READ_WRITE_TOKEN is not configured. Set up Vercel Blob storage in the Vercel dashboard.", 500);
    }

    const blob = await put(filename, buffer, {
      access: "public",
      contentType: file.type,
    });

    const media = await prisma.mediaFile.create({
      data: {
        filename: file.name,
        url: blob.url,
        mimeType: file.type,
        size: file.size,
        alt,
      },
    });

    await logActivity(
      session.user.id,
      "upload",
      "MediaFile",
      media.id,
      file.name
    );

    return jsonOk(media, 201);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Upload error:", message);
    return jsonError(`Upload failed: ${message}`, 500);
  }
}

export async function GET() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;

  const files = await prisma.mediaFile.findMany({
    orderBy: { createdAt: "desc" },
  });

  return jsonOk(files);
}

export async function DELETE(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return jsonError("Missing id");

  const file = await prisma.mediaFile.findUnique({ where: { id } });
  if (!file) return jsonError("File not found", 404);

  await prisma.mediaFile.delete({ where: { id } });

  await logActivity(session.user.id, "delete", "MediaFile", id, file.filename);

  return jsonOk({ success: true });
}
