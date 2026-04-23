"use client";

import { useState, useEffect } from "react";
import examples from "@/data/symptomExamples.json";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, isLoading = false }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholder every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % examples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-[var(--color-bg)] border-t border-[var(--color-border)] p-4 pb-safe z-10">
      <form onSubmit={handleSubmit} className="flex gap-2 items-end">
        <div className="flex-1 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-within:border-[var(--color-accent)] focus-within:ring-1 focus-within:ring-[var(--color-accent)] transition-all overflow-hidden relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`예: ${examples[placeholderIndex]}`}
            className="w-full bg-transparent p-4 outline-none text-zinc-900 dark:text-white text-sm resize-none min-h-[56px] max-h-[120px] hide-scrollbar"
            rows={1}
            disabled={isLoading}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "56px";
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="w-14 h-[56px] flex items-center justify-center bg-white text-zinc-900 dark:bg-[var(--color-accent)] dark:text-white rounded-2xl shadow-sm border border-zinc-200 dark:border-none disabled:opacity-50 disabled:bg-zinc-100 dark:disabled:bg-zinc-600 transition-colors"
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
