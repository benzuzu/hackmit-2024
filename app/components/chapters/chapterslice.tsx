"use client";

import { useState } from "react";
import { ChapterEnd } from "./chapterend";
import React from "react";
import { useRouter } from "next/navigation";
import { TChapter } from "../../../convex/types";
import { generateAndStoreChapter } from "../../../convex/chapterGeneration";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

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
  const router = useRouter();
  const [currentSlice, setCurrentSlice] = useState(0);
  const endChapter = currentSlice === text.length;

  const generateAndStoreChapter = useAction(
    api.chapterGeneration.generateAndStoreChapter
  );

  const generateNewChapter = async (words: string[]) => {
    try {
      if (words) {
        // Generate and fetch the chapter
        const chapter: TChapter = await generateAndStoreChapter({
          storyId: "j97752neevjp28tme8a1zs5z2570twc5" as Id<"stories">,
          words: JSON.stringify(words),
        });
      } else {
        throw new Error("Words not found in local storage");
      }
    } catch (error) {
      console.error("Error generating chapter:", error);
    }
  };

  const handleSubmit = async (words: string[]) => {
    console.log("Words submitted:", words);
    generateNewChapter(words);
    setCurrentSlice(0);
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {endChapter ? (
        <ChapterEnd handleSubmit={handleSubmit} />
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
