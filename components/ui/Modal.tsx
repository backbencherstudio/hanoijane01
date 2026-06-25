import { X } from "lucide-react";
import { Button } from "./button";
import ButtonGroup from "./ButtonGroup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  btnText?: string;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  btnText = "Confirm",
}: ModalProps) => {
  return (
    // Backdrop – fades in/out
    <div
      className={`
        fixed inset-0 bg-black/50 flex items-center justify-center z-50
        transition-opacity duration-300 ease-in-out 
        ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      onClick={onClose}
    >
      {/* Modal card – scales and fades */}
      <div className="rounded-xl overflow-hidden">
        <div className="relative w-screen md:w-fit">
          <div
            className={`
          relative bg-white rounded-xl px-4 py-8 lg:p-8 min-w-50 mx-4 xl:mx-0 
          transition-all duration-300 ease-in-out transform max-h-[90vh] overflow-y-auto
          ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-6">{children}</div>
            {/* <div>
          <ButtonGroup>{btnText}</ButtonGroup>
        </div> */}
          </div>
          <div className="absolute top-4 md:top-6 right-8 md:right-8">
            <Button onClick={onClose} className="w-9 h-9" variant="secondary">
              <X className="size-6 text-[#777980]" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
