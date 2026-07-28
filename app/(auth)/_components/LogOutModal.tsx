"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import { useLogoutMutation } from "@/src/redux/api/auth/authApi";
import { baseApi } from "@/src/redux/api/baseApi";
import { logout as clearAuth } from "@/src/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "sonner";

const LogOutModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const handleClose = () => {
    onClose();
  };
  const handleLogOut = async () => {
    const toastId = toast.loading("Signing out...");

    try {
      await logout().unwrap();
      localStorage.removeItem("accessToken");
      dispatch(clearAuth());
      dispatch(baseApi.util.resetApiState());
      toast.success("Signed out successfully.", {
        id: toastId,
      });

      handleClose();
      router.push("/");
    } catch (error) {
      toast.error("Failed to sign out.", {
        id: toastId,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className=" bg-white px-4 md:px-8 lg:px-10 xl:px-10 rounded-3xl overflow-hidden flex flex-col items-center">
        <div className=" p-4 rounded-full bg-gray-300">
          <AiOutlineLogout className="size-12 text-[#EB3D4D]" />
        </div>
        <h2 className="text-2xl lg:text-3xl xl:text-[32px] font-semibold text-primary mt-5 text-center">
          Logout Account?
        </h2>
        <p className="text-sm lg:text-lg font-normal text-accent mt-3 text-center">
          Are you sure want to logout your account?
        </p>
        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            className="h-10 text-[#777980]"
            variant="secondary"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleLogOut}
            className="h-10 bg-[#EB3D4D] hover:bg-[#f14a5a]"
          >
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogOutModal;
