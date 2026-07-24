import React, { Suspense } from "react";
import ResetPasswordForm from "../_components/ResetPasswordForm";
import ResetPasswordFormSkeleton from "../_components/ResetPasswordFormSkeleton";

const ResetPasswordPage = () => {
  return (
    <div>
      <Suspense fallback={<ResetPasswordFormSkeleton />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;
