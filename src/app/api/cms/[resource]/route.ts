import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonError, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";
import { slugify } from "@/lib/utils";

type ResourceConfig = {
  model: keyof typeof prisma;
  singular: string;
  orderBy?: Record<string, "asc" | "desc">;
};

const resources: Record<string, ResourceConfig> = {
  services: { model: "service", singular: "Service", orderBy: { sortOrder: "asc" } },
  projects: { model: "project", singular: "Project", orderBy: { sortOrder: "asc" } },
  experiences: { model: "experience", singular: "Experience", orderBy: { sortOrder: "asc" } },
  skills: { model: "skillCategory", singular: "SkillCategory", orderBy: { sortOrder: "asc" } },
  testimonials: { model: "testimonial", singular: "Testimonial", orderBy: { sortOrder: "asc" } },
  social: { model: "socialLink", singular: "SocialLink", orderBy: { sortOrder: "asc" } },
  publications: { model: "publication", singular: "Publication", orderBy: { sortOrder: "asc" } },
  blog: { model: "blogPost", singular: "BlogPost", orderBy: { createdAt: "desc" } },
  awards: { model: "award", singular: "Award", orderBy: { sortOrder: "asc" } },
  leadership: { model: "leadershipRole", singular: "LeadershipRole", orderBy: { sortOrder: "asc" } },
  media: { model: "mediaAppearance", singular: "MediaAppearance", orderBy: { sortOrder: "asc" } },
};

function getDelegate(resource: string) {
  const config = resources[resource];
  if (!config) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[config.model];
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const { resource } = await params;
  const delegate = getDelegate(resource);
  if (!delegate) return jsonError("Unknown resource", 404);

  const config = resources[resource];
  const items = await delegate.findMany({ orderBy: config.orderBy });
  return jsonOk(items);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const { resource } = await params;
  const delegate = getDelegate(resource);
  const config = resources[resource];
  if (!delegate || !config) return jsonError("Unknown resource", 404);

  const body = await request.json();

  if (resource === "projects" && body.title && !body.slug) {
    body.slug = slugify(body.title);
  }
  if (resource === "blog" && body.title && !body.slug) {
    body.slug = slugify(body.title);
  }
  if (resource === "blog" && body.published && !body.publishedAt) {
    body.publishedAt = new Date();
  }

  if (typeof body.tags === "object") body.tags = JSON.stringify(body.tags);
  if (typeof body.skills === "object") body.skills = JSON.stringify(body.skills);

  const item = await delegate.create({ data: body });

  await logActivity(session.user.id, "create", config.singular, item.id, item.title || item.name);

  return jsonOk(item, 201);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const { resource } = await params;
  const delegate = getDelegate(resource);
  const config = resources[resource];
  if (!delegate || !config) return jsonError("Unknown resource", 404);

  const body = await request.json();
  const { id, ...data } = body;
  if (!id) return jsonError("Missing id");

  if (typeof data.tags === "object") data.tags = JSON.stringify(data.tags);
  if (typeof data.skills === "object") data.skills = JSON.stringify(data.skills);
  if (resource === "blog" && data.published && !data.publishedAt) {
    data.publishedAt = new Date();
  }

  const item = await delegate.update({ where: { id }, data });

  await logActivity(session.user.id, "update", config.singular, id, item.title || item.name);

  return jsonOk(item);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> }
) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const { resource } = await params;
  const delegate = getDelegate(resource);
  const config = resources[resource];
  if (!delegate || !config) return jsonError("Unknown resource", 404);

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return jsonError("Missing id");

  await delegate.delete({ where: { id } });

  await logActivity(session.user.id, "delete", config.singular, id);

  return jsonOk({ success: true });
}
