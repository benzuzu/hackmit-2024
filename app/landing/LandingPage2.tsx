import { useState } from "react";
import StoriesPage from "../stories/page";

export default function LandingPage2() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Function to open the modal
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="relative">
        {/* Main page content */}
        <div className={`p-6 ${isModalOpen ? "blur-sm" : ""}`}>
          <h1 className="text-2xl font-bold">Home Page</h1>
          <p>This is the main content of the page.</p>
          <button
            onClick={openModal}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Open Trending Modal
          </button>
        </div>
  
        {/* Modal (conditionally rendered) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl shadow-lg relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Trending</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 transition"
                >
                  &times;
                </button>
              </div>
              {/* TrendingPage component */}
              <StoriesPage />
            </div>
          </div>
        )}
      </div>
    );
  }