"use client";

import { useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import Image from "next/image";
import { Chapter } from "./chapters/Chapter";
import Sidebar from "./sidebar";

export default function Home() {
  // const generateStory = useAction(api.story.generate);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Render the ChapterSlice component with appropriate props */}
        <Sidebar/>
        <Chapter
          chapterNumber={1}
          storyTitle="My Story"
          authors="Author Name"
          chapterText="Once upon a time..."
          images={[
            "https://via.placeholder.com/600x400",
            "https://via.placeholder.com/600x400"
          ]}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
