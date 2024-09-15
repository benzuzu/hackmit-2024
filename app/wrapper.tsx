import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
  onClose?: () => void;
}

export function Wrapper({ children, onClose }: WrapperProps) {
  return (
    <div className="fixed inset-0 rounded-lg sm:ml-20 mr-4 mt-2 mb-2 p-8 overflow-hidden z-20">
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
          stroke="currentColor"
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
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
