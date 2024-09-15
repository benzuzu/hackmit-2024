"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

// Your OpenAI API Key (use environment variables to avoid hardcoding this)
const apiKey = process.env.OPENAI_API_KEY;

// Create an OpenAI client
const openai = new OpenAI({ apiKey });

export const generateTexts = action({
  args: { character1: v.string(), character2: v.string(), words: v.string() },
  handler: async (_, args) => {
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
        const jsonResponse = JSON.parse(responseString);
        return Object.values(jsonResponse);
      }
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to call OpenAI API");
    }
  },
});

export const generateImages = action({
  args: {
    character1: v.string(),
    character2: v.string(),
    texts: v.array(v.string()),
  },
  handler: async (_, args) => {
    try {
      const imagePromises = args.texts.map((text, index) => {
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
