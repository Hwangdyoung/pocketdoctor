"use client";

import { useState } from "react";
import PostCard from "@/components/PostCard";
import { CommunityPost } from "@/types";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  // Mock data for initial render
  const mockPosts: CommunityPost[] = [
    {
      id: "opt-1",
      userId: "user-1",
      content: "저희 집 강아지가 어제부터 계속 노란 토를 하는데, 병원에 가야할까요? 활력은 평소와 비슷합니다.",
      imageUrl: "yes", // Using string just to trigger the UI flag
      createdAt: new Date().toISOString(),
      user: { id: "user-1", name: "김망고아빠" },
      _count: { comments: 5, likes: 12, votes: 120 }
    },
    {
      id: "opt-2",
      userId: "user-2",
      content: "최근 들어 자고 일어나면 편두통이 너무 심해요. 비슷한 증상 겪어보신 분 있나요?",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      user: { id: "user-2", name: "건강최고" },
      _count: { comments: 8, likes: 23, votes: 45 }
    },
    {
      id: "opt-3",
      userId: "user-3",
      content: "고양이가 화장실을 들락날락하는데 볼일을 못 봐요. 이거 응급상황일까요?",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      user: { id: "user-3", name: "초보집사" },
      _count: { comments: 14, likes: 45, votes: 89 }
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white dark:bg-neutral-800 sticky top-0 z-10 border-b border-[var(--color-border)]">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🧑‍🤝‍🧑</span> 건강 커뮤니티
        </h1>
        <p className="text-xs text-[var(--color-text-sub)] mt-1">
          서로의 경험을 나누고 투표로 의견을 물어보세요.
        </p>

        {/* Filter Tags */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
          {["전체", "진행중인 투표", "사람 건강", "반려동물", "꿀팁", "질문"].map((tag, i) => (
            <button 
              key={tag} 
              onClick={() => {
                setActiveCategory(tag);
                console.log(`Selected category: ${tag}`);
              }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors active:scale-95 ${
                activeCategory === tag
                  ? "bg-gray-100 dark:bg-neutral-100 text-gray-900 dark:text-gray-900 border-gray-300 dark:border-neutral-100" 
                  : "bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-[var(--color-border)] hover:bg-gray-50 dark:hover:bg-neutral-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Feed */}
      <div className="flex-1 p-4 space-y-4">
        {mockPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        
        <div className="pt-8 pb-4 text-center">
          <p className="text-xs text-[var(--color-text-sub)]">모든 게시글을 다 불러왔습니다.</p>
        </div>
      </div>
    </div>
  );
}
