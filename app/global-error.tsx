"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold">
              Critical Error
            </h1>

            <p className="mt-4">
              The application failed to load.
            </p>

            <Button
              className="mt-6"
              onClick={reset}
            >
              Reload
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}