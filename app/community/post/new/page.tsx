"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPost } from "@/lib/actions/community";

const CATEGORIES = ["사람 건강", "반려동물", "꿀팁", "질문"];

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      
      await createPost(formData);
      router.push("/community");
    } catch (error: any) {
      alert(error.message || "게시글 작성에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--color-bg)]">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-20">
        <div className="flex items-center">
          <Link href="/community" className="p-2 -ml-2 text-xl dark:text-neutral-200">
            ←
          </Link>
          <span className="ml-2 font-bold text-sm dark:text-neutral-200">글쓰기</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={isLoading || !content.trim()}
          className="bg-[var(--color-accent)] text-white px-4 py-1.5 rounded-full text-xs font-bold disabled:opacity-50 transition-opacity"
        >
          {isLoading ? "등록 중..." : "등록"}
        </button>
      </header>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Category Picker */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400 ml-1">게시판 선택</label>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  category === cat
                    ? "bg-zinc-900 dark:bg-neutral-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-neutral-100"
                    : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <input
            type="text"
            placeholder="제목을 입력하세요 (선택)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg font-bold bg-transparent border-none outline-none placeholder-zinc-300 dark:placeholder-zinc-600 dark:text-white"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-h-[300px]">
          <textarea
            placeholder="건강에 대한 궁금증이나 경험을 나누어보세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-[300px] text-sm bg-transparent border-none outline-none resize-none placeholder-zinc-300 dark:placeholder-zinc-600 leading-relaxed dark:text-zinc-200"
          />
        </div>

        {/* Image Placeholder (UI only for now) */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button type="button" className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 transition-colors">
            <span className="text-2xl">📷</span>
            <span className="text-xs font-medium">사진 추가</span>
          </button>
        </div>
      </form>
    </div>
  );
}
