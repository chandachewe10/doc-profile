import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  FolderOpen,
  Newspaper,
  Image,
  Activity,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [projects, blogPosts, media, recentActivity] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.mediaFile.count(),
    prisma.activityLog.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
  ]);

  const stats = [
    { label: "Projects", value: projects, href: "/admin/projects", icon: FolderOpen },
    { label: "Published Posts", value: blogPosts, href: "/admin/blog", icon: Newspaper },
    { label: "Media Files", value: media, href: "/admin/media", icon: Image },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back. Manage your portfolio content from here.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="admin-card group transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-light text-earth">{value}</p>
              </div>
              <Icon className="h-8 w-8 text-gray-200 transition group-hover:text-earth/40" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="admin-card">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { href: "/admin/homepage", label: "Edit Homepage Hero" },
              { href: "/admin/projects", label: "Add New Project" },
              { href: "/admin/blog", label: "Write Blog Post" },
              { href: "/admin/resume", label: "Upload Updated CV" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                {label}
                <ArrowRight className="h-4 w-4 text-gray-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="admin-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
              Recent Activity
            </h2>
            <Link href="/admin/activity" className="text-xs text-earth hover:underline">
              View all
            </Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-gray-400">No activity yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentActivity.map((log) => (
                <li key={log.id} className="flex items-start gap-3 text-sm">
                  <Activity className="mt-0.5 h-4 w-4 shrink-0 text-earth/60" />
                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">{log.user.name}</span>{" "}
                      {log.action}d {log.entity}
                      {log.details && (
                        <span className="text-gray-400"> — {log.details}</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-6 admin-card flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-700">Live Website</p>
          <p className="text-xs text-gray-400">Changes you save appear instantly on the public site</p>
        </div>
        <Link href="/" target="_blank" className="admin-btn-secondary">
          <ExternalLink className="h-4 w-4" />
          Preview Site
        </Link>
      </div>
    </div>
  );
}
