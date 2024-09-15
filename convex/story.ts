import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFirstStory = query({
    args: {},
    handler: async (ctx) => {
        const stories = ctx.db.query("stories").take(1);
        return stories
    }
})

export const createStory = mutation({
    args: {
        title: v.string(),
    },
    handler: async (ctx, { title }) => {
        const storyId = await ctx.db.insert("stories", { title, currentChapterIndex: BigInt(1), chapters: [] });
        return storyId;
    }
})