"use client";

import { useAction } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Chapter } from "../components/chapters/chapter";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useStateContext } from "../components/StateContext";
import { TLoadedChapter } from "@/convex/types";

export default function Story() {
  const router = useRouter();
  const { sharedState } = useStateContext();

  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs
  const [chapterIndex, setChapterIndex] = useState<number>(
    sharedState.currentChapter ?? 1
  );

  const loadChapterData = useAction(api.chapter.loadChapterData);

  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      try {
        const chapterData: TLoadedChapter = await loadChapterData({
          storyId: sharedState.currentStory! as Id<"stories">,
          chapterIndex: BigInt(chapterIndex),
        });
        setTexts(chapterData.texts);
        setImages(chapterData.images);
      } catch (error) {
        console.error("Error generating chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterIndex, loadChapterData, sharedState.currentStory]);

  const handlePreviousChapter = () => {
    if (chapterIndex > 0) {
      setChapterIndex(chapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (chapterIndex < sharedState.currentChapter!) {
      setChapterIndex(chapterIndex + 1);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between w-full">
              <div
                className={`text-2xl underline cursor-pointer ${chapterIndex == 0 && "invisible"}`}
                onClick={handlePreviousChapter}
              >
                previous chapter
              </div>
              <div
                className={`text-2xl underline cursor-pointer ${chapterIndex == sharedState.currentChapter && "invisible"}`}
                onClick={handleNextChapter}
              >
                next chapter
              </div>
            </div>
            <Chapter
              chapterNumber={chapterIndex}
              imageUrls={images}
              text={texts}
            />
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
