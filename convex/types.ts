import { Id } from "./_generated/dataModel";

export interface Chapter {
    storyId: Id<"stories">
    index: bigint,
    texts: string[],
    images: Id<"_storage">[],
}