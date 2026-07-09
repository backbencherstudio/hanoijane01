import { Skeleton } from "@/components/ui/skeleton";

const SidebarSkeleton = () => {
  return (
    <aside className="hidden lg:block fixed top-0 left-0 h-screen w-68 bg-[#114263] text-white z-50">
      {/* Logo area */}
      <div className="h-18 border-b border-gray-500 flex justify-between px-2.5 items-center">
        <Skeleton className="w-14 h-12 bg-white/10" />
      </div>

      <nav className="space-y-2 p-2.5 text-sm font-medium">
        {/* 5 menu items with icons */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5">
              <Skeleton className="w-4 h-4 rounded bg-white/20" />
              <Skeleton className="h-4 flex-1 bg-white/20" />
              <Skeleton className="w-4 h-4 rounded bg-white/20" />
            </div>
            {/* Some nested items */}
            {idx === 1 && (
              <div className="ml-5 pl-4 space-y-2 border-l border-white/10">
                <Skeleton className="h-8 w-full bg-white/10 rounded" />
                <Skeleton className="h-8 w-full bg-white/10 rounded" />
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarSkeleton;