"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { Chapter } from "./chapters/chapter";
import { Id } from "@/convex/_generated/dataModel";
import { TChapter } from "@/convex/types";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs
  const [chapterIndex, setChapterIndex] = useState<number>(0)

  const generateAndStoreChapter = useAction(api.chapterGeneration.generateAndStoreChapter);
  const getImages = useAction(api.chapter.getImages);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
        const chapter: TChapter = (await generateAndStoreChapter({ storyId: "jd7bwcwma5tedap0ct1s6806zh70rwyq" as Id<"stories"> }))!;
        setTexts(chapter.texts)
        const imageUrls = await getImages({ images: chapter.images })
        setImages(imageUrls)
        setChapterIndex(Number(chapter.index))
      } catch (error) {
        console.error("Error generating chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [generateAndStoreChapter, getImages]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <Chapter
                chapterNumber={chapterIndex}
                imageUrls={images}
                text={texts}
              />
            </div >
          </>
        )
        }
      </main >

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div >
  );
}

