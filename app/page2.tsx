"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import Image from "next/image";
import { Chapter } from "./chapters/Chapter";
import LandingPage from "./landing/LandingPage";

export default function Home() {
  // const generateStory = useAction(api.story.generate);

  return (
    <div className="grid min-h-screen flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col row-start-2 justify-center items-center ">
        {/* Render the ChapterSlice component with appropriate props */}
        {/* <Chapter
          chapterNumber={1}
          storyTitle="My Story"
          authors="Author Name"
          chapterText="Once upon a time..."
          images={[
            "https://via.placeholder.com/600x400",
            "https://via.placeholder.com/600x400"
          ]}
        /> */}
        <LandingPage />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
