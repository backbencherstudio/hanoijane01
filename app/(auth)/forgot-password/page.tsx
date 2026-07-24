import React, { Suspense } from "react";
import ForgotPasswordForm from "../_components/ForgotPasswordForm";
import ForgotPasswordFormSkeleton from "../_components/ForgotPasswordFormSkeleton";

const ForgotPasswordPage = () => {
  return (
    <Suspense fallback={<ForgotPasswordFormSkeleton />}>
      <ForgotPasswordForm />
    </Suspense>
  );
};

export default ForgotPasswordPage;
