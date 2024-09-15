import Link from "next/link";
import React from "react";

const articles = [
  {
    title: "Kamala Harris Did Something Unthinkable",
    description:
      "She started treating a delusional narcissist like a delusional narcissist.",
    category: "Trending in Culture",
    date: "SEP 11",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Triple Hearsay: Haitians Eat Pets in Ohio",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "Trending in Technology",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Something New: On OpenAI's 'Strawberry'",
    description: "Solving hard problems in new ways.",
    category: "Trending in Business",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "September 13, 2024",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "Trending in U.S. Politics",
    date: "SEP 13",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Kamala Harris Did Something Unthinkable",
    description:
      "She started treating a delusional narcissist like a delusional narcissist.",
    category: "Trending in Culture",
    date: "SEP 11",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Triple Hearsay: Haitians Eat Pets in Ohio",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "Trending in Technology",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Something New: On OpenAI's 'Strawberry'",
    description: "Solving hard problems in new ways.",
    category: "Trending in Business",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "September 13, 2024",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "Trending in U.S. Politics",
    date: "SEP 13",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Kamala Harris Did Something Unthinkable",
    description:
      "She started treating a delusional narcissist like a delusional narcissist.",
    category: "Trending in Culture",
    date: "SEP 11",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Triple Hearsay: Haitians Eat Pets in Ohio",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "Trending in Technology",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "Something New: On OpenAI's 'Strawberry'",
    description: "Solving hard problems in new ways.",
    category: "Trending in Business",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
  {
    title: "September 13, 2024",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "Trending in U.S. Politics",
    date: "SEP 13",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#",
  },
];

export default function StoriesPage() {
  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">
      {articles.map((article, index) => (
        <Link key={index} to={article.link} className="block w-full"> {/* Use Link instead of a */}
          <div className="border-b border-gray-200 pb-4 mb-8 hover:bg-gray-200 transition duration-200 p-4 flex space-x-4">
            <div className="flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-medium text-gray-500 mb-1">
                {article.category}
              </p>
              <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">{article.description}</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-sm text-gray-400">{article.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}