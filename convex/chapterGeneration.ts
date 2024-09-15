"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";

import OpenAI from "openai";
import { internal } from "./_generated/api";

// Your OpenAI API Key (use environment variables to avoid hardcoding this)
const apiKey = process.env.OPENAI_API_KEY;

// Create an OpenAI client
const openai = new OpenAI({ apiKey });

export const generateAndStoreChapter = action({
  args: {
    storyId: v.id("stories"),
    words: v.string(),
    initial: v.optional(v.boolean()),
  },
  handler: async (ctx, { storyId, words, initial }) => {
    const character1 =
      "Aarush is a 23-year-old Indian man with short, slightly messy black hair and warm brown eyes that convey a sense of curiosity and youthful energy. He stands at 5’9” with a lean build and maintains a relaxed, laid-back posture. Aarush is dressed casually in a navy blue hoodie over a graphic t-shirt, paired with faded jeans and worn-in sneakers. A backpack is slung over one shoulder, while white earbuds dangle loosely around his neck. His face has a few scattered freckles, and a pair of black-rimmed glasses rest on his nose. Aarush wears a thoughtful expression, his lips curved into a slight, confident smile as he heads out to HackMIT, ready for an exciting day of hacking and innovation.";

    const character2 =
      "Priya is a 23-year-old Indian woman with shoulder-length, straight black hair, neatly styled with a simple headband. She has bright, expressive brown eyes that show a spark of enthusiasm, paired with a warm, inviting smile. Standing at 5’5”, she has a petite build with a relaxed yet confident posture. Priya is dressed in a light pink sweater, paired with a casual denim skirt, and white sneakers. A floral-patterned backpack is slung over both her shoulders, and she holds a notebook filled with detailed notes and sketches. Her face has a few light freckles, and she’s wearing small, elegant silver hoop earrings. Priya walks with purpose as she heads to MIT, ready to dive into the opportunities and challenges ahead.";

    const texts: string[] = (await ctx.runAction(
      internal.chapterGeneration.generateTexts,
      { character1, character2, words }
    ))!;
    const images: string[] = await ctx.runAction(
      internal.chapterGeneration.generateImages,
      { character1, character2, texts }
    );

    const newInitial = initial ?? false;

    await ctx.runAction(internal.chapter.storeGeneratedChapter, {
      storyId,
      generatedText: texts,
      generatedImageUrls: images,
      initial: newInitial,
    });
  },
});

export const generateTexts = internalAction({
  args: { character1: v.string(), character2: v.string(), words: v.string() },
  handler: async (ctx, args) => {
    try {
      // Make a call to OpenAI API using the `createCompletion` method
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Specify the model here
        messages: [
          {
            role: "system",
            content:
              args.character1 +
              args.character2 +
              "Write the first chapter of a story with the above characters in 3 parts" +
              "Each part should be a string in the JSON with key 'part_x'." +
              "Importantly, use the following 5 words: " +
              args.words,
          },
        ],
        response_format: {
          type: "json_object",
        },
      });

      if (response.choices[0].message.refusal) {
        console.log(response.choices[0].message.refusal);
      } else if (response.choices[0].message.content) {
        const responseString = response.choices[0].message.content;
        const jsonResponse: string[] = JSON.parse(responseString);
        return Object.values(jsonResponse);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to call OpenAI API");
    }
  },
});

export const generateImages = internalAction({
  args: {
    character1: v.string(),
    character2: v.string(),
    texts: v.array(v.string()),
  },
  handler: async (_, args) => {
    try {
      const imagePromises = args.texts.map((text) => {
        const prompt = `Context: ${args.character1} ${args.character2}. Now, draw the following paragraph. Draw the characters as humanly and realistic as possible : ${text}.`;

        return openai.images
          .generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
          })
          .then((response) => {
            if (response.data[0].url) {
              console.log(response.data[0].url);
              return response.data[0].url;
            } else {
              console.log("Failed to generate image for text:", text);
              throw new Error("Failed to generate image");
            }
          });
      });

      const images = await Promise.all(imagePromises);

      return images;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to call OpenAI API");
    }
  },
});
