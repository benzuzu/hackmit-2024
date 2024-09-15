"use client"

import React from "react";

const articles = [
  {
    title: "Kamala Harris Did Something Unthinkable",
    description: "She started treating a delusional narcissist like a delusional narcissist.",
    category: "Trending in Culture",
    date: "SEP 11",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "Triple Hearsay: Haitians Eat Pets in Ohio",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "Trending in Technology",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "Something New: On OpenAI's 'Strawberry'",
    description: "Solving hard problems in new ways.",
    category: "Trending in Business",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "September 13, 2024",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "Trending in U.S. Politics",
    date: "SEP 13",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "Kamala Harris Did Something Unthinkable",
    description: "She started treating a delusional narcissist like a delusional narcissist.",
    category: "Trending in Culture",
    date: "SEP 11",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "Triple Hearsay: Haitians Eat Pets in Ohio",
    description:
      "Sources of the claim that Haitians eat pets in Ohio admit no first-hand knowledge.",
    category: "Trending in Technology",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "Something New: On OpenAI's 'Strawberry'",
    description: "Solving hard problems in new ways.",
    category: "Trending in Business",
    date: "SEP 12",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  },
  {
    title: "September 13, 2024",
    description:
      "After bomb threats today, officials had to evacuate two elementary schools in Springfield.",
    category: "Trending in U.S. Politics",
    date: "SEP 13",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    link: "#"
  }
];

export default function TrendingPage() {
  return (
    <div className="p-6 space-y-8">
      {articles.map((article, index) => (
        <a
          key={index}
          href={article.link}
          className="block border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center p-4 space-x-4">
            {/* Image on the right */}
            <div className="flex-shrink-0">
              <img
                src={article.image}
                alt={article.title}
                className="w-24 h-24 object-cover rounded-md"
              />
            </div>
            {/* Text Content */}
            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-900">{article.title}</h2>
              <p className="text-sm text-gray-500 mt-2">{article.description}</p>
              <p className="text-sm text-blue-500 mt-4">{article.category}</p>
            </div>
            {/* Date on the right */}
            <div className="flex-shrink-0">
              <p className="text-sm text-gray-500">{article.date}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}