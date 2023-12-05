import React from "react";
import { BsPrinter } from "react-icons/bs";

const FloatingButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <button
      className="fixed bottom-10 right-10 flex h-12 w-12 items-center justify-center rounded-full p-0"
      {...props}
    >
      <BsPrinter />
    </button>
  );
};

export default FloatingButton;
