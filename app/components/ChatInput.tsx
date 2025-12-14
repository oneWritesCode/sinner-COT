"use client";
import { useState, FormEvent, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { FaHourglassEnd } from "react-icons/fa";
import { AVAILABLE_MODELS_CONFIG } from "@/app/lib/models.config";

type Props = {
  loading: boolean;
  onSend: (msg: string) => Promise<void>;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
  selectedModel: string;
};
type ModelInfo = {
  id: number;
  provider: string;
  model: string;
  available: boolean;
};

function ChatInput({
  loading,
  onSend,
  setSelectedModel,
  selectedModel,
}: Props) {
  const [msg, setMsg] = useState("");
  const [availableModels, setAvailableModels] = useState<
    { key: string; data: ModelInfo }[]
  >([]);

  useEffect(() => {
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

    const content = msg.trim();
    setMsg("");
    await onSend(content);
  }

  return (
    <>
      {" "}
      <form onSubmit={submitInput} className="relative p-2 w-full boder-1 border-white/10 rounded-xl bg-white/10">
        <div className="w-full">
          {" "}
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full border-none outline-none focus:ring-none text-white resize-none"
            name="chat-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                const content = msg.trim();
                if (content && !loading) {
                  setMsg("");
                  onSend(content);
                }
              }
            }}
            id="chat-input"
            placeholder="Type your message..."
            disabled={loading}
          />
        </div>
        <div className="w-full flex justify-between gap-3">
        
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={loading}
              className="flex-1 px-2 py-1 max-w-[170px] text-sm border-none focus:outline-none focus:ring-none text-white disabled:opacity-50 disabled:cursor-not-allowed edited-scrollbar"
            >
              {availableModels.length === 0 ? (
                <option value="">Loading models...</option>
              ) : (
                availableModels.map(({ key, data }) => (
                  <option
                    key={key}
                    value={key}
                    disabled={!data.available}
                    className="bg-black/90 border-none"
                  >
                    {key} {!data.available && "(API key not configured)"}
                  </option>
                ))
              )}
            </select>
          <button
            type="submit"
            disabled={loading}
            className="w-8 h-8 bg-gray-300 text-black rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <FaHourglassEnd /> : <IoSend />}
          </button>
        </div>
      </form>
    </>
  );
}

export default ChatInput;
