import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const resume = await prisma.resumeFile.findUnique({ where: { id: "main" } });
  return jsonOk(resume);
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();

  const resume = await prisma.resumeFile.upsert({
    where: { id: "main" },
    update: body,
    create: { id: "main", ...body },
  });

  await logActivity(session.user.id, "update", "ResumeFile", "main");

  return jsonOk(resume);
}
