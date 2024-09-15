// import { action, internalMutation, query } from "./_generated/server";
// import { internal } from "./_generated/api";
// import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";

// export const generateAndStore = action({
//   args: { },
//   handler: async (ctx) => {
//     // Not shown: generate imageUrl from `prompt`
//     const imageUrl = "https://oaidalleapiprodscus.blob.core.windows.net/private/org-d42nrgyj7SuhjDsnvmUZU5Zv/user-d9fjbULtGIIEX60En7lzvc95/img-3HPwSXTNYkX0Ml7aZV3nTLTv.png?st=2024-09-14T17%3A57%3A06Z&se=2024-09-14T19%3A57%3A06Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-09-13T23%3A22%3A22Z&ske=2024-09-14T23%3A22%3A22Z&sks=b&skv=2024-08-04&sig=DPQ/YxOTcz4mcmRpENBWDSW9wBYnqjFt7tqCjyDJLBc%3D";

//     // Download the image
//     const response = await fetch(imageUrl);
//     const image = await response.blob();

//     // Store the image in Convex
//     const storageId: Id<"_storage"> = await ctx.storage.store(image);

//     // Write `storageId` to a document
//     await ctx.runMutation(internal.imageTest.storeResult, {
//       storageId
//     });
//   },
// });

// export const storeResult = internalMutation({
//   args: {
//     storageId: v.id("_storage"),
//   },
//   handler: async (ctx, args) => {
//     const { storageId } = args;
//     await ctx.db.insert("images", { storageId });
//   },
// });

// export const get = query({
//   args: {},
//   handler: async (ctx) => {
//     const messages = await ctx.db.query("images").take(1);
//     const url = await ctx.storage.getUrl(messages[0].storageId)
//     return url
//   },
// });