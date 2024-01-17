import React from "react";
import { useClickAway } from "@uidotdev/usehooks";

function Modal({ onClose, children }: { onClose: () => void; children: any }) {
  let ref = useClickAway<HTMLDivElement>(() => {
    onClose();
  });

  return (
    <section className="bg-black/50 flex items-center justify-center fixed inset-0 w-full h-full z-50">
      <div
        ref={ref}
        className="px-4 py-4 bg-light rounded-lg w-fit max-w-md h-fit"
      >
        {children}
      </div>
    </section>
  );
}

export default Modal;
