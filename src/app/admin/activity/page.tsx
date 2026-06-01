import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/AdminUI";
import { Activity } from "lucide-react";

export default async function ActivityAdminPage() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <PageHeader title="Activity Log" description="Track all content changes made in the CMS" />

      <div className="admin-card overflow-hidden p-0">
        {logs.length === 0 ? (
          <p className="p-6 text-sm text-gray-400">No activity recorded yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {logs.map((log) => (
              <li key={log.id} className="flex items-start gap-4 px-6 py-4">
                <Activity className="mt-0.5 h-4 w-4 shrink-0 text-earth/60" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{log.user.name}</span>{" "}
                    <span className="text-gray-500">{log.action}d</span>{" "}
                    <span className="font-medium">{log.entity}</span>
                    {log.details && <span className="text-gray-400"> — {log.details}</span>}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
