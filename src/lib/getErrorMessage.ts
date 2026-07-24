import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

type ErrorData = Record<string, unknown> | undefined;

function extractString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    const obj = value as ErrorData;
    if (obj && typeof obj.message === "string") return obj.message;
    if (obj && typeof obj.error === "string") return obj.error;
  }
  return undefined;
}

export function getErrorMessage(error: unknown, fallback: string): string {
  const fetchError = error as FetchBaseQueryError;
  const data = fetchError.data as ErrorData | undefined;
  if (data) {
    const topLevel =
      extractString(data.message) ?? extractString(data.error);
    if (topLevel) return topLevel;
  }
  return fallback;
}
