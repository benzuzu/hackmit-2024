"use client"

import React, { useState } from "react";
import { ChapterBanner } from "./ChapterBanner";
import { ChapterSlice } from "./chapterslice";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";


interface ChapterProps {
  chapterNumber: number;
  text: string[];
  imageUrls: string[]; // URLs for images to embed within the text
  title: string;
}

export function Chapter({ chapterNumber, text, imageUrls }: ChapterProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler to go to the next page
  const handleNextPage = () => {
    if (currentPage < text.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fetch chapter data from API (mock function)
  
  return (
    <div className="grid grid-rows-[auto_auto_auto] items-start justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        {/* Banner Component */}
        <ChapterBanner
          storyTitle="The Yellow Wallpaper"
          author="Charlotte Perkins Gilman"
        />

        {/* ChapterSlice Component */}
        <ChapterSlice
          chapterNumber={chapterNumber}
          imageUrls={imageUrls}
          text={text}
        />
      </main>
      <footer className="row-start-2 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
