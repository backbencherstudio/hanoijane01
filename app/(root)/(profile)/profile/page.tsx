"use client";

import PersonalInformationForm from "./_components/PersonalInformationForm";
import VerificationDocuments from "./_components/VerificationDocuments";

const MyProfilePage = () => {
  return (
    <div className="space-y-6 bg-white px-6 pt-6 pb-12 rounded-xl">
      {/* Personal Information */}
      <PersonalInformationForm />

      {/* Verification Documents */}
      <VerificationDocuments />
    </div>
  );
};

export default MyProfilePage;