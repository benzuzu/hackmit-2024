interface ModalProps {
    isOpen: boolean; // Whether the modal is open
    onClose: () => void; // Function to close the modal
    onSelectOption: (option: "story" | "character") => void; // Function to handle option selection
  }
  
  const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSelectOption }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Select an Option</h2>
          <div className="flex flex-col space-y-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              onClick={() => onSelectOption("story")}
            >
              Add Story
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              onClick={() => onSelectOption("character")}
            >
              Add Character
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal;
  