import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return jsonOk(settings);
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: body,
    create: { id: "main", ...body },
  });

  await logActivity(session.user.id, "update", "SiteSettings", "main");

  return jsonOk(settings);
}
