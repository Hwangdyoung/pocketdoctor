"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = ["전체", "사람 건강", "반려동물", "꿀팁", "질문"];

interface CategoryFilterProps {
  activeCategory: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "전체") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/community?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
      {CATEGORIES.map((tag) => (
        <button 
          key={tag} 
          onClick={() => handleCategoryClick(tag)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all active:scale-95 ${
            activeCategory === tag
              ? "bg-zinc-900 dark:bg-neutral-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-neutral-100" 
              : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
          }`}
        >
          {tag === "전체" ? "#전체" : tag}
        </button>
      ))}
    </div>
  );
}
