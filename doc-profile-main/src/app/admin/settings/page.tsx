"use client";

import { useEffect, useState } from "react";
import { SaveButton, PageHeader, FormField } from "@/components/admin/AdminUI";

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    keywords: "",
    footerText: "",
  });
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetch("/api/settings").then((r) => r.json()).then((d) => d && setSettings(d));
    fetch("/api/profile").then((r) => r.json()).then((d) => d && setProfile((p) => ({ ...p, name: d.name, email: d.email })));
  }, []);

  const saveSettings = async () => {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
  };

  const saveProfile = async () => {
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    setProfile((p) => ({ ...p, currentPassword: "", newPassword: "" }));
  };

  return (
    <div className="space-y-8">
      <div>
        <PageHeader title="Site Settings" description="SEO and global site configuration" action={<SaveButton onSave={saveSettings} />} />
        <div className="admin-card space-y-4">
          <FormField label="Site Title">
            <input className="admin-input" value={settings.siteTitle} onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })} />
          </FormField>
          <FormField label="Site Description (SEO)">
            <textarea className="admin-input" rows={3} value={settings.siteDescription} onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })} />
          </FormField>
          <FormField label="Keywords">
            <input className="admin-input" value={settings.keywords || ""} onChange={(e) => setSettings({ ...settings, keywords: e.target.value })} />
          </FormField>
          <FormField label="Footer Text">
            <input className="admin-input" value={settings.footerText || ""} onChange={(e) => setSettings({ ...settings, footerText: e.target.value })} />
          </FormField>
        </div>
      </div>

      <div>
        <PageHeader title="Profile Settings" description="Update your admin account" action={<SaveButton onSave={saveProfile} label="Update Profile" />} />
        <div className="admin-card grid gap-4 sm:grid-cols-2">
          <FormField label="Name">
            <input className="admin-input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </FormField>
          <FormField label="Email">
            <input type="email" className="admin-input" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </FormField>
          <FormField label="Current Password">
            <input type="password" className="admin-input" value={profile.currentPassword} onChange={(e) => setProfile({ ...profile, currentPassword: e.target.value })} />
          </FormField>
          <FormField label="New Password">
            <input type="password" className="admin-input" value={profile.newPassword} onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })} />
          </FormField>
        </div>
      </div>
    </div>
  );
}
