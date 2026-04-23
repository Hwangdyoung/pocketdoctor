"use client";

import { useState } from "react";
import { toggleLike } from "@/lib/actions/community";

interface LikeButtonProps {
  postId: string;
  initialLikeCount: number;
  initialIsLiked: boolean;
}

export default function LikeButton({ postId, initialLikeCount, initialIsLiked }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;

    // Optimistic Update
    const previousIsLiked = isLiked;
    const previousLikeCount = likeCount;

    setIsLiked(!previousIsLiked);
    setLikeCount(previousIsLiked ? previousLikeCount - 1 : previousLikeCount + 1);
    
    setIsLoading(true);
    try {
      const result = await toggleLike(postId);
      setLikeCount(result.likeCount);
      setIsLiked(result.liked);
    } catch (error) {
      // Rollback on error
      setIsLiked(previousIsLiked);
      setLikeCount(previousLikeCount);
      alert("로그인이 필요하거나 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLike}
      className={`flex items-center gap-2 transition-colors ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
    >
      <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span> {likeCount}
    </button>
  );
}
