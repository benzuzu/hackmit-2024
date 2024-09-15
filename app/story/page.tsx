"use client";

import { useAction, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Chapter } from "../components/chapters/chapter";
import type { TChapter } from "@/convex/types";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

export default function Story() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs
  const [chapterIndex, setChapterIndex] = useState<number>(0);

  const generateAndStoreChapter = useAction(
    api.chapterGeneration.generateAndStoreChapter
  );
  const getImages = useAction(api.chapter.getImages);
  const firstStory = useQuery(api.story.getFirstStory);

  // Create the function that can be called manually or during the initial render
  const generateNewChapter = async () => {
    setLoading(true);
    try {
      const words = sessionStorage.getItem("words");
      if (words) {
        // Generate and fetch the chapter
        const chapter: TChapter = (await generateAndStoreChapter({
          storyId: "j97752neevjp28tme8a1zs5z2570twc5" as Id<"stories">,
          words,
        }))!;
        setTexts(chapter.texts);
        const imageUrls = await getImages({ images: chapter.images });
        setImages(imageUrls);
        setChapterIndex(Number(chapter.index));
      } else {
        throw new Error("Words not found in local storage");
      }
    } catch (error) {
      console.error("Error generating chapter:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call the chapter generation function on initial render
  useEffect(() => {
    generateNewChapter();
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <Chapter
              chapterNumber={chapterIndex}
              imageUrls={images}
              text={texts}
              generateNewChapter={generateNewChapter}
            />
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
