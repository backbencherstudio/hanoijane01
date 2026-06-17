
"use client";

import ButtonGroup from "@/components/ui/ButtonGroup";
import Modal from "@/components/ui/Modal";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  btnText?: string;
}

const ModalName = ({ open, setOpen, btnText = "Confirm" }: ModalProps) => {
  return (
    <>
      <Modal btnText={btnText} isOpen={open} onClose={() => setOpen(false)}>
        <div className="w-183.25 max-h-[90vh] overflow-y-auto">
          <div className="text-center">
            <h1 className=" text-3xl font-semibold text-primary">
              Modal Title
            </h1>
            <p className="text-accent lg:text-lg max-w-87.5 mt-3 mx-auto">
                Modal Subtitle
            </p>
          </div>

          <form>
            {/* content */}
            <div className="my-8">
                <div>
                    {/* email */}
                    <div>

                    </div>
                </div>
            </div>
            {/* button */}
            <div className="flex justify-center items-center w-full">
              <ButtonGroup className="px-6">{btnText}</ButtonGroup>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default ModalName;
