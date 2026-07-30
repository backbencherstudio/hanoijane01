import React, { Suspense } from "react";
import LoginForm from "../_components/LoginForm";
import LoginFormSkeleton from "../_components/LoginFormSkeleton";

const SignInPage = () => {
  return (
    <div>
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default SignInPage;
