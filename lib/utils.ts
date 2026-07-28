import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Truncates a string to the first `count` words.
 * Used to shorten long category titles like "Premium Size (6m x 2m, rectangle)"
 * to just "Premium Size".
 */
export function truncateWords(text: string, count: number = 2): string {
  return text.split(/\s+/).slice(0, count).join(" ");
}
