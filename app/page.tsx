"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { Chapter } from "./chapters/chapter";
import StoriesPage from "./stories/stories";
import LandingPage from "./landing/LandingPage";
import LandingPage2 from "./landing/LandingPage2";
import Vara from 'vara'
import { VaraText } from "./handwriting";


export default function Home() {
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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2">
        {/* {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <Chapter
                chapterNumber={1}
                imageUrls={images}
                text={texts}
              />
            </div>
          </>
        )} */}
        <div className="flex flex-col gap-4">
          <LandingPage/>
        </div>
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
