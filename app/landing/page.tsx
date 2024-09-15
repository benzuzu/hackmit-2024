"use client"

import { useEffect, useState } from 'react';

// Define a type for the fade-in state
type FadeInState = {
  sunset: boolean;
  mountains: boolean;
  landscape: boolean;
  clouds: boolean;
  content: boolean;
};

const LandingPage: React.FC = () => {
  // Initialize state with TypeScript's useState and type it as FadeInState
  const [fadeIn, setFadeIn] = useState<FadeInState>({
    sunset: false,
    mountains: false,
    landscape: false,
    clouds: false,
    content: false,
  });

  // Handle the sequential fade-in
  useEffect(() => {
    setTimeout(() => setFadeIn((prev) => ({ ...prev, sunset: true })), 500);
    setTimeout(() => setFadeIn((prev) => ({ ...prev, mountains: true })), 1500);
    setTimeout(() => setFadeIn((prev) => ({ ...prev, landscape: true })), 2500);
    setTimeout(() => setFadeIn((prev) => ({ ...prev, clouds: true })), 3500);
    setTimeout(() => setFadeIn((prev) => ({ ...prev, content: true })), 4500);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Sunset */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-sunset bg-cover transition-opacity duration-1000 ease-in-out ${fadeIn.sunset ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Mountains */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-mountains bg-cover transition-opacity duration-1000 ease-in-out ${fadeIn.mountains ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Landscape */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-landscape bg-cover transition-opacity duration-1000 ease-in-out ${fadeIn.landscape ? 'opacity-100' : 'opacity-0'}`}
      />
      {/* Clouds */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-clouds bg-cover transition-opacity duration-1000 ease-in-out ${fadeIn.clouds ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <h1 className={`text-5xl font-bold text-white transition-opacity duration-1000 ease-in-out ${fadeIn.content ? 'opacity-100' : 'opacity-0'}`}>
          Create Your Fable
        </h1>
        <button
          className={`mt-6 px-8 py-3 bg-blue-500 text-white rounded-lg shadow-lg transition-opacity duration-1000 ease-in-out ${fadeIn.content ? 'opacity-100' : 'opacity-0'}`}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
