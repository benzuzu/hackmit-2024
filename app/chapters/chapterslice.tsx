import React from 'react';
import Image from 'next/image';

interface ChapterSliceProps {
  chapterNumber: number;
  chapterText: string;
  images: string[]; // URLs for images to embed within the text
}

export function ChapterSlice({
  chapterNumber,
  chapterText,
  images,
}: ChapterSliceProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Chapter Title */}
      <h2 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Chapter {chapterNumber}</h2>

      {/* Chapter Text */}
      <div className="text-lg text-gray-800 dark:text-gray-200 space-y-6">
        {/* Split text into paragraphs */}
        {chapterText.split('\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        {/* Embed Images within the text */}
        {images.map((imageUrl, index) => (
          <div key={index} className="w-full h-64 my-4 relative">
            <Image
              src={imageUrl}
              alt={`Chapter image ${index + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
