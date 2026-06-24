"use client";

import Modal from "@/components/ui/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useState } from "react";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  btnText?: string;
}

const AuthModal = ({ open, setOpen, btnText = "Confirm" }: ModalProps) => {
  const [show, setShow] = useState("login");
  return (
    <>
      {/* <Modal btnText={btnText} isOpen={open} onClose={() => setOpen(false)}>
        {show === "login" ? (
          <LoginForm pageShow={setShow} />
        ) : (
          <RegisterForm pageShow={setShow} />
        )}
      </Modal> */}
    </>
  );
};
export default AuthModal;
