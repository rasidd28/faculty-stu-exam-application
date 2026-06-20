import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow } from "date-fns";

// ── Tailwind class merger ────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Formatting ───────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd MMM yyyy");
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "dd MMM yyyy, hh:mm a");
}

export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

// ── Strings ──────────────────────────────────────────────────
export function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "…";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Color helpers ─────────────────────────────────────────────
export function getStatusColor(
  status: "ACTIVE" | "BACKGROUND" | "OFFLINE" | string
): string {
  switch (status) {
    case "ACTIVE":
      return "text-emerald-600 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800";
    case "BACKGROUND":
      return "text-amber-600 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800";
    case "OFFLINE":
      return "text-zinc-500 bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-700";
    default:
      return "text-zinc-500 bg-zinc-50 border-zinc-200";
  }
}

export function getParseStatusColor(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400";
    case "PROCESSING":
      return "text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400";
    case "PENDING":
      return "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400";
    case "FAILED":
      return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
    default:
      return "text-zinc-500 bg-zinc-50";
  }
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "EASY":
      return "text-emerald-600 bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400";
    case "MEDIUM":
      return "text-amber-600 bg-amber-50 dark:bg-amber-950 dark:text-amber-400";
    case "HARD":
      return "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400";
    default:
      return "text-zinc-500 bg-zinc-50";
  }
}

export function getMaterialTypeIcon(type: string): string {
  switch (type) {
    case "PDF":
      return "📄";
    case "PPT":
      return "📊";
    case "LECTURE_NOTES":
      return "📝";
    case "LAB_MANUAL":
      return "🔬";
    case "TEXTBOOK":
      return "📚";
    default:
      return "📁";
  }
}

// ── Misc ─────────────────────────────────────────────────────
export function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function percent(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
