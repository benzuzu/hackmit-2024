import React from 'react';
import Image from 'next/image';

interface ChapterSliceProps {
  chapterNumber: number;
  chapterText: string;
  imageUrl: string; // URLs for images to embed within the text
}

export function ChapterSlice({
  chapterNumber,
  chapterText,
  imageUrl,
}: ChapterSliceProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Chapter Title */}
      <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Chapter {chapterNumber}</h2>

      {/* Chapter Text */}
      <div className="text-lg text-gray-800 dark:text-gray-200">
        {/* Split text into paragraphs */}
        {chapterText.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {/* Embed Image within the text */}
        <div className="w-full h-64 my-4 relative">
            <Image
              src={imageUrl}
              alt="Chapter image"
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>
      </div>
    </div>
  );
}
