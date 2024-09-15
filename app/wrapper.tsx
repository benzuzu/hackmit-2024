import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

export function Wrapper({ children, onClose }: WrapperProps) {
  return (
    <div className="border-2 border-black fixed inset-0 rounded-lg sm:ml-20 mr-3 ml-3  mt-2 mb-2 p-8 overflow-hidden z-20">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Scrollable content inside */}
      <div className="h-full overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100">
        {children}
      </div>
    </div>
  );
}
