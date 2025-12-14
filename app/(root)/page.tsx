"use client";

import { useState, useEffect } from "react";
import ChatInput from "@/app/components/ChatInput";
import EmptyChat from "../components/EmptyChat";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ModelInfo = {
  id: number;
  provider: string;
  model: string;
  available: boolean;
};

function Page() {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("ollama-gemma3");

  useEffect(() => {
    setChat((prev) => [
      ...prev,
      { role: "user", content: "hey" },
      { role: "assistant", content: "hehe" },
    ]);
  }, []);

  async function handleSend(userContent: string) {
    const userMsg: ChatMessage = { role: "user", content: userContent };
    const updatedChat = [...chat, userMsg];
    setChat(updatedChat);
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedChat, model: selectedModel }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      const botMsg: ChatMessage = {
        role: "assistant",
        content: data.reply?.content ?? "Sorry, I could not respond.",
      };

      setChat((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setError("Unable to reach the chatbot. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-semibold mb-4">Sigma + natkhat Chatbot</h1>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="rounded-xl p-4 h-[60vh] overflow-y-auto ">
          {chat.length === 0 && (
            <EmptyChat/>
          )}
          {chat.map((m, i) => (
            <div key={i} className="mb-3 flex flex-col">
              <p
                className={`text-sm font-semibold inline ${
                  m.role === "user" ? "text-white bg-white/10 self-end p-2 rounded-lg  " : "text-gray-300"
                }`}
              >
                {/* {m.role === "user" ? "You" : "Bot"} */}
                <span className="whitespace-pre-wrap">{m.content}</span>
              </p>
            </div>
          ))}
        </div>

        <ChatInput
          loading={loading}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          onSend={handleSend}
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default Page;
