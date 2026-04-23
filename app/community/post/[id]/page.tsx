import Link from "next/link";
import VotePanel from "@/components/VotePanel";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const post = await db.communityPost.findUnique({
    where: { id },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: {
        where: {
          userId: session?.user?.id || "",
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
          votes: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  const isLiked = post.likes.length > 0;

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--color-bg)]">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-20">
        <Link href="/community" className="p-2 -ml-2 text-xl dark:text-neutral-200">
          ←
        </Link>
        <span className="ml-2 font-bold text-sm dark:text-neutral-200">커뮤니티 글</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-safe">
        {/* Post Content */}
        <div className="bg-white dark:bg-zinc-900 px-5 pt-6 pb-4 mb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-zinc-50 text-zinc-900 dark:bg-gradient-to-br dark:from-[var(--color-accent)] dark:to-[#f8e5e5] dark:text-white border border-zinc-200 dark:border-none flex items-center justify-center font-bold text-base">
               {post.user.name?.[0] || "익"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold dark:text-neutral-100">{post.user.name || "익명"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-sub)]">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>·</span>
                <span>조회 342</span>
              </div>
            </div>
            <div className="ml-auto p-2 text-gray-400">
              ⋮
            </div>
          </div>

          {post.title && (
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {post.title}
            </h2>
          )}

          <div className="text-base text-zinc-900 dark:text-zinc-200 leading-relaxed max-w-none mb-6">
            <p>{post.content}</p>
          </div>

          {post.imageUrl && (
            <div className="w-full aspect-square bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl mb-6 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-700">
               <span className="text-4xl opacity-40 mb-2">📷</span>
               <span className="text-xs text-gray-400 dark:text-neutral-400 font-medium">첨부 이미지</span>
            </div>
          )}

          {/* Tag */}
          {post.category && (
            <div className="flex gap-2 mb-6">
              <span className="text-xs bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full font-medium border border-red-100 dark:border-red-900/30">
                #{post.category}
              </span>
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 pt-4">
            <LikeButton 
              postId={post.id} 
              initialLikeCount={post._count.likes} 
              initialIsLiked={isLiked} 
            />
            <div className="flex items-center gap-2">
              <span className="text-lg">💬</span> {post._count.comments}
            </div>
            <button className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors ml-auto">
              <span className="text-lg">📤</span> 공유
            </button>
          </div>
        </div>

        {/* Vote UI */}
        <div className="px-4">
          <VotePanel />
        </div>

        {/* Comments Section */}
        <CommentSection postId={post.id} initialComments={JSON.parse(JSON.stringify(post.comments))} />
      </div>
    </div>
  );
}
