import { prisma } from "./prisma";

export async function logActivity(
  userId: string,
  action: string,
  entity: string,
  entityId?: string,
  details?: string
) {
  await prisma.activityLog.create({
    data: { userId, action, entity, entityId, details },
  });
}
