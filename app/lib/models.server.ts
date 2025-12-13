import client from "./clients";

const openAIClient = client.openAIClient;
const groqClient = client.groqClient;
const deepseekClient = client.deepseekClient;
const openRouter = client.openRouter;
const ollamaClient = client.ollamaClient;

export const AVAILABLE_MODELS = {
  // OpenAI models (Generally the most expensive tier)
  // GPT-4 class models are premium-priced. Mini is the cheapest.
  "openai-gpt-4o": {
    provider: "openai",
    model: "gpt-4o", // High cost, high quality
    client: openAIClient,
  },
  "openai-gpt-4o-mini": {
    provider: "openai",
    model: "gpt-4o-mini", // Cheapest OpenAI option, very cost-efficient
    client: openAIClient,
  },
  "openai-gpt-4-turbo": {
    provider: "openai",
    model: "gpt-4-turbo", // Medium-high cost, older 4-tier model
    client: openAIClient,
  },
  "openai-gpt-3.5-turbo": {
    provider: "openai",
    model: "gpt-3.5-turbo", // Very cheap, but legacy and weaker
    client: openAIClient,
  },

  // Groq models (Fastest and extremely cheap)
  // Groq is known for speed + lowest prices among big model hosts.
  "groq-llama-3.1-70b": {
    provider: "groq",
    model: "llama-3.1-70b-versatile", // Cheap for a 70B, great value
    client: groqClient,
  },
  "groq-llama-3.1-8b": {
    provider: "groq",
    model: "llama-3.1-8b-instant", // Very cheap, ultra-fast
    client: groqClient,
  },
  "groq-mixtral-8x7b": {
    provider: "groq",
    model: "mixtral-8x7b-32768", // Cheap, fast, high context window
    client: groqClient,
  },
  "groq-gemma2-9b": {
    provider: "groq",
    model: "gemma2-9b-it", // One of the cheapest quality models anywhere
    client: groqClient,
  },

  // DeepSeek models (Very cheap + excellent output quality)
  // DeepSeek is known for offering near-4-level quality at absurdly low prices.
  "deepseek-chat": {
    provider: "deepseek",
    model: "deepseek-chat", // Dirt cheap, strong reasoning
    client: deepseekClient,
  },
  "deepseek-coder": {
    provider: "deepseek",
    model: "deepseek-coder", // Cheap and very good for coding tasks
    client: deepseekClient,
  },

  // OpenRouter models (Prices vary wildly depending on the model)
  // These are hosted versions of popular open-source models; usually medium cost.
  "openrouter-llama-3.1-70b": {
    provider: "openrouter",
    model: "meta-llama/llama-3.1-70b-instruct", // Medium cost, high-quality open-source
    client: openRouter,
  },
  "openrouter-mixtral-8x7b": {
    provider: "openrouter",
    model: "mistralai/mixtral-8x7b-instruct", // Medium cost, good performer
    client: openRouter,
  },
  "openrouter-qwen-2.5": {
    provider: "openrouter",
    model: "qwen/qwen-2.5-72b-instruct", // Medium-low cost for a 72B model
    client: openRouter,
  },
  "openrouter-gemma2": {
    provider: "openrouter",
    model: "google/gemma-2-27b-it", // Medium-low cost, decent reasoning
    client: openRouter,
  },
  "openrouter-claude": {
    provider: "openrouter",
    model: "anthropic/claude-3.5-sonnet", // High cost (Claude models are premium)
    client: openRouter,
  },

  // Ollama models (free to run locally, but use your hardware)
  // Cost depends on your electricity bill, not tokens.
  // Uncomment when running local models.
  // Ollama models (local models - requires Ollama server running)
  "ollama-llama3.1": {
    provider: "ollama", //did ollama pull llama3.1
    model: "llama3.1",
    client: ollamaClient,
  },
  "ollama-llama3.2": {
    provider: "ollama",
    model: "llama3.2",
    client: ollamaClient,
  },
  "ollama-llama3": {
    provider: "ollama",
    model: "llama3",
    client: ollamaClient,
  },
  "ollama-mistral": {
    provider: "ollama",
    model: "mistral",
    client: ollamaClient,
  },
  "ollama-mixtral": {
    provider: "ollama",
    model: "mixtral",
    client: ollamaClient,
  },
  "ollama-codellama": {
    provider: "ollama",
    model: "codellama",
    client: ollamaClient,
  },
  "ollama-gemma3": {
    provider: "ollama",
    model: "gemma3",
    client: ollamaClient,
  },
  "ollama-phi3": {
    provider: "ollama",
    model: "phi3",
    client: ollamaClient,
  },
  "ollama-gemma2": {
    provider: "ollama",
    model: "gemma2",
    client: ollamaClient,
  },
  "ollama-qwen2": {
    provider: "ollama",
    model: "qwen2",
    client: ollamaClient,
  },
  "ollama-neural-chat": {
    provider: "ollama",
    model: "neural-chat",
    client: ollamaClient,
  },
};
