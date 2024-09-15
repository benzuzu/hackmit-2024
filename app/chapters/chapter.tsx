import { ChapterBanner } from "./ChapterBanner";
import { ChapterSlice } from "./chapterslice";

export function Chapter() {
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
          chapterNumber={1}
          imageUrl="https://via.placeholder.com/1200x400"
          chapterText={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          \nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          \nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
        />
      </main>
      <footer className="row-start-2 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
