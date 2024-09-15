import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stories: defineTable({
    title: v.string(),
    currentChapterIndex: v.int64(),
    chapters: v.array(v.id("chapters")),
  }),
  chapters: defineTable({
    storyId: v.id("stories"),
    index: v.int64(),
    texts: v.array(v.string()),
    images: v.array(v.id("_storage"))
  }),
});