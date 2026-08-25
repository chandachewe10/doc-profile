import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi, jsonOk } from "@/lib/api-helpers";
import { logActivity } from "@/lib/activity";

export async function GET() {
  const hero = await prisma.heroContent.findUnique({ where: { id: "main" } });
  return jsonOk(hero);
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminApi();
  if ("error" in authResult) return authResult.error;
  const { session } = authResult;

  const body = await request.json();

  const data = {
    eyebrow: body.eyebrow,
    name: body.name,
    nameEmphasis: body.nameEmphasis,
    degrees: typeof body.degrees === "string" ? body.degrees : JSON.stringify(body.degrees),
    roles: typeof body.roles === "string" ? body.roles : JSON.stringify(body.roles),
    tagline: body.tagline,
    stats: typeof body.stats === "string" ? body.stats : JSON.stringify(body.stats),
    ctaPrimary: typeof body.ctaPrimary === "string" ? body.ctaPrimary : JSON.stringify(body.ctaPrimary),
    ctaSecondary: typeof body.ctaSecondary === "string" ? body.ctaSecondary : JSON.stringify(body.ctaSecondary),
    photoUrl: body.photoUrl,
  };

  const hero = await prisma.heroContent.upsert({
    where: { id: "main" },
    update: data,
    create: { id: "main", ...data },
  });

  await logActivity(session.user.id, "update", "HeroContent", "main");

  return jsonOk(hero);
}
