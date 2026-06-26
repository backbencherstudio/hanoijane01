import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const MyProfilePage = () => {
  return (
    <div className="p-4 lg:p-6 rounded-2xl bg-white">
      <form>
        {/* full name */}
        <div>
          <label htmlFor="standName" className="font-medium">
            Full Name <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="standName"
            placeholder="Full Name"
            className=" mt-2"
          />
        </div>
        {/* email */}
        <div>
          <label htmlFor="standName" className="font-medium">
            Email Address <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="standName"
            placeholder="Standard Stand"
            className=" mt-2"
          />
        </div>
        {/* phone */}
        <div>
          <label htmlFor="standName" className="font-medium">
            Phone number <span className="text-red-600">*</span>
          </label>
          <Input
            type="text"
            id="standName"
            placeholder="Standard Stand"
            className=" mt-2"
          />
        </div>
        
      </form>
      <div>
        <Button></Button>
      </div>
    </div>
  );
};

export default MyProfilePage;
