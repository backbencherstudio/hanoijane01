import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorData = Record<string, unknown> | undefined;

function extractString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) {
    return String(value[0]);
  }
  if (typeof value === "object" && value !== null) {
    const obj = value as ErrorData;
    // Check for array message first (before string error)
    if (obj && Array.isArray(obj.message) && obj.message.length > 0) {
      return String(obj.message[0]);
    }
    if (obj && typeof obj.message === "string") return obj.message;
    if (obj && typeof obj.error === "string") return obj.error;
  }
  return undefined;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  const fetchError = error as FetchBaseQueryError;
  const data = fetchError.data as ErrorData | undefined;
  if (data) {
    // First try top-level message/error
    const topLevel = extractString(data.message) ?? extractString(data.error);
    if (topLevel) return topLevel;
    
    // Handle nested message object: { message: [...], error: "...", statusCode: 400 }
    // This handles responses like: { success: false, message: { message: [...], error: "Bad Request" } }
    if (data.message && typeof data.message === "object") {
      const nested = data.message as Record<string, unknown>;
      if (nested.message) {
        const nestedMessage = extractString(nested.message);
        if (nestedMessage) return nestedMessage;
      }
    }
  }
  return fallback;
}
