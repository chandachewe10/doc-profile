"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-warm-light via-cream to-sand px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-earth/10">
            <Lock className="h-7 w-7 text-earth" />
          </div>
          <h1 className="font-serif text-3xl font-light text-ink">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-muted">Sign in to manage your website content</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-card space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div>
            <label className="admin-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input"
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="admin-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" disabled={loading} className="admin-btn-primary w-full">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Default credentials are set in your <code className="text-earth">.env</code> file
        </p>
      </div>
    </div>
  );
}
