import React from 'react';

interface ChapterListProps {
  availableChapters: number[]; // List of available chapters
  currentChapter: number; // The currently active chapter
  onChapterSelect: (chapterNumber: number) => void; // Function to handle chapter selection
}

export function ChapterList({
  availableChapters,
  currentChapter,
  onChapterSelect,
}: ChapterListProps) {
  return (
    <div>
      {/* Horizontal row of chapters with circles */}
      <div className="flex space-x-4">
        {availableChapters.map((chapter) => (
          <button
            key={chapter}
            className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors duration-300
            ${currentChapter === chapter
                ? 'bg-black text-white'
                : 'text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
            onClick={() => onChapterSelect(chapter)}
          >
            {chapter}
          </button>
        ))}
      </div>
    </div>
  );
}
