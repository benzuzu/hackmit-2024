"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Chapter } from "../../components/chapters/chapter"; // Import the Chapter component
import Wrapper from "@/app/components/wrapper";
import { useStateContext } from "@/app/components/StateContext";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TLoadedChapter } from "@/convex/types";
import { Id } from "@/convex/_generated/dataModel";

export default function StoryPage() {
  const slug = useParams<{ tag: string; item: string }>()
  const router = useRouter();

  const { sharedState } = useStateContext();

  const [loading, setLoading] = useState(true);
  const [texts, setTexts] = useState<string[]>([]); // Initialize texts as an array
  const [images, setImages] = useState<string[]>([]); // Initialize images as an array of URLs
  const [title, setTitle] = useState<string>(""); // Initialize title
  const [chapterIndex, setChapterIndex] = useState<number>(
    sharedState.currentChapter ?? 1
  );

  const loadChapterData = useAction(api.chapter.loadChapterData);
  console.log("Current Story:", sharedState.currentStory); // Log current story ID

  useEffect(() => {
    const loadChapter = async () => {
      setLoading(true);
      try {
        const chapterData: TLoadedChapter = await loadChapterData({
          storyId: sharedState.currentStory! as Id<"stories">,
          chapterIndex: BigInt(chapterIndex),
        });
        console.log("Chapter Data:", chapterData); // Log chapter data for debugging
        setTexts(chapterData.texts);
        setImages(chapterData.images);
        setTitle(chapterData.title); // Set the title from chapter data
      } catch (error) {
        console.error("Error generating chapter:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChapter();
  }, [chapterIndex, loadChapterData, sharedState.currentStory]);

  const handlePreviousChapter = () => {
    if (chapterIndex > 1) {
      setChapterIndex(chapterIndex - 1);
    }
  };

  const handleNextChapter = () => {
    if (chapterIndex < sharedState.currentChapter!) {
      setChapterIndex(chapterIndex + 1);
    }
  };

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
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-black">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between w-full">
              <div
                className={`text-2xl underline cursor-pointer ${chapterIndex == 1 && "invisible"}`}
                onClick={handlePreviousChapter}
              >
                previous chapter
              </div>
              <div
                className={`text-2xl underline cursor-pointer ${chapterIndex == sharedState.currentChapter && "invisible"}`}
                onClick={handleNextChapter}
              >
                next chapter
              </div>
            </div>
            <Chapter
              chapterNumber={chapterIndex}
              title={title}
              imageUrls={images}
              text={texts}
            />
          </div>
        )}
      </main>
    </Wrapper>
  );
}
