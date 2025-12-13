import OpenAI from "openai";
import { NextResponse } from "next/server";
import { OpenRouter } from "@openrouter/sdk";
import Ollama from "ollama";

// API Keys from environment variables
const apiKeyOfOpenAI = process.env.OPENAI_API_KEY;
const apiKeyOfGroq = process.env.GROQ_API_KEY;
const apiKeyOfDeepseek = process.env.DEEPSEEK_API_KEY;
const apiKeyOfOpenRouter = process.env.OPENROUTER_API_KEY;
const ollamaHost = process.env.OLLAMA_HOST || "http://127.0.0.1:11434";

// Initialize clients
// Note: The 'client' in modelConfig is the initialized SDK instance for each provider
// (OpenAI client, Groq client, Deepseek client, OpenRouter client, or Ollama client)
const openAIClient = apiKeyOfOpenAI
  ? new OpenAI({ apiKey: apiKeyOfOpenAI })
  : null;
const groqClient = apiKeyOfGroq
  ? new OpenAI({
      apiKey: apiKeyOfGroq,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;
const deepseekClient = apiKeyOfDeepseek
  ? new OpenAI({
      apiKey: apiKeyOfDeepseek,
      baseURL: "https://api.deepseek.com/v1",
    })
  : null;
const openRouter = apiKeyOfOpenRouter
  ? new OpenRouter({ apiKey: apiKeyOfOpenRouter })
  : null;
// @ts-ignore - Ollama default export is constructable at runtime
// const ollamaClient = new Ollama({ host: ollamaHost }); // Ollama runs locally, no API key needed

const ollamaClient = {
  chat: (options: any) => Ollama.chat({ ...options }),
  generate: (options: any) => Ollama.generate({ ...options }),
  list: () => Ollama.list(),
};
// Available models/agents configuration
const client = {
  openAIClient,
  groqClient,
  deepseekClient,
  openRouter,
  ollamaClient,
};
export default client;
