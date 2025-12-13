"use client";

import { FormEvent, useState, useEffect, ReactNode } from "react";
import { AVAILABLE_MODELS_CONFIG } from "@/app/lib/models.config";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ModelInfo = {
  id: number;
  provider: string;
  model: string;
  available: boolean;
};

function Page() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("ollama-gemma3");
  // const [selectedModel, setSelectedModel] = useState<string>("openrouter-gemma2");
  const [availableModels, setAvailableModels] = useState<
    { key: string; data: ModelInfo }[]
  >([]);

  useEffect(() => {
    // setAvailableModels(AVAILABLE_MODELS_CONFIG);
    const formatted = Object.entries(AVAILABLE_MODELS_CONFIG).map(
      ([key, data]) => ({
        key,
        data,
      })
    );

    setAvailableModels(formatted);
  }, []);

  async function submitInput(e: FormEvent) {
    e.preventDefault();
    if (!msg.trim() || loading) return;

    const userMsg: ChatMessage = { role: "user", content: msg.trim() };
    const updatedChat = [...chat, userMsg];
    setChat(updatedChat);
    setMsg("");
    setError(null);
    setLoading(true);

    console.log("everything is alright now sending api fetch");

    try {
      const model = selectedModel;

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedChat, model }),
      });

      console.log("everything is alright now checking response");

      console.log(res);

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      console.log("response is ok now saving data");

      const data = await res.json();
      const botMsg: ChatMessage = {
        role: "assistant",
        content: data.reply?.content ?? "Sorry, I could not respond.",
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("failed to reach chatbot :: ", err);
      setError("Unable to reach the chatbot. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Multi-Agent Chatbot</h1>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {/* Model Selector */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="model-select"
            className="text-sm font-medium text-white/70"
          >
            Select Agent:
          </label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={loading}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-white disabled:opacity-50 disabled:cursor-not-allowed edited-scrollbar"
          >
           
            {availableModels.length === 0 ? (
              <option value="">Loading models...</option>
            ) : (
              availableModels.map(({ key, data }) => (
                <option key={key} value={key} disabled={!data.available} className="bg-black/90 border-none ">
                  {key} {!data.available && "(API key not configured)"}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="border border-white/10 rounded-xl p-4 h-[60vh] overflow-y-auto bg-white/5">
          {chat.length === 0 && (
            <p className="text-white/50">Ask me anything to get started.</p>
          )}
          {chat.map((m, i) => (
            <div key={i} className="mb-3">
              <p
                className={`text-sm font-semibold ${
                  m.role === "user" ? "text-blue-300" : "text-green-300"
                }`}
              >
                {m.role === "user" ? "You" : "Bot"}
              </p>
              <p className="text-white/90 whitespace-pre-wrap">{m.content}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={submitInput}
          className="relative w-full flex items-end gap-2"
        >
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white resize-none min-h-[90px]"
            name="chat-input"
            id="chat-input"
            placeholder="Type your message..."
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "..." : "Send"}
          </button>
        </form>

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Page;
