import { Id } from "./_generated/dataModel";

export interface TChapter {
    storyId: Id<"stories">
    index: bigint,
    texts: string[],
    images: Id<"_storage">[],
}

export interface TLoadedChapter {
    texts: string[],
    images: string[],
}