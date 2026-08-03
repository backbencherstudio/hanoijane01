export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fbfbfd]">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary">
            Loading...
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please wait while we prepare everything for you.
          </p>
        </div>
      </div>
    </div>
  );
}