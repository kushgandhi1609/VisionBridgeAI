import fs from "node:fs/promises";
import Groq from "groq-sdk";

const modePrompts = {
  short:
    "Give a concise, human, one-paragraph description for a blind or low-vision user.",

  detailed:
    "Give a rich, natural, highly detailed description. Include people, objects, setting, text, colors, spatial relationships, and uncertainty.",

  safety:
    "Prioritize safety. Mention obstacles, vehicles, stairs, edges, hazards, nearby people, pathways, warning signs, and anything requiring caution."
};

export async function analyzeImage({
  file,
  question,
  mode = "detailed"
}) {
  try {
    if (!process.env.GROQ_API_KEY) {
      const error = new Error(
        "GROQ_API_KEY is missing."
      );
      error.status = 500;
      throw error;
    }

    if (!file) {
      const error = new Error(
        "No image file was uploaded."
      );
      error.status = 400;
      throw error;
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const imageBuffer = await fs.readFile(file.path);

    const base64Image =
      imageBuffer.toString("base64");

    const imageUrl = `data:${file.mimetype};base64,${base64Image}`;

    const userPrompt = question?.trim()
      ? `Answer this question about the uploaded image: "${question.trim()}".`
      : modePrompts[mode] || modePrompts.detailed;

    const completion =
      await groq.chat.completions.create({
        model:
          "meta-llama/llama-4-scout-17b-16e-instruct",

        temperature: 0.35,

        max_tokens: 800,

        messages: [
          {
            role: "system",
            content:
              "You are VisionBridge AI, an accessibility-first visual assistant. Describe images for visually impaired users clearly, respectfully, and practically. Avoid inventing details. Say when uncertain."
          },

          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt
              },

              {
                type: "image_url",
                image_url: {
                  url: imageUrl
                }
              }
            ]
          }
        ]
      });

    const responseText =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "I could not generate a description for this image.";

    return {
      narration: responseText,
      description: responseText,
      mode,
      question: question || null,
      model:
        "meta-llama/llama-4-scout-17b-16e-instruct"
    };
  } catch (error) {
    console.error("Groq Vision Error:", error);

    throw new Error(
      error.message ||
        "Failed to analyze image."
    );
  }
}