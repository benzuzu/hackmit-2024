interface ChapterSliceProps {
  chapterNumber: number;
  text: string;
  imageUrl: string;
}

export function ChapterSlice({ chapterNumber, text, imageUrl }: ChapterSliceProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Display text content */}
      <p className="text-lg my-4">{text}</p>

      {/* Display image for the current page */}
      <img src={imageUrl} alt={`Chapter ${chapterNumber} image`} className="my-4" />
    </div>
  );
}
