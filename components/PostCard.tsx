import Link from "next/link";
import { CommunityPost } from "@/types";

interface PostCardProps {
  post: CommunityPost;
}

export default function PostCard({ post }: PostCardProps) {
  // Mock counts for demo if _count is missing
  const counts = post._count || { comments: 3, likes: 12, votes: 45 };
  
  return (
    <Link href={`/community/post/${post.id}`} className="block w-full">
      <article className="bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all">
        {/* Author Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#f8e5e5] flex items-center justify-center text-white font-bold text-sm">
            {post.user?.name?.[0] || '익'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{post.user?.name || "익명"}</span>
              <span className="text-[10px] text-[var(--color-text-sub)]">· 2시간 전</span>
            </div>
            <span className="text-[10px] bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full inline-block mt-0.5 border border-red-100">
              #강아지 #구토
            </span>
          </div>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-800 line-clamp-3 mb-3 leading-relaxed">
          {post.content}
        </p>

        {/* Image Placeholder if imageUrl exists */}
        {post.imageUrl && (
          <div className="w-full h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
            <span className="text-2xl opacity-50">📷</span>
          </div>
        )}

        {/* Action Counters */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-sub)] mt-4 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-1.5 hover:text-black transition-colors">
            <span className="text-sm">💬</span> {counts.comments}
          </div>
          <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
            <span className="text-sm">❤️</span> {counts.likes}
          </div>
          <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
            <span className="text-sm">🗳️</span> 투표 진행중 ({counts.votes})
          </div>
        </div>
      </article>
    </Link>
  );
}
