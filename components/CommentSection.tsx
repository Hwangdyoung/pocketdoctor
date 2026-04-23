"use client";

import { useState } from "react";
import { createComment } from "@/lib/actions/community";

interface CommentSectionProps {
  postId: string;
  initialComments: any[];
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const newComment = await createComment(postId, content);
      setComments([newComment, ...comments]);
      setContent("");
    } catch (error: any) {
      alert(error.message || "댓글 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 mt-2">
        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
          <h3 className="font-bold text-sm">
            댓글 <span className="text-[var(--color-accent)]">{comments.length}</span>
          </h3>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 pb-20">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-5 flex gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex-shrink-0 flex items-center justify-center text-xs font-bold text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-700">
                  {comment.user?.name?.[0] || "익"}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-zinc-800 dark:text-zinc-100">
                      {comment.user?.name || "익명"}
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center">
              <p className="text-xs text-zinc-400">첫 댓글을 남겨보세요!</p>
            </div>
          )}
        </div>
      </div>

      {/* Comment Input */}
      <div className="bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 p-3 pb-safe sticky bottom-0">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="댓글을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !content.trim()}
            className="bg-white text-zinc-900 dark:bg-[var(--color-accent)] dark:text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-zinc-200 dark:border-none hover:bg-zinc-50 transition-colors disabled:opacity-50"
          >
            {isLoading ? "..." : "↑"}
          </button>
        </form>
      </div>
    </>
  );
}
