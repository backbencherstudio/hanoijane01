import React from "react";

const user: {
  first_name: string;
  middle_name: string;
  last_name: string;
  image: string;
  company: string;
  email: string;
  phone: string;
  company_address: string;
  password: string;
  document: string[];
} = {
  first_name: "Jacob",
  middle_name: "",
  last_name: "Jones",
  image: "/assets/profile.png",
  company: "The Walt Disney Company",
  email: "jacob@gmail.com",
  phone: "1999999999",
  company_address: "3891 Ranchview Dr. Richardson, California 62639",
  password: "**********",
  document: ["/assets/ita.pdf"],
};

const ProfilePage = () => {
  return (
    <div>
      {/* content */}
      Profile
    </div>
  );
};

export default ProfilePage;
