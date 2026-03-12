"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CopyStatusLink({ monitorId }: { monitorId: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const url = `${window.location.origin}/status/${monitorId}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={`/status/${monitorId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
      >
        View
      </a>
      <button
        onClick={handleCopy}
        className="rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}

export function EmbedBadge({ monitorId }: { monitorId: string }) {
  const [format, setFormat] = useState<"html" | "markdown">("markdown");
  const [copied, setCopied] = useState(false);

  const badgeUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/badge/${monitorId}`
    : `/api/badge/${monitorId}`;
  const statusUrl = typeof window !== "undefined"
    ? `${window.location.origin}/status/${monitorId}`
    : `/status/${monitorId}`;

  const snippets = {
    markdown: `[![Uptime](${badgeUrl})](${statusUrl})`,
    html: `<a href="${statusUrl}"><img src="${badgeUrl}" alt="Uptime" /></a>`,
  };

  function handleCopy() {
    navigator.clipboard.writeText(snippets[format]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <button
          onClick={() => setFormat("markdown")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            format === "markdown"
              ? "bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          Markdown
        </button>
        <button
          onClick={() => setFormat("html")}
          className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
            format === "html"
              ? "bg-zinc-200 text-black dark:bg-zinc-700 dark:text-white"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          }`}
        >
          HTML
        </button>
      </div>
      <div className="flex gap-2">
        <code className="flex-1 overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {snippets[format]}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 rounded-lg bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function DeleteButton({ monitorId }: { monitorId: string }) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    const res = await fetch(`/api/monitors/${monitorId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.push("/dashboard");
    } else {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-red-600 dark:text-red-400">
          Delete this monitor?
        </span>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Yes, delete"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
    >
      Delete monitor
    </button>
  );
}

export function SlackWebhookForm({
  monitorId,
  currentWebhook,
}: {
  monitorId: string;
  currentWebhook: string | null;
}) {
  const [webhookUrl, setWebhookUrl] = useState(currentWebhook || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch(`/api/monitors/${monitorId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slackWebhookUrl: webhookUrl.trim() || null,
      }),
    });

    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.error || "Failed to save");
    }
    setSaving(false);
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-2">
      <label className="text-sm font-medium text-black dark:text-white">
        Slack Webhook URL
      </label>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Get a webhook URL from your Slack workspace settings. We&apos;ll post
        alerts when your site goes down or recovers.
      </p>
      <div className="flex gap-2">
        <input
          type="url"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          placeholder="https://hooks.slack.com/services/..."
          disabled={saving}
          className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-black placeholder-zinc-400 outline-none transition-colors focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-600 dark:focus:border-zinc-500 dark:focus:ring-zinc-800"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </form>
  );
}
