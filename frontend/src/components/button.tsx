import { ReactNode } from "react";

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  );
}
