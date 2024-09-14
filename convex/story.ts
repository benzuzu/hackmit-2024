"use node";

import { action } from "./_generated/server";
import OpenAI from "openai";

// Your OpenAI API Key (use environment variables to avoid hardcoding this)
const apiKey = process.env.OPENAI_API_KEY;

// Create an OpenAI client
const openai = new OpenAI({ apiKey });

export const generate = action({
  args: {},
  handler: async () => {
    try {
      // Make a call to OpenAI API using the `createCompletion` method
      const completion = await openai.chat.completions.create({
        model: "gpt-4o", // Specify the model here
        messages: [{ role: "system", content: "Write a story." }],
      });

      // Return the text of the OpenAI completion
      return completion.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw new Error("Failed to call OpenAI API");
    }
  },
});
