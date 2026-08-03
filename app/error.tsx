"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg">
        <h1 className="text-5xl font-bold">
          Something went wrong
        </h1>

        <p className="mt-4 text-muted-foreground">
          An unexpected error occurred.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button onClick={reset}>
            Try Again
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.href = "/"}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}