"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return <button onClick={() => router.push("/new")}>Begin</button>;
}

// import { useQuery, useAction } from "convex/react";
// import { api } from "../convex/_generated/api";
// import { useEffect } from "react";

// export default function Home() {
//   const image = useQuery(api.chapter.imageTest);
//   const storeGeneratedChapter = useAction(api.chapter.storeGeneratedChapter);

//   useEffect(() => {
//     // storeGeneratedChapter({storyId: "jd7bwcwma5tedap0ct1s6806zh70rwyq" as Id<"stories">, generatedText: ["hee hee hee haw"], generatedImageUrls: ["https://oaidalleapiprodscus.blob.core.windows.net/private/org-d42nrgyj7SuhjDsnvmUZU5Zv/user-d9fjbULtGIIEX60En7lzvc95/img-dNw6H0yDtIrRwXTnGLorVtWB.png?st=2024-09-14T23%3A26%3A25Z&se=2024-09-15T01%3A26%3A25Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-14T23%3A22%3A20Z&ske=2024-09-15T23%3A22%3A20Z&sks=b&skv=2024-08-04&sig=aDPADpTm8/Pqo2E42hu2mG61htiCrm0ASuUD9IHj%2Bcc%3D"]});

//   }, [storeGeneratedChapter])

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
//       <img src={image} height="300px" width="auto" alt="gen" />
//     </main>
//   );
// }
