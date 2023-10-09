require("dotenv").config();

import OpenAI from "openai";
import { openAiResponse } from "../interfaces/openAIInterface";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const chatCompletion = async (text: string): Promise<openAiResponse> => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    let content = response.choices[0].message.content;
    return {
      status: 1,
      response: content,
    };
  } catch (error) {
    return {
      status: 0,
      response: null,
    };
  }
};
