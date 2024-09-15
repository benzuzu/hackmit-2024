import React from 'react';

interface ChapterBannerProps {
  storyTitle: string;
  author: string;
}

export function ChapterBanner({
  storyTitle,
  author,
}: ChapterBannerProps) {
  return (
    <div className="w-full">
      {/* Text Section */}
      <div className="text-black">
        <h1 className="text-4xl font-bold text-gray-800">{storyTitle}</h1>
        <p className="text-lg text-gray-800">by {author}</p>
      </div>
    </div>
  );
}
