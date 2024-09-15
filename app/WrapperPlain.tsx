import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export default function WrapperPain({ children }: WrapperProps) {
  return (
    <div className="fixed inset-0 rounded-lg sm:ml-20 mr-3 ml-3  mt-2 mb-2 p-8 overflow-hidden z-20">
      {/* Scrollable content inside */}
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
