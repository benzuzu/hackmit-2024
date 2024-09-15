"use client";

import { useAction } from "convex/react";
import React, { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Story() {
  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs

  const generateTexts = useAction(api.chapterGeneration.generateTexts);
  const generateImages = useAction(api.chapterGeneration.generateImages);

  const character1 =
    "Jordan is a 17-year-old high school student with short, slightly messy brown hair and warm hazel eyes that convey a sense of curiosity and youthful energy. He stands at 5'9\", with a lean build and a casual, laid-back posture. He's wearing a navy blue hoodie over a graphic t-shirt, faded jeans, and well-worn sneakers. A backpack hangs over one shoulder, and white earbuds dangle loosely around his neck. His expression is thoughtful, with a slight, confident smile. He has a few freckles scattered across his face and a pair of black-rimmed glasses resting on his nose.";

  const character2 =
    "Emily is a 16-year-old high school student with shoulder-length straight blonde hair, styled neatly with a simple headband. She has bright blue eyes that sparkle with enthusiasm and a warm, friendly smile. She stands at 5'5\", with a petite build and a relaxed, confident posture. She's wearing a light pink sweater, a denim skirt, and white sneakers. A floral-patterned backpack is slung over both shoulders, and she's holding a notebook covered in doodles. Her face is lightly freckled, and she's wearing small silver hoop earrings.";

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
        const texts: string[] = await generateTexts({
          character1,
          character2,
        });
        const images: string[] = await generateImages({
          character1,
          character2,
          texts,
        });
        setTexts(texts);
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
