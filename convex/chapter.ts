"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import OpenAI from "openai";

// Your OpenAI API Key (use environment variables to avoid hardcoding this)
const apiKey = process.env.OPENAI_API_KEY;

// Create an OpenAI client
const openai = new OpenAI({ apiKey });

export const generateTexts = action({
  args: {},
  handler: async () => {
    try {
      // Make a call to OpenAI API using the `createCompletion` method
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Specify the model here
        messages: [
          {
            role: "system",
            content:
              "Write a story in 3 parts. Each part should be a string in the JSON with key 'part_x'.",
          },
        ],
        response_format: {
          type: "json_object",
        },
      });

      if (response.choices[0].message.refusal) {
        console.log(response.choices[0].message[0].refusal);
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
  args: { texts: v.array(v.string()) },
  handler: async (_, args) => {
    const images: string[] = []; // Add type annotation for the images array
    try {
      for (const text of args.texts) {
        const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: text,
          n: 1,
          size: "1024x1024",
        });

        if (response.data[0].url) {
          images.push(response.data[0].url);
          console.log(response.data[0].url);
        } else {
          console.log("Failed to generate image for text:", text);
          throw new Error("Failed to generate image");
        }
      }
      return images;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to call OpenAI API");
    }
  },
});
