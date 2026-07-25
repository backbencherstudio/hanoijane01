"use client";

import PersonalInformationForm from "./_components/PersonalInformationForm";
import ChangePasswordForm from "./_components/ChangePasswordForm";
import VerificationDocuments from "./_components/VerificationDocuments";

const MyProfilePage = () => {
  return (
    <div className="space-y-6 bg-white px-6 pt-6 pb-12 rounded-xl">
      {/* Personal Information */}
      <PersonalInformationForm />

      {/* Change Password */}
      <ChangePasswordForm />

      {/* Verification Documents */}
      <VerificationDocuments />
    </div>
  );
};

export default MyProfilePage;