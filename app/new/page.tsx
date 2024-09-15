"use client";

import React from "react";
import { ChapterEnd } from "../components/chapters/chapterend";
import { useRouter } from "next/navigation";

export default function NewStory() {
  const router = useRouter();

  const handleSubmit = async (words: string[]) => {
    await sessionStorage.setItem("words", JSON.stringify(words));
    router.push("/story");
  };

  return <ChapterEnd handleSubmit={handleSubmit} />;
}
