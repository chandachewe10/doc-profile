"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Home,
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  BookOpen,
  Award,
  Mail,
  Share2,
  FileText,
  Newspaper,
  Image,
  Activity,
  Settings,
  LogOut,
  Menu,
  X,
  Mic,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/homepage", label: "Homepage & Portrait", icon: Home },
  { href: "/admin/about", label: "Biography", icon: User },
  { href: "/admin/publications", label: "Publications", icon: BookOpen },
  { href: "/admin/awards", label: "Awards", icon: Award },
  { href: "/admin/leadership", label: "Leadership", icon: Briefcase },
  { href: "/admin/experience", label: "Appointments", icon: GraduationCap },
  { href: "/admin/media-speaking", label: "Media & Speaking", icon: Mic },
  { href: "/admin/projects", label: "Research Projects", icon: FolderOpen },
  { href: "/admin/resume", label: "CV Upload", icon: FileText },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/social", label: "Social & ORCID", icon: Share2 },
  { href: "/admin/blog", label: "News & Updates", icon: Newspaper },
  { href: "/admin/media", label: "Media Library", icon: Image },
  { href: "/admin/activity", label: "Activity Log", icon: Activity },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg bg-white p-2 shadow-md lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <div>
            <p className="font-serif text-lg font-semibold text-ink">Portfolio CMS</p>
            <p className="text-xs text-gray-400">Content Dashboard</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="rounded p-1 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                      active
                        ? "bg-earth/10 font-medium text-earth"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="admin-btn-secondary w-full text-center text-xs"
          >
            View Website ↗
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
