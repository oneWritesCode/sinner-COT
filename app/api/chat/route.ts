import OpenAI from "openai";
import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import Ollama from "ollama";
import { AVAILABLE_MODELS } from "@/app/lib/models.server";

type ModelKey = keyof typeof AVAILABLE_MODELS;

export async function POST(req: Request) {
  try {
    const { messages, model: requestedModel } = await req.json();
    // model:requestedModel == "undefined" ? return
    if (!requestedModel) {
      console.log("model not provided");
      return;
    }
    console.log({ messages, model: requestedModel });

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }
    console.log("message do have a content");

    // Default to OpenAI GPT-4o-mini if no model specified
    const modelKey: ModelKey = requestedModel as ModelKey;

    const modelConfig = AVAILABLE_MODELS[modelKey];

    console.log(modelConfig);

    if (!modelConfig) {
      return NextResponse.json(
        {
          error: `Model "${requestedModel}" not found. Available models: ${Object.keys(
            AVAILABLE_MODELS
          ).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if client is available (for API-based providers)
    // Note: Ollama doesn't need API keys, but we still check if client exists
    if (!modelConfig.client && modelConfig.provider !== "ollama") {
      return NextResponse.json(
        {
          error: `API key for ${
            modelConfig.provider
          } is not configured. Please set ${modelConfig.provider.toUpperCase()}_API_KEY in your environment variables.`,
        },
        { status: 500 }
      );
    }

    let completion;

    if (modelConfig.provider === "openrouter") {
      // Use OpenRouter SDK
      const response = await (modelConfig.client as OpenRouter).chat.send({
        model: modelConfig.model,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: false,
      });
      completion = {
        choices: [
          {
            message: {
              role: "assistant",
              content: response.choices[0]?.message?.content || "",
            },
          },
        ],
      };
    } else if (modelConfig.provider === "ollama") {
      // Use Ollama SDK (local models)
      const response = await (modelConfig.client as any).chat({
        model: modelConfig.model,
        messages: messages.map((msg: any) => ({
          role: msg.role,
          content: msg.content,
        })),
      });
      completion = {
        choices: [
          {
            message: {
              role: "assistant",
              content: response.message?.content || "",
            },
          },
        ],
      };
    } else {
      // Use OpenAI-compatible SDK (OpenAI, Groq, Deepseek)
      completion = await (modelConfig.client as OpenAI).chat.completions.create(
        {
          model: modelConfig.model,
          messages: messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content,
          })),
        }
      );
    }

    return NextResponse.json({
      reply: completion.choices[0].message,
      model: modelKey,
      provider: modelConfig.provider,
    });
  } catch (error: any) {
    console.error("Chat route error", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate reply." },
      { status: 500 }
    );
  }
}

// GET endpoint to list available models
export async function GET() {
  const availableModels = await Promise.all(
    Object.keys(AVAILABLE_MODELS).map(async (key) => {
      const modelConfig = AVAILABLE_MODELS[key as ModelKey];
      let available = !!modelConfig.client;

      // For Ollama, check if the server is accessible
      if (modelConfig.provider === "ollama" && modelConfig.client) {
        try {
          // Try to list models to verify Ollama server is running
          await (modelConfig.client as any).list();
          available = true;
        } catch (error) {
          available = false;
        }
      }

      return {
        id: key,
        provider: modelConfig.provider,
        model: modelConfig.model,
        available,
      };
    })
  );

  return NextResponse.json({ models: availableModels });
}
