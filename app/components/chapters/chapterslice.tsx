"use client";

import { useState } from "react";
import { ChapterEnd } from "./chapterend";
import React from "react";

interface ChapterSliceProps {
  chapterNumber: number;
  text: string[];
  imageUrls: string[]; // URLs for images to embed within the text
}

export function ChapterSlice({
  chapterNumber,
  text,
  imageUrls,
}: ChapterSliceProps) {
  const [currentSlice, setCurrentSlice] = useState(0);
  const endChapter = currentSlice === text.length;

  return (
    <div className="container mx-auto px-4 py-8">
      {endChapter ? (
        <>
          <ChapterEnd
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            handleSubmit={function (words: string[]): void {
              throw new Error("Function not implemented.");
            }}
          ></ChapterEnd>
        </>
      ) : (
        <>
          {/* Chapter Title */}
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Chapter {chapterNumber}
          </h2>

          {/* Container for text and button */}
          <div className="flex justify-between items-start items-center">
            {/* Chapter Text */}
            <div className="text-lg text-gray-800 dark:text-gray-200 w-3/4">
              {<p>{text[currentSlice]}</p>}
              {/* {text[currentSlice].split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))} */}

              {/* Embed Image within the text */}
              <img
                src={imageUrls[currentSlice]}
                alt={`Generated image ${currentSlice}`}
                className="w-full h-auto mt-4"
              />
            </div>

            {/* Button on the right-hand side */}
            <button
              onClick={() => setCurrentSlice((prev) => prev + 1)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Next Slice
            </button>
          </div>
        </>
      )}
    </div>
  );
}
