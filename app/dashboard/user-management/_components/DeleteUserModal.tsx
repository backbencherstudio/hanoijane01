"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  username: string;
}

const DeleteUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  username,
}: DeleteUserModalProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="bg-white px-4 md:px-8 lg:px-10 xl:px-10 rounded-3xl overflow-hidden flex flex-col items-center">
        <div className="p-4 rounded-full bg-gray-300">
          <RiDeleteBin6Line className="size-12 text-[#EB3D4D]" />
        </div>
        <h2 className="text-2xl lg:text-3xl xl:text-[32px] font-semibold text-primary mt-5 text-center">
          Delete User?
        </h2>
        <p className="text-sm lg:text-lg font-normal text-accent mt-3 text-center">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-primary">{username}</span>?
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
            className="h-10 bg-[#EB3D4D] hover:bg-[#f14a5a]"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;