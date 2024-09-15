import { ChapterBanner } from "./ChapterBanner";
import { ChapterSlice } from "./ChapterSlice";
import { ChapterList } from './ChapterList';
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { ChapterForm } from "./ChapterForm";
import { useState } from "react";

interface ChapterProps {
  chapterNumber: number;
  title: string;
  author: string;
  pages: string[];       // Array of text for each page
  imageUrls: string[];   // Array of image URLs for each page (same length as pages)
  availableChapters: number[]; // List of available chapter numbers
  onChapterSelect: (chapterNumber: number) => void; // Function to call when a chapter is selected
}

export function Chapter({ chapterNumber, title, author, pages, imageUrls}: ChapterProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);

  // Fetch chapter data from API (mock function)
  const fetchChapterData = async (chapterNumber: number) => {
    console.log(`Fetching data for chapter ${chapterNumber}...`);
    // Example API call to get chapter data
    // const response = await fetch(`/api/chapters/${chapterNumber}`);
    // const data = await response.json();

    // setChapterData({
    //   text: data.text,
    //   imageUrls: data.imageUrls,
    // });
  };

  // Handler to go to the previous page
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler to go to the next page
  const handleNextPage = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

    // Handle chapter selection
    const handleChapterSelect = (chapterNumber: number) => {
      setCurrentChapter(chapterNumber);
      fetchChapterData(chapterNumber); // Fetch the selected chapter's data
    };

  return (
    <div className="sm:p-20 p-5">
      <main className="flex flex-col gap-8 row-start-1 items-center sm:items-start">
        {/* Show the chapter banner on the first page */}
        {currentPage === 0 && (
          <ChapterBanner storyTitle={title} author={author} />
        )}

        <ChapterList
        currentChapter={chapterNumber}
        availableChapters={[1, 2, 3, 4, 5]} // Example chapters
        onChapterSelect={handleChapterSelect}
        />

        {/* Chapter content (text and image for the current page) */}
        {currentPage < pages.length && (
          <ChapterSlice
            chapterNumber={chapterNumber}
            text={pages[currentPage]}       // Text for the current page
            imageUrl={imageUrls[currentPage]} // Image for the current page
          />
        )}

        {/* End of Chapter form, shown on the page after the last content page */}
        {currentPage === pages.length && <ChapterForm />}

        {/* Navigation buttons */}
        <div className="fixed bottom-4 left-20">
          {currentPage > 0 && (
            <button className="p-5" onClick={handlePrevPage}>
              <ArrowLeftIcon className="h-6 w-6 ml-2" />
            </button>
          )}
        </div>
        <div className="fixed bottom-4 right-4">
          {currentPage < pages.length && (
            <button className="p-5" onClick={handleNextPage}>
              <ArrowRightIcon className="h-6 w-6 ml-2" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
