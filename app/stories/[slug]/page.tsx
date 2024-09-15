"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Chapter } from "../../chapters/Chapter"; // Import the Chapter component
import Wrapper from "@/app/Wrapper";

export default function StoryPage() {
  const slug = useParams<{ tag: string; item: string }>()
  const router = useRouter();

  const [chapterData, setChapterData] = useState({
    title: "Default Title", // Default title
    author: "Default Author", // Default author
    pages: ["Page 1 content...", "Page 2 content...", "Page 3 content..."], // Default pages
    imageUrls: [
      "/assets/chapter1/image1.png",
      "/assets/chapter1/image2.png",
      "/assets/chapter1/image3.png",
    ], // Default image URLs
    availableChapters: [1, 2, 3], // Example available chapters
  });

  // Load default chapter data no matter the slug
  useEffect(() => {
    if (slug) {
      console.log("Slug:", slug); // Log slug to verify it's captured
    }
  }, [slug]);

  const handleClose = () => {
    console.log("Close button clicked");
    router.push("/stories"); // Navigate to the home page
  };

  return (
    <Wrapper onClose={handleClose}>

      {/* Render the Chapter component and pass the default chapter data */}
      <Chapter
        chapterNumber={1} // This can be dynamic based on chapter selection
        title={chapterData.title}
        author={chapterData.author}
        pages={chapterData.pages}
        imageUrls={chapterData.imageUrls}
        availableChapters={chapterData.availableChapters}
        onChapterSelect={(chapterNumber) => {
          console.log("Chapter selected:", chapterNumber);
        }}
      />
    </Wrapper>
  );
}
