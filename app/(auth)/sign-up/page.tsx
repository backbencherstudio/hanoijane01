import React, { Suspense } from "react";
import RegisterForm from "../_components/RegisterForm";
import RegisterFormSkeleton from "../_components/RegisterFormSkeleton";

const SignUpPage = () => {
  return (
    <div>
      <Suspense fallback={<RegisterFormSkeleton />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
