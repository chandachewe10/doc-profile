import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const about = await prisma.aboutContent.findUnique({ where: { id: "main" } });
  return jsonOk(about);
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();

  const data = {
    sectionLabel: body.sectionLabel,
    title: body.title,
    titleEmphasis: body.titleEmphasis,
    lead: body.lead,
    body: body.body,
    pillars: typeof body.pillars === "string" ? body.pillars : JSON.stringify(body.pillars),
  };

  const about = await prisma.aboutContent.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });

  await logActivity(session.user.id, "update", "AboutContent", "main");

  return jsonOk(about);
}
