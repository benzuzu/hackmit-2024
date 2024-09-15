"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";
import { Id } from "@/convex/_generated/dataModel";

export default function Home() {
  // const tasks = useQuery(api.tasks.get);
  // const image = useQuery(api.imageTest.get);
  // const storeImage = useAction(api.imageTest.generateAndStore);
  const storeGeneratedChapter = useAction(api.stories.storeGeneratedChapter);

  useEffect(() => {
    storeGeneratedChapter({storyId: "jd7bwcwma5tedap0ct1s6806zh70rwyq" as Id<"stories">, generatedText: ["hee hee hee haw"], generatedImageUrls: ["https://oaidalleapiprodscus.blob.core.windows.net/private/org-d42nrgyj7SuhjDsnvmUZU5Zv/user-d9fjbULtGIIEX60En7lzvc95/img-t6bR7pvInmqsEX51ys2duE7S.png?st=2024-09-14T22%3A50%3A07Z&se=2024-09-15T00%3A50%3A07Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A50%3A07Z&ske=2024-09-15T23%3A50%3A07Z&sks=b&skv=2024-08-04&sig=ovgZ%2BnoUvZcltSsEpfSPQ1jNXxSCA1icaH4q2nZG2x0%3Dz"]});
    console.log("hello")
  }, [storeGeneratedChapter])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      <img src={image} height="300px" width="auto" /> */}
    </main>
  );
}
