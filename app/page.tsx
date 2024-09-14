"use client";

import { useQuery, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect } from "react";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const image = useQuery(api.imageTest.get);
  const storeImage = useAction(api.imageTest.generateAndStore);

  useEffect(() => {
    // storeImage();
  }, [storeImage])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
      <img src={image} height="300px" width="auto" />
    </main>
  );
}
