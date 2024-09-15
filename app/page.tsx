"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";
import { Chapter } from "./chapters/Chapter";
import StoriesPage from "./stories/page";
import LandingPage from "./landing/LandingPage";
import LandingPage2 from "./landing/LandingPage2";
import Vara from 'vara'
import { VaraText } from "./handwriting";
import { Wrapper } from "./Wrapper";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [texts, setTexts] = useState<string[]>(["hello", "hello"]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs

//   const generateTexts = useAction(api.chapterGeneration.generateTexts);
//   const generateImages = useAction(api.chapterGeneration.generateImages);

  const character1 =
    "Jordan is a 17-year-old high school student with short, slightly messy brown hair and warm hazel eyes that convey a sense of curiosity and youthful energy. He stands at 5'9\", with a lean build and a casual, laid-back posture. He's wearing a navy blue hoodie over a graphic t-shirt, faded jeans, and well-worn sneakers. A backpack hangs over one shoulder, and white earbuds dangle loosely around his neck. His expression is thoughtful, with a slight, confident smile. He has a few freckles scattered across his face and a pair of black-rimmed glasses resting on his nose.";

  const character2 =
    "Emily is a 16-year-old high school student with shoulder-length straight blonde hair, styled neatly with a simple headband. She has bright blue eyes that sparkle with enthusiasm and a warm, friendly smile. She stands at 5'5\", with a petite build and a relaxed, confident posture. She's wearing a light pink sweater, a denim skirt, and white sneakers. A floral-patterned backpack is slung over both shoulders, and she's holding a notebook covered in doodles. Her face is lightly freckled, and she's wearing small silver hoop earrings.";

    const handleClose = () => {
        // Handle close action, e.g., set state to hide the component
        console.log("Close button clicked");
      };

    return (
        <div>
            <LandingPage />
        </div>
    //     <Wrapper onClose={handleClose}>
            // <Chapter
            // chapterNumber={1}
            // title="The Yellow Wallpaper"
            // author="Charlotte Perkins Gilman"
            // pages={texts}
            // imageUrls={images}
            // />
    //    </Wrapper>
    )
}