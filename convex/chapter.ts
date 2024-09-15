import { action, internalAction, internalMutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id, Doc } from "./_generated/dataModel";
import { TChapter } from "./types";

export const storeGeneratedChapter = internalAction({
    args: {
        storyId: v.id("stories"),
        generatedText: v.array(v.string()),
        generatedImageUrls: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const { storyId, generatedText, generatedImageUrls } = args;

        const story: Doc<"stories"> = (await ctx.runMutation(
            internal.chapter.getStory,
            { storyId }
        ))!;
        const newChapterIndex = story.currentChapterIndex + 1n;
        const images: Id<"_storage">[] = [];
        for (const url of generatedImageUrls) {
            const response = await fetch(url);
            const image = await response.blob();
            const storageId: Id<"_storage"> = await ctx.storage.store(image);
            images.push(storageId);
        }

        const newChapter: TChapter = {
            storyId,
            index: newChapterIndex,
            texts: generatedText,
            images,
        }

        const chapterId: Id<"chapters"> = (await ctx.runMutation(
            internal.chapter.storeChapter,
            newChapter
        ))!;

        await ctx.runMutation(internal.chapter.updateStoryWithChapter, {
            storyId,
            chapterId,
            newChapterIndex,
            storyChapters: story.chapters,
        });

        return newChapter;
    },
});

export const getStory = internalMutation({
    args: {
        storyId: v.id("stories"),
    },
    handler: async (ctx, args) => {
        const { storyId } = args;
        const story = await ctx.db.get(storyId);
        return story;
    },
});

export const storeChapter = internalMutation({
    args: {
        storyId: v.id("stories"),
        index: v.int64(),
        texts: v.array(v.string()),
        images: v.array(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const chapterId = await ctx.db.insert("chapters", {
            ...args,
        });
        return chapterId;
    },
});

export const updateStoryWithChapter = internalMutation({
    args: {
        storyId: v.id("stories"),
        chapterId: v.id("chapters"),
        newChapterIndex: v.int64(),
        storyChapters: v.array(v.id("chapters")),
    },
    handler: async (ctx, args) => {
        const { storyId, chapterId, newChapterIndex, storyChapters } = args;
        const updatedChapters = [...storyChapters];
        if (updatedChapters.length >= newChapterIndex) {
            updatedChapters[newChapterIndex as unknown as number] = chapterId;
        } else {
            updatedChapters.push(chapterId);
        }

        await ctx.db.patch(storyId, {
            currentChapterIndex: newChapterIndex,
            chapters: updatedChapters,
        });
    },
});

export const getImages = action({
    args: { images: v.array(v.id("_storage")) },
    handler: async (ctx, { images }) => {
        const imageUrls = []
        for (const image of images) {
            let url = (await ctx.storage.getUrl(image))!
            imageUrls.push(url)
        }
        return imageUrls;
    }
})

export const imageTest = query({
    args: {},
    handler: async (ctx) => {
        const testImg = "kg2b230zvskca0p2cvwtr8ykbh70t0ew"
        const url = await ctx.storage.getUrl(testImg);
        return url;
    },
});
