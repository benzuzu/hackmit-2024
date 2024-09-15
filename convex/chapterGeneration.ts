"use node";

import { v } from "convex/values";
import { action, internalAction } from "./_generated/server";

import OpenAI from "openai";
import { internal } from "./_generated/api";
import { TChapter } from "./types";

// Your OpenAI API Key (use environment variables to avoid hardcoding this)
const apiKey = process.env.OPENAI_API_KEY;

// Create an OpenAI client
const openai = new OpenAI({ apiKey });

export const generateAndStoreChapter = action({
  args: { storyId: v.id("stories"), words: v.string() },
  handler: async (ctx, { storyId, words }) => {
    const character1 =
      "Jordan is a 17-year-old high school student with short, slightly messy brown hair and warm hazel eyes that convey a sense of curiosity and youthful energy. He stands at 5'9\", with a lean build and a casual, laid-back posture. He's wearing a navy blue hoodie over a graphic t-shirt, faded jeans, and well-worn sneakers. A backpack hangs over one shoulder, and white earbuds dangle loosely around his neck. His expression is thoughtful, with a slight, confident smile. He has a few freckles scattered across his face and a pair of black-rimmed glasses resting on his nose.";

    const character2 =
      "Emily is a 16-year-old high school student with shoulder-length straight blonde hair, styled neatly with a simple headband. She has bright blue eyes that sparkle with enthusiasm and a warm, friendly smile. She stands at 5'5\", with a petite build and a relaxed, confident posture. She's wearing a light pink sweater, a denim skirt, and white sneakers. A floral-patterned backpack is slung over both shoulders, and she's holding a notebook covered in doodles. Her face is lightly freckled, and she's wearing small silver hoop earrings.";

    console.log("starting generation");
    const texts: string[] = (await ctx.runAction(
      internal.chapterGeneration.generateTexts,
      { character1, character2, words }
    ))!;
    console.log("text generation:");
    console.log(texts);
    const images: string[] = await ctx.runAction(
      internal.chapterGeneration.generateImages,
      { character1, character2, texts }
    );

    const chapter: TChapter = await ctx.runAction(
      internal.chapter.storeGeneratedChapter,
      { storyId, generatedText: texts, generatedImageUrls: images }
    );

    return chapter;
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
              "Each part should be a string in the JSON with key 'part_x'.",
            // "Importantly, use the following 5 words: " +
            // args.words,
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
        const prompt = `Context: ${args.character1} ${args.character2}. Now, draw the following paragraph. Use a cartoonish style similar to Une64e2g1l7URd6 : ${text}.`;

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
