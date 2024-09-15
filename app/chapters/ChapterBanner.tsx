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
      <div>
        <h1 className="text-4xl font-bold">{storyTitle}</h1>
        <p className="text-lg">by {author}</p>
      </div>
    </div>
  );
}
