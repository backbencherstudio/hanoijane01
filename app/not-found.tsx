import Link from "next/link";
import ButtonGroup from "@/components/ui/ButtonGroup";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-lg">

        <h1 className="text-8xl font-bold text-primary">
          404
        </h1>

        <h2 className="text-3xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="mt-4 text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="mt-8 flex justify-center">
          <ButtonGroup pathName="/">
            Back Home
          </ButtonGroup>
        </div>

      </div>
    </div>
  );
}