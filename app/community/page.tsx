import PostCard from "@/components/PostCard";
import { db } from "@/lib/db";
import { CommunityPost } from "@/types";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category || "전체";

  // Fetch real posts from DB
  const rawPosts = await db.communityPost.findMany({
    where: activeCategory !== "전체" ? {
      category: activeCategory
    } : {},
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      _count: {
        select: {
          comments: true,
          likes: true,
          votes: true,
        }
      }
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Map to CommunityPost type
  const posts: CommunityPost[] = rawPosts.map((p: any) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>🧑‍🤝‍🧑</span> 건강 커뮤니티
        </h1>
        <p className="text-xs text-[var(--color-text-sub)] mt-1">
          서로의 경험을 나누고 투표로 의견을 물어보세요.
        </p>

        {/* Filter Tags */}
        <CategoryFilter activeCategory={activeCategory} />
      </header>

      {/* Feed */}
      <div className="flex-1 p-4 space-y-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-sm text-zinc-400">등록된 게시글이 없습니다.</p>
          </div>
        )}
        
        {posts.length > 0 && (
          <div className="pt-8 pb-4 text-center">
            <p className="text-xs text-[var(--color-text-sub)]">모든 게시글을 다 불러왔습니다.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button for New Post */}
      <Link 
        href="/community/post/new"
        className="fixed right-6 bottom-24 w-14 h-14 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform z-30 text-2xl"
      >
        ➕
      </Link>
    </div>
  );
}
