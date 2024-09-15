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
import { SharedState, useStateContext } from "../StateContext";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

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
  const { sharedState, setSharedState } = useStateContext();

  const generateAndStoreChapter = useAction(
    api.chapterGeneration.generateAndStoreChapter
  );

  const generateNewChapter = async (words: string[]) => {
    try {
      if (words) {
        // Generate and fetch the chapter
        await generateAndStoreChapter({
          storyId: sharedState.currentStory! as Id<"stories">,
          words: JSON.stringify(words),
        });
        setSharedState((prevState: SharedState) => ({
          ...prevState,
          currentChapter: sharedState.currentChapter! + 1,
        }));
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
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            Chapter {chapterNumber}
          </h2>

          {/* Container for text and button */}
          <div className="flex justify-between items-center">
            {/* Chapter Text */}
            <div className="text-lg text-gray-800  w-3/4">
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
              className="bg-black text-white px-4 py-2 rounded hover:bg-black"
            >
              {/* <div className="fixed bottom-4 left-20">
                {currentSlice > 0 && (
                  <button className="p-5" onClick={() => setCurrentSlice((prev) => prev == 0 ? prev : prev - 1)}>
                    <ArrowLeftIcon className="h-6 w-6 ml-2" />
                  </button>
                )}
              </div>
              <div className="fixed bottom-4 right-4">
                {currentSlice < text.length && (
                  <button className="p-5" onClick={() => setCurrentSlice((prev) => prev + 1)}>
                    <ArrowRightIcon className="h-6 w-6 ml-2" />
                  </button>
                )}
              </div> */}
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
}
