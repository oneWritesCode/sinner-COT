import OpenAI from "openai";
import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import Ollama from "ollama";
import { AVAILABLE_MODELS } from "@/app/lib/models.server";

// import { openAIClient, groqClient, deepseekClient, openRouter, ollamaClient } from "./clients";

// // API Keys from environment variables
// const apiKeyOfOpenAI = process.env.OPENAI_API_KEY;
// const apiKeyOfGroq = process.env.GROQ_API_KEY;
// const apiKeyOfDeepseek = process.env.DEEPSEEK_API_KEY;
// const apiKeyOfOpenRouter = process.env.OPENROUTER_API_KEY;
// const ollamaHost = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

// // Initialize clients
// // Note: The 'client' in modelConfig is the initialized SDK instance for each provider
// // (OpenAI client, Groq client, Deepseek client, OpenRouter client, or Ollama client)
// const openAIClient = apiKeyOfOpenAI
//   ? new OpenAI({ apiKey: apiKeyOfOpenAI })
//   : null;
// const groqClient = apiKeyOfGroq
//   ? new OpenAI({
//       apiKey: apiKeyOfGroq,
//       baseURL: "https://api.groq.com/openai/v1",
//     })
//   : null;
// const deepseekClient = apiKeyOfDeepseek
//   ? new OpenAI({
//       apiKey: apiKeyOfDeepseek,
//       baseURL: "https://api.deepseek.com/v1",
//     })
//   : null;
// const openRouter = apiKeyOfOpenRouter
//   ? new OpenRouter({ apiKey: apiKeyOfOpenRouter })
//   : null;
// // @ts-ignore - Ollama default export is constructable at runtime
// // const ollamaClient = new Ollama({ host: ollamaHost }); // Ollama runs locally, no API key needed

// const ollamaClient = {
//   chat: (options: any) => Ollama.chat({ ...options }),
//   generate: (options: any) => Ollama.generate({ ...options }),
//   list: () => Ollama.list(),
// };
// // Available models/agents configuration


// export const AVAILABLE_MODELS = {
//   // OpenAI models (Generally the most expensive tier)
//   // GPT-4 class models are premium-priced. Mini is the cheapest.
//   "openai-gpt-4o": {
//     provider: "openai",
//     model: "gpt-4o", // High cost, high quality
//     client: openAIClient,
//   },
//   "openai-gpt-4o-mini": {
//     provider: "openai",
//     model: "gpt-4o-mini", // Cheapest OpenAI option, very cost-efficient
//     client: openAIClient,
//   },
//   "openai-gpt-4-turbo": {
//     provider: "openai",
//     model: "gpt-4-turbo", // Medium-high cost, older 4-tier model
//     client: openAIClient,
//   },
//   "openai-gpt-3.5-turbo": {
//     provider: "openai",
//     model: "gpt-3.5-turbo", // Very cheap, but legacy and weaker
//     client: openAIClient,
//   },

//   // Groq models (Fastest and extremely cheap)
//   // Groq is known for speed + lowest prices among big model hosts.
//   "groq-llama-3.1-70b": {
//     provider: "groq",
//     model: "llama-3.1-70b-versatile", // Cheap for a 70B, great value
//     client: groqClient,
//   },
//   "groq-llama-3.1-8b": {
//     provider: "groq",
//     model: "llama-3.1-8b-instant", // Very cheap, ultra-fast
//     client: groqClient,
//   },
//   "groq-mixtral-8x7b": {
//     provider: "groq",
//     model: "mixtral-8x7b-32768", // Cheap, fast, high context window
//     client: groqClient,
//   },
//   "groq-gemma2-9b": {
//     provider: "groq",
//     model: "gemma2-9b-it", // One of the cheapest quality models anywhere
//     client: groqClient,
//   },

//   // DeepSeek models (Very cheap + excellent output quality)
//   // DeepSeek is known for offering near-4-level quality at absurdly low prices.
//   "deepseek-chat": {
//     provider: "deepseek",
//     model: "deepseek-chat", // Dirt cheap, strong reasoning
//     client: deepseekClient,
//   },
//   "deepseek-coder": {
//     provider: "deepseek",
//     model: "deepseek-coder", // Cheap and very good for coding tasks
//     client: deepseekClient,
//   },

//   // OpenRouter models (Prices vary wildly depending on the model)
//   // These are hosted versions of popular open-source models; usually medium cost.
//   "openrouter-llama-3.1-70b": {
//     provider: "openrouter",
//     model: "meta-llama/llama-3.1-70b-instruct", // Medium cost, high-quality open-source
//     client: openRouter,
//   },
//   "openrouter-mixtral-8x7b": {
//     provider: "openrouter",
//     model: "mistralai/mixtral-8x7b-instruct", // Medium cost, good performer
//     client: openRouter,
//   },
//   "openrouter-qwen-2.5": {
//     provider: "openrouter",
//     model: "qwen/qwen-2.5-72b-instruct", // Medium-low cost for a 72B model
//     client: openRouter,
//   },
//   "openrouter-gemma2": {
//     provider: "openrouter",
//     model: "google/gemma-2-27b-it", // Medium-low cost, decent reasoning
//     client: openRouter,
//   },
//   "openrouter-claude": {
//     provider: "openrouter",
//     model: "anthropic/claude-3.5-sonnet", // High cost (Claude models are premium)
//     client: openRouter,
//   },

//   // Ollama models (free to run locally, but use your hardware)
//   // Cost depends on your electricity bill, not tokens.
//   // Uncomment when running local models.
//   // Ollama models (local models - requires Ollama server running)
//   "ollama-llama3.1": {
//     provider: "ollama", //did ollama pull llama3.1
//     model: "llama3.1",
//     client: ollamaClient,
//   },
//   "ollama-llama3.2": {
//     provider: "ollama",
//     model: "llama3.2",
//     client: ollamaClient,
//   },
//   "ollama-llama3": {
//     provider: "ollama",
//     model: "llama3",
//     client: ollamaClient,
//   },
//   "ollama-mistral": {
//     provider: "ollama",
//     model: "mistral",
//     client: ollamaClient,
//   },
//   "ollama-mixtral": {
//     provider: "ollama",
//     model: "mixtral",
//     client: ollamaClient,
//   },
//   "ollama-codellama": {
//     provider: "ollama",
//     model: "codellama",
//     client: ollamaClient,
//   },
//   "ollama-gemma3": {
//     provider: "ollama",
//     model: "gemma3",
//     client: ollamaClient,
//   },
//   "ollama-phi3": { provider: "ollama", model: "phi3", client: ollamaClient },
//   "ollama-gemma2": {
//     provider: "ollama",
//     model: "gemma2",
//     client: ollamaClient,
//   },
//   "ollama-qwen2": { provider: "ollama", model: "qwen2", client: ollamaClient },
//   "ollama-neural-chat": {
//     provider: "ollama",
//     model: "neural-chat",
//     client: ollamaClient,
//   },
// };

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
