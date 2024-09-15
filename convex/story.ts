import { query } from "./_generated/server";

export const getFirstStory = query({
    args: {},
    handler: async (ctx) => {
        console.log("here I'm doing it")
        const stories = ctx.db.query("stories").take(1);
        return stories
    }
})