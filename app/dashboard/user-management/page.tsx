import { Suspense } from "react";
import { UserManagementSkeleton } from "./_components/UserManagementSkeleton";
import UserManagementContent from "./_components/UserManagementContent";

const UserManagement = () => {
  return (
    <Suspense fallback={<UserManagementSkeleton />}>
      <UserManagementContent />
    </Suspense>
  );
};

export default UserManagement;