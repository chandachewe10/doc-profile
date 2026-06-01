import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonError, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return jsonOk(user);
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();
  const { name, email, currentPassword, newPassword } = body;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return jsonError("User not found", 404);

  const data: { name?: string; email?: string; passwordHash?: string } = {};

  if (name) data.name = name;
  if (email && email !== user.email) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return jsonError("Email already in use");
    data.email = email;
  }

  if (newPassword) {
    if (!currentPassword) return jsonError("Current password required");
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return jsonError("Current password is incorrect");
    data.passwordHash = await bcrypt.hash(newPassword, 12);
  }

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data,
    select: { id: true, email: true, name: true },
  });

  await logActivity(session.user.id, "update", "User", user.id, "Profile updated");

  return jsonOk(updated);
}
