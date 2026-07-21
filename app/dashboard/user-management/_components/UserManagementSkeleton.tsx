export const UserManagementSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full flex flex-col gap-4 sm:flex-row justify-between items-start">
        <div className="w-full space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded" />
          <div className="h-5 w-72 bg-gray-200 rounded" />
        </div>
      </div>

      <div className="my-9 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
        ))}
      </div>

      <div className="bg-white rounded-2xl px-5 py-4">
        <div className="h-10 bg-gray-200 rounded w-full mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
};