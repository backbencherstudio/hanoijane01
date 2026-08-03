import ButtonGroup from "@/components/ui/ButtonGroup";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-7xl font-bold">
          403
        </h1>

        <h2 className="text-3xl mt-4">
          Access Denied
        </h2>

        <p className="mt-3 text-muted-foreground">
          You don&apos;t have permission to access this page.
        </p>

        <div className="mt-8">
          <ButtonGroup pathName="/">
            Back Home
          </ButtonGroup>
        </div>

      </div>

    </div>
  );
}