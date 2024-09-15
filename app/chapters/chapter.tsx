"use client";

import { ChapterBanner } from './ChapterBanner';
import { ChapterSlice } from './ChapterSlice'; // Make sure to point to the correct file path

export function Chapter() {
  return (
    <div className="grid min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col">
        
        {/* Banner Component */}
        <ChapterBanner
          storyTitle="The Yellow Wallpaper"
          author="Charlotte Perkins Gilman"
        />
        
        {/* ChapterSlice Component */}
        <ChapterSlice
          chapterNumber={1}
          storyTitle="The Yellow Wallpaper"
          authors="Charlotte Perkins Gilman"
          storyImageUrl="https://via.placeholder.com/1200x400"
          chapterText={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          \nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
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
