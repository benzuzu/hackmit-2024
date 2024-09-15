"use client"

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";
import { useStateContext } from "../components/StateContext";
import type { SharedState } from "../components/StateContext";
import Wrapper from "../components/wrapper";
import Link from "next/link";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";


const articleImages = [
  "/assets/stories/business.png",
  "/assets/stories/newspaper.png",
  "/assets/stories/woman.png",
  "/assets/stories/fire.png",
  "/assets/stories/narcissist.png",
  "/assets/stories/cry.png",
  "/assets/stories/tech.png",
]

export default function TrendingPage() {
  const router = useRouter();
  const stories = useQuery(api.story.getStories);
  const [loading, setLoading] = React.useState(true);
  const [start, setStart] = React.useState(true);
  const { setSharedState, sharedState } = useStateContext();
  const [url, setUrl] = React.useState<string>("");

  useEffect(() => {
    if (stories) {
      setLoading(false);
      setStart(false);
    }
  }, [stories]);

  const handleClose = () => {
    router.push("/");
  };

  const handleClick = (id: Id<"stories">, chapterIndex: number) => {
    setSharedState((prevState: SharedState) => ({
      ...prevState,
      currentStory: id,
      currentChapter: chapterIndex,
    }));

    setTimeout(() => {router.push("stories/" + id)}, 300);
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Wrapper onClose={handleClose}>
          <div className="p-6 space-y-8 max-w-3xl mx-auto">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Stories</h1>
              <div className="flex justify-between items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <Link href="/new">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-8 w-8 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* List of articles */}
            {stories!.map((article, index) => {
              // Create a slug by replacing spaces with dashes and converting to lowercase
              const slug = article.title.replace(/\s+/g, "-").toLowerCase();
              return (
                <div
                  key={index}
                  onClick={() => handleClick(article._id, Number(article.currentChapterIndex))}
                  className="block w-full hover:bg-opacity-30 hover:bg-gray-200 transition duration-200"
                >
                  <a onClick={() => handleClick(article._id, Number(article.currentChapterIndex))}>
                    <div className="border-b border-black pb-4 p-4 flex space-x-6">
                      <div className="flex-shrink-0">
                        <Image
                          src={articleImages[index % articleImages.length]}
                          width={350}
                          height={350}
                          alt={article.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-500 mb-2">
                          Chapter {Number(article.currentChapterIndex)}
                        </p>
                        <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                          {article.title}
                        </h2>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </Wrapper>
      )}
    </div>
  );
}