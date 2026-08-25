import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonError, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;

  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { name: true, email: true } } },
  });

  return jsonOk(logs);
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();
  const { action, entity, entityId, details } = body;

  if (!action || !entity) return jsonError("Missing action or entity");

  await logActivity(session.user.id, action, entity, entityId, details);

  return jsonOk({ success: true });
}
