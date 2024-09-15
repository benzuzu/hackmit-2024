import Link from "next/link";
import React from "react";
import { Wrapper } from "../wrapper";
import Image from "next/image";

const articles = [
  {
    title: "Your story with Hannah",
    description:
      "She started treating a delusional narcissist like a delusional narcissist.",
    category: "On Chapter 2",
    date: "SEP 11",
    image: "/assets/business.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Greg",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "On Chapter 7",
    date: "SEP 12",
    image: "/assets/newspaper.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Savannah",
    description: "Solving hard problems in new ways.",
    category: "On Chapter 11",
    date: "SEP 12",
    image: "/assets/woman.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Pascal",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "On Chapter 8",
    date: "SEP 13",
    image: "/assets/fire.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Marianna",
    description:
      "Confronting manipulative behavior head-on, an in-depth account of Marianna's encounter with deceit.",
    category: "On Chapter 2",
    date: "SEP 11",
    image: "/assets/narcissist.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Jennifer",
    description: "Exploring the truth behind sensational claims, Jennifer dives into the facts about pet ownership among immigrants in Ohio.",
    category: "On Chapter 4",
    date: "SEP 12",
    image: "/assets/cry.png", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Your story with Clinton",
    description: "Clinton tackles the challenges of merging traditional industries with innovative tech solutions.",
    category: "On Chapter 9",
    date: "SEP 12",
    image: "/assets/tech.png", // Replace with actual image URLs
    link: "#",
  },
];

const handleClose = () => {
  console.log("Close button clicked");
};

export default function StoriesPage() {
  return (
    <Wrapper onClose={handleClose}>
      <div className="p-6 space-y-8 max-w-3xl mx-auto">
        {/* Add the title here */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Stories</h1>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>
        {articles.map((article, index) => (
          <Link key={index} href="/" className="block w-full">
            <div className="border-b border-black pb-4 mb-8 hover:bg-gray-200 transition duration-200 p-4 flex space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src={article.image}
                  width={350}
                  height={350}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-500 mb-2">
                  {article.category}
                </p>
                <h2 className="text-xl font-semibold text-gray-900 leading-tight">
                  {article.title}
                </h2>
                <p className="text-md text-gray-600 mt-2">
                  {article.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Wrapper>
  );
}