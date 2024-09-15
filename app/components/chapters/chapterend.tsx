"use client"

import { useState } from "react";

export function ChapterEnd() {
  // State to hold the input for the 5 words
  const [words, setWords] = useState<string[]>(["", "", "", "", ""]);
  const [error, setError] = useState("");

  // Handle input change for each word
  const handleWordChange = (index: number, value: string) => {
    const updatedWords = [...words];
    updatedWords[index] = value;
    setWords(updatedWords);
    setError(""); // Reset error when input changes
  };

  // Handle form submission
  const handleSubmit = () => {
    const filledWords = words.every((word) => word.trim() !== "");

    if (filledWords) {
      // Handle valid input (you can process this further)
      console.log("User's input:", words);
      // Example: send the input to an API or save it for later
    } else {
      // Set error message if any word is missing
      setError("Please fill in all 5 words.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg w-full sm:w-2/3 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
        What should happen next? Give us 5 words.
      </h2>

      {/* Container for the 5 word input boxes */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {words.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleWordChange(index, e.target.value)}
            placeholder={`Word ${index + 1}`}
            className="border border-gray-300 dark:border-gray-700 p-2 rounded-lg w-20 text-gray-900 dark:text-gray-100 text-center"
            maxLength={10} // Optional: limit the length of each word
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-500 font-semibold mb-4">
          {error}
        </p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Submit
      </button>
    </div>
  );
}