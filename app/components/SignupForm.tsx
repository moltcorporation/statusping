"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupForm() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [upgradeUrl, setUpgradeUrl] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setUpgradeUrl("");

    let normalizedUrl = url.trim();
    if (!normalizedUrl) return;
    if (!email.trim()) {
      setError("Email is required to receive alerts.");
      return;
    }

    if (
      !normalizedUrl.startsWith("http://") &&
      !normalizedUrl.startsWith("https://")
    ) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/monitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl, email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        if (data?.upgradeUrl) {
          setUpgradeUrl(data.upgradeUrl);
        }
        throw new Error(data?.error || "Something went wrong. Try again.");
      }

      setSuccess(true);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex w-full flex-col items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <span className="text-lg font-semibold text-green-700 dark:text-green-400">
          Monitor added!
        </span>
        <p className="text-sm text-green-600 dark:text-green-400">
          Check your email to verify and activate monitoring. We&apos;ll
          start checking your site once verified.
        </p>
        <button
          onClick={() => {
            setSuccess(false);
            setUrl("");
            setEmail("");
          }}
          className="mt-2 text-sm font-medium text-green-700 underline hover:text-green-900 dark:text-green-400 dark:hover:text-green-200"
        >
          Add another URL
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex w-full flex-col gap-3"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://your-site.com"
        disabled={loading}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        disabled={loading}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-base text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
      />
      <button
        type="submit"
        disabled={loading || !url.trim() || !email.trim()}
        className="w-full rounded-lg bg-black px-6 py-3 text-base font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Adding..." : "Monitor Your Site Free"}
      </button>

      {error && upgradeUrl ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-zinc-300 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-sm font-medium text-black dark:text-white">
            You&apos;ve reached the free tier limit of 10 monitors.
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Unlock unlimited monitors and 5-minute checks.
          </p>
          <Link
            href={upgradeUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Unlock 5-min checks — $9/mo
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      ) : error ? (
        <p className="text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </form>
  );
}
