"use client";

import { ReactNode, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const ModalContent = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full h-screen bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center p-4">
      {children}
    </div>
  );
};

const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: ReactNode;
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let element = document.querySelector("#modal-container") as HTMLElement;
    let created = false;

    if (!element) {
      element = document.createElement("div");
      element.id = "modal-container";
      document.body.appendChild(element);
      created = true;
    }

    setContainer(element);

    return () => {
      if (created && element?.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, []);

  return container && isOpen
    ? createPortal(<ModalContent>{children}</ModalContent>, container)
    : null;
};

export default Modal;
