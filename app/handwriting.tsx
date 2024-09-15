import React, { useEffect } from "react";
import Vara from "vara";

export function VaraText({ text }: { text: string }) {
  useEffect(() => {
    // Clear the container before reinitializing
    const container = document.getElementById("vara-container");
    if (container) {
      container.innerHTML = ""; // Clear any existing content
    }

    // Initialize Vara instance
    const vara = new Vara(
      "#vara-container",
      "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
      [
        {
          text: text,
          fontSize: 80, // Decrease font size
          strokeWidth: 1,
        },
      ]
    );

    // Cleanup on component unmount
    return () => {
      if (container) {
        container.innerHTML = ""; // Clean up Vara instance
      }
    };
  }, [text]);

  return (
    <div
      id="vara-container"
      className="z-[20] max-w-full" // Ensure the container uses full width
      style={{ whiteSpace: "nowrap", overflow: "hidden" }} // Prevent text wrapping
    ></div>
  );
}
