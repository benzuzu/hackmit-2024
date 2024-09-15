import { useState } from "react";

export function ChapterForm() {
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
    <div className="flex flex-col items-center justify-center mx-auto">
      <h2 className="font-semibold mb-6 text-center">
        Set your intentions, give us 5 words to inform the plot! 
      </h2>

      {/* Container for the 5 word input boxes */}
      <div className="flex flex-wrap flex-col gap-3 justify-center mb-6">
        {words.map((word, index) => (
          <input
            key={index}
            type="text"
            value={word}
            onChange={(e) => handleWordChange(index, e.target.value)}
            placeholder={`Word ${index + 1}`}
            className="border p-2 rounded-md w-36 text-center focus:outline-none focus:ring-2 focus:ring-black"
            maxLength={20} // Optional: limit the length of each word
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p className="font-semibold mb-4">
          {error}
        </p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        className=" py-3 mt-10 px-8 rounded-md border-2 border-black hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
      >
        Submit
      </button>
    </div>
  );
}
