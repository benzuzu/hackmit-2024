import { useState, useEffect } from 'react';
import { VaraText } from "../handwriting";
import { Wrapper } from "../wrapper";

const handleClose = () => {
  console.log("Close button clicked");
};

export default function LandingPage() {
  // State to control the visibility of the button
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Set a timer to change the button visibility to true after 3000 milliseconds
    const timer = setTimeout(() => {
      setButtonVisible(true);
    }, 2200);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper onClose={handleClose}>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center space-x-4">
          <span className="text-7xl font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>We</span>
          <VaraText text="Fable" />
        </div>

        {/* Button with conditional visibility */}
        <button
          className={`mt-8 px-6 py-3 text-black rounded-lg text-lg bg-transparent ${buttonVisible ? 'visible' : 'invisible'} -ml-12`} // Adjust the value as needed
          style={{ transition: 'visibility 0s, opacity 0.5s linear' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </div>
    </Wrapper>
  );
}