
export const AVAILABLE_MODELS_CONFIG = {
  // OpenAI models (Generally the most expensive tier)
  // GPT-4 class models are premium-priced. Mini is the cheapest.
  // "openai-gpt-4o": {
  //   id: 1,
  //   provider: "openai",
  //   model: "gpt-4o", // High cost, high quality
  //   available: true,
  // },
  // "openai-gpt-4o-mini": {
  //   id: 2,
  //   provider: "openai",
  //   model: "gpt-4o-mini", // Cheapest OpenAI option, very cost-efficient
  //   available: true,
  // },
  // "openai-gpt-4-turbo": {
  //   id: 3,
  //   provider: "openai",
  //   model: "gpt-4-turbo", // Medium-high cost, older 4-tier model
  //   available: true,
  // },
  // "openai-gpt-3.5-turbo": {
  //   id: 4,
  //   provider: "openai",
  //   model: "gpt-3.5-turbo", // Very cheap, but legacy and weaker
  //   available: true,
  // },

  // Groq models (Fastest and extremely cheap)
  // Groq is known for speed + lowest prices among big model hosts.
  "groq-llama-3.1-70b": {
    id: 5,
    provider: "groq",
    model: "llama-3.1-70b-versatile", // Cheap for a 70B, great value
    available: true,
  },
  "groq-llama-3.1-8b": {
    id: 6,
    provider: "groq",
    model: "llama-3.1-8b-instant", // Very cheap, ultra-fast
    available: true,
  },
  "groq-mixtral-8x7b": {
    id: 7,
    provider: "groq",
    model: "mixtral-8x7b-32768", // Cheap, fast, high context window
    available: true,
  },
  "groq-gemma2-9b": {
    id: 8,
    provider: "groq",
    model: "gemma2-9b-it", // One of the cheapest quality models anywhere
    available: true,
  },

  // DeepSeek models (Very cheap + excellent output quality)
  // DeepSeek is known for offering near-4-level quality at absurdly low prices.
  "deepseek-chat": {
    id: 9,
    provider: "deepseek",
    model: "deepseek-chat", // Dirt cheap, strong reasoning
    available: true,
  },
  "deepseek-coder": {
    id: 10,
    provider: "deepseek",
    model: "deepseek-coder", // Cheap and very good for coding tasks
    available: true,
  },

  // OpenRouter models (Prices vary wildly depending on the model)
  // These are hosted versions of popular open-source models; usually medium cost.
  "openrouter-llama-3.1-70b": {
    id: 11,
    provider: "openrouter",
    model: "meta-llama/llama-3.1-70b-instruct", // Medium cost, high-quality open-source
    available: true,
  },
  "openrouter-mixtral-8x7b": {
    id: 12,
    provider: "openrouter",
    model: "mistralai/mixtral-8x7b-instruct", // Medium cost, good performer
    available: true,
  },
  "openrouter-qwen-2.5": {
    id: 13,
    provider: "openrouter",
    model: "qwen/qwen-2.5-72b-instruct", // Medium-low cost for a 72B model
    available: true,
  },
  "openrouter-gemma2": {
    id: 14,
    provider: "openrouter",
    model: "google/gemma-2-27b-it", // Medium-low cost, decent reasoning
    available: true,
  },
  // "openrouter-claude": {
  //   id: 15,
  //   provider: "openrouter",
  //   model: "anthropic/claude-3.5-sonnet", // High cost (Claude models are premium)
  //   available: true,
  // },

  // Ollama models (free to run locally, but use your hardware)
  // Cost depends on your electricity bill, not tokens.
  // Uncomment when running local models.
  // Ollama models (local models - requires Ollama server running)
  // "ollama-llama3.1": {
  //   id: 16,
  //   provider: "ollama", //did ollama pull llama3.1
  //   model: "llama3.1",
  //   available: true,
  // },
  // "ollama-llama3.2": {
  //   id: 17,
  //   provider: "ollama",
  //   model: "llama3.2",
  //   available: true,
  // },
  // "ollama-llama3": {
  //   id: 18,
  //   provider: "ollama",
  //   model: "llama3",
  //   available: true,
  // },
  // "ollama-mistral": {
  //   id: 19,
  //   provider: "ollama",
  //   model: "mistral",
  //   available: true,
  // },
  // "ollama-mixtral": {
  //   id: 20,
  //   provider: "ollama",
  //   model: "mixtral",
  //   available: true,
  // },
  // "ollama-codellama": {
  //   id: 21,
  //   provider: "ollama",
  //   model: "codellama",
  //   available: true,
  // },
  "ollama-gemma3": {
    id: 22,
    provider: "ollama",
    model: "gemma3",
    available: true,
  },
  // "ollama-phi3": {
  //   id: 23,
  //   provider: "ollama",
  //   model: "phi3",
  //   available: true,
  // },
  // "ollama-gemma2": {
  //   id: 24,
  //   provider: "ollama",
  //   model: "gemma2",
  //   available: true,
  // },
  // "ollama-qwen2": {
  //   id: 25,
  //   provider: "ollama",
  //   model: "qwen2",
  //   available: true,
  // },
  // "ollama-neural-chat": {
  //   id: 26,
  //   provider: "ollama",
  //   model: "neural-chat",
  //   available: true,
  // },
};
