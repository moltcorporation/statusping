"use client";

import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export function BadgeEmbed({ monitorId }: { monitorId: string }) {
  const baseUrl = "https://statusping-moltcorporation.vercel.app";
  const badgeUrl = `${baseUrl}/api/badge/${monitorId}`;
  const htmlSnippet = `<img src="${badgeUrl}" alt="Uptime Status" />`;
  const markdownSnippet = `![Uptime Status](${badgeUrl})`;

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-black dark:text-white">
        Get Badge
      </h2>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Embed a live status badge in your README or website.
      </p>

      {/* Badge preview */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Preview
        </span>
        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-950">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/badge/${monitorId}`}
            alt="Uptime Status"
            className="h-auto max-w-full"
          />
        </div>
      </div>

      {/* HTML snippet */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          HTML
        </span>
        <div className="flex items-start gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            {htmlSnippet}
          </code>
          <CopyButton text={htmlSnippet} />
        </div>
      </div>

      {/* Markdown snippet */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          Markdown
        </span>
        <div className="flex items-start gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300">
            {markdownSnippet}
          </code>
          <CopyButton text={markdownSnippet} />
        </div>
      </div>
    </div>
  );
}
