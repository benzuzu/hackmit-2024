"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs

  const generateTexts = useAction(api.chapterGeneration.generateTexts);
  const generateImages = useAction(api.chapterGeneration.generateImages);

  const character1 =
    "A tall, muscular warrior named Aria with long, wavy silver hair and piercing blue eyes. She has a scar running down her right cheek, and her skin is a fair, almost pale tone. Aria wears a suit of medieval silver armor engraved with intricate runes, and a blue cape flowing behind her. She stands confidently with a hand resting on the hilt of her sword, her face set in a determined but calm expression. Her eyes gleam with intelligence and courage. Around her neck is a small silver pendant shaped like a hawk. Her boots are sturdy leather, worn from years of battle, and she carries a shield emblazoned with a dragon emblem.";

  const character2 =
    "Talon is a tall, lean man standing at 6'2\", with a wiry yet muscular build. His skin is a light tan, with a faint scar running across his left eyebrow. He has a sharp, angular face, framed by short, messy black hair swept back. His deep-set grey eyes are piercing and constantly scanning with a calculating, cold intensity. His nose is narrow and slightly crooked from an old break, and his lips are thin, giving him a stern expression. A jagged scar cuts across his jawline, adding to his dangerous appearance. Talon wears a black leather hooded cloak down to his knees, blending seamlessly with his dark, close-fitting armor made of matte black leather with silver accents.";

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

// import { useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { useEffect } from "react";

// export default function Home() {
//   const image = useQuery(api.chapter.imageTest);
//   const storeGeneratedChapter = useAction(api.chapter.storeGeneratedChapter);

//   useEffect(() => {
//     // storeGeneratedChapter({storyId: "jd7bwcwma5tedap0ct1s6806zh70rwyq" as Id<"stories">, generatedText: ["hee hee hee haw"], generatedImageUrls: ["https://oaidalleapiprodscus.blob.core.windows.net/private/org-d42nrgyj7SuhjDsnvmUZU5Zv/user-d9fjbULtGIIEX60En7lzvc95/img-dNw6H0yDtIrRwXTnGLorVtWB.png?st=2024-09-14T23%3A26%3A25Z&se=2024-09-15T01%3A26%3A25Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A22%3A20Z&ske=2024-09-15T23%3A22%3A20Z&sks=b&skv=2024-08-04&sig=aDPADpTm8/Pqo2E42hu2mG61htiCrm0ASuUD9IHj%2Bcc%3D"]});

//   }, [storeGeneratedChapter])

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
//       <img src={image} height="300px" width="auto" alt="gen" />
//     </main>
//   );
// }
