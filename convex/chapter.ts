import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
import { v } from "convex/values";
import { Id, Doc } from "./_generated/dataModel";
import { TChapter, TLoadedChapter } from "./types";

export const loadChapterData = action({
    args: {chapterIndex: v.int64(), storyId: v.id("stories")},
    handler: async (ctx, { chapterIndex, storyId }) => {
        const story: Doc<"stories"> = (await ctx.runQuery(internal.chapter.getStoryById, { storyId }))!;
        const chapterId = story.chapters[Number(chapterIndex) - 1];
        const chapter: Doc<"chapters"> = (await ctx.runQuery(internal.chapter.getChapterById, { chapterId }))!;
        
        const loadedImages = await ctx.runMutation(internal.chapter.loadImages, { images: chapter.images });
        const loadedChapter: TLoadedChapter = {
            texts: chapter.texts,
            images: loadedImages,
        }
        return loadedChapter;
    }
})

export const getStoryById = internalQuery({
    args: { storyId: v.id("stories") },
    handler: async (ctx, { storyId }) => {
        const story = await ctx.db.get(storyId);
        return story;
    },
});

export const getChapterById = internalQuery({
    args: { chapterId: v.id("chapters") },
    handler: async (ctx, { chapterId }) => {
        const chapter = await ctx.db.get(chapterId);
        return chapter;
    },
});

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
        const newChapterIndex = story.currentChapterIndex + BigInt(1);
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

export const loadImages = internalMutation({
    args: { images: v.array(v.id("_storage")) },
    handler: async (ctx, { images }) => {
        const imageUrls = []
        for (const image of images) {
            const url = (await ctx.storage.getUrl(image))!
            imageUrls.push(url)
        }
        return imageUrls;
    }
})
