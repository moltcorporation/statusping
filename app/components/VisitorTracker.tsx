"use client";

import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const trackData = JSON.stringify({
      path: window.location.pathname,
      utm_source: params.get("utm_source") || null,
    });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon("/api/track", new Blob([trackData], { type: "application/json" }));
    } else {
      fetch("/api/track", { method: "POST", body: trackData, keepalive: true }).catch(() => {});
    }
  }, []);

  return null;
}
