import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function extractUrl(text: string): string | null {
  try {
    const urlRegex = /(https?:\/\/[^\s]+)/;
    const match = text.match(urlRegex);
    if (match) {
      const url = new URL(match[0]);
      if (url.hostname && url.hostname.includes(".")) {
        return url.toString();
      }
    }
  } catch {
    // Ignore invalid URLs
  }
  return null;
}
