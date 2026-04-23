"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SymptomButtonsProps {
  options: string[];
  isPet?: boolean;
}

export default function SymptomButtons({ options, isPet = false }: SymptomButtonsProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    // Add slight delay for animation before navigation
    setTimeout(() => {
      const type = isPet ? "pet" : "human";
      router.push(`/symptom/chat?type=${type}&q=${encodeURIComponent(option)}`);
    }, 200);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleSelect(option)}
          className={`flex-1 min-w-[40%] text-left p-4 rounded-xl border transition-all text-sm font-medium
            ${selected === option 
              ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-zinc-900 dark:text-white shadow-sm scale-[0.98]" 
              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white hover:border-[var(--color-accent)] dark:hover:border-[var(--color-accent)] hover:shadow-sm"
            }`}
        >
          {option}
        </button>
      ))}
      <button
        onClick={() => {
          const type = isPet ? "pet" : "human";
          router.push(`/symptom/chat?type=${type}&q=custom`);
        }}
        className="w-full text-center p-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all text-sm font-medium mt-2"
      >
        직접 입력하기 ✍️
      </button>
    </div>
  );
}
