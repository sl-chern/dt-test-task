import { ReactNode } from "react";

export interface OptionItemProps {
  isCorrect: boolean;
  children?: ReactNode;
}

export default function OptionItem({ isCorrect, children }: OptionItemProps) {
  return (
    <div className={isCorrect ? "text-green-600 font-medium" : ""}>
      {children}
    </div>
  );
}
