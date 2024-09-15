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
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Stories</h1>
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