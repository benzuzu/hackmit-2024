"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs

  const generateTexts = useAction(api.chapter.generateTexts);
  const generateImages = useAction(api.chapter.generateImages);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
        const result: string[] = await generateTexts(); // Assume result is an array of strings
        const images: string[] = await generateImages({ texts: result }); // Assume result is an array of image URLs
        setTexts(result);
        setImages(images);
      } catch (error) {
        console.error("Error generating chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [generateTexts, generateImages]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {texts.map((text, index) => (
                <div key={index} className="flex flex-col items-start">
                  <p>{text}</p>
                  {images[index] && (
                    <img
                      src={images[index]}
                      alt={`Generated image ${index}`}
                      className="w-full h-auto mt-4"
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
