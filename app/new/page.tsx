"use client";

import React, { useEffect } from "react";
import { ChapterEnd } from "../components/chapters/chapterend";
import { useRouter } from "next/navigation";
import { SharedState, useStateContext } from "../components/StateContext";
import { generateAndStoreChapter } from "@/convex/chapterGeneration";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function NewStory() {
  const router = useRouter();
  const { setSharedState, sharedState } = useStateContext();
  const generateAndStoreChapter = useAction(
    api.chapterGeneration.generateAndStoreChapter
  );
  const createStory = useMutation(api.story.createStory);
  const [first, setFirst] = React.useState(true);
  const [done, setDone] = React.useState(false);
  const [words, setWords] = React.useState<string[]>([]);

  const generateNewStory = async () => {
    try {
      const storyId = await createStory({title: "Your Story With Ben"});
      setSharedState((prevState: SharedState) => ({
        ...prevState,
        currentStory: storyId,
        currentChapter: 1,
      }));
      setFirst(false);
    } catch (error) {
      console.error("Error creating story:", error);
    }
  }

  useEffect(() => {
    const generateNewChapter = async () => {
      try {
        if (words) {

          // Generate and fetch the chapter
          await generateAndStoreChapter({
            storyId: sharedState.currentStory! as Id<"stories">,
            words: JSON.stringify(words),
            initial: true
          });
        } else {
          throw new Error("Words not found in local storage");
        }
      } catch (error) {
        console.error("Error generating chapter:", error);
      }
    };

    if (!first && !done) {
      generateNewChapter()
      setDone(true);
    }
  }, [first, done, words, sharedState.currentStory, generateAndStoreChapter, sharedState.currentChapter, setSharedState]);

  

  const handleSubmit = async (words: string[]) => {
    console.log("Words submitted:", words);
    setWords(words);
    await generateNewStory();
    router.push("/story");
  };

  return <ChapterEnd handleSubmit={handleSubmit} />;
}
