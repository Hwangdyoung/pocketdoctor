import Link from "next/link";
import VotePanel from "@/components/VotePanel";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Demo static data since we aren't fetching by ID dynamically yet
  const post = {
    id: id,
    content: "저희 집 강아지가 어제부터 계속 노란 토를 하는데, 병원에 가야할까요? 활력은 평소와 비슷합니다. 사료를 안 먹어서 그런가 싶다가도 혹시나 파보장염일까봐 무섭네요 ㅠㅠ 최근에 산책은 집 앞 빈터 쪽만 잠깐씩 다녀왔습니다. 혹시 비슷한 증상 겪어보신 견주님들 계실까요?",
    imageUrl: "yes",
    createdAt: "2시간 전",
    user: { name: "김망고아빠" },
    _count: { comments: 2, likes: 12, votes: 120 }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--color-bg)]">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] sticky top-0 z-20">
        <Link href="/community" className="p-2 -ml-2 text-xl">
          ←
        </Link>
        <span className="ml-2 font-bold text-sm">커뮤니티 글</span>
      </header>

      <div className="flex-1 overflow-y-auto pb-safe">
        {/* Post Content */}
        <div className="bg-white px-5 pt-6 pb-4 mb-2 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#f8e5e5] flex items-center justify-center text-white font-bold text-base">
               {post.user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold">{post.user.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-text-sub)]">
                <span>{post.createdAt}</span>
                <span>·</span>
                <span>조회 342</span>
              </div>
            </div>
            <div className="ml-auto p-2 text-gray-400">
              ⋮
            </div>
          </div>

          <div className="text-base text-gray-900 leading-relaxed max-w-none mb-6">
            <p>{post.content}</p>
          </div>

          {post.imageUrl && (
            <div className="w-full aspect-square bg-gray-100 rounded-2xl mb-6 flex flex-col items-center justify-center border border-[var(--color-border)]">
               <span className="text-4xl opacity-40 mb-2">📷</span>
               <span className="text-xs text-gray-400 font-medium">첨부 이미지</span>
            </div>
          )}

          {/* Tag */}
          <div className="flex gap-2 mb-6">
            <span className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium border border-red-100">
              #강아지
            </span>
            <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium border border-orange-100">
              #구토
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600 border-t border-[var(--color-border)] pt-4">
            <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <span className="text-lg">🤍</span> {post._count.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors">
              <span className="text-lg">💬</span> {post._count.comments}
            </button>
            <button className="flex items-center gap-2 hover:text-black transition-colors ml-auto">
              <span className="text-lg">📤</span> 공유
            </button>
          </div>
        </div>

        {/* Vote UI */}
        <div className="px-4">
          <VotePanel />
        </div>

        {/* Comments Section */}
        <div className="bg-white border-t border-[var(--color-border)] mt-2">
          <div className="px-5 py-4 border-b border-[var(--color-border)]">
            <h3 className="font-bold text-sm">댓글 <span className="text-[var(--color-accent)]">{post._count.comments}</span></h3>
          </div>
          
          <div className="divide-y divide-[var(--color-border)]">
            {/* Mock Comment 1 */}
            <div className="p-5 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-500">지</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-800">지니어스맘</span>
                  <span className="text-[10px] text-gray-400">1시간 전</span>
                </div>
                <p className="text-sm text-gray-700">노란 토를 한 번만 했다면 좀 지켜봐도 되지만 여러 번 지속된다면 꼭 병원 가보세요! 탈수 올 수 있어요.</p>
              </div>
            </div>

            {/* Mock Comment 2 */}
            <div className="p-5 flex gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">멍</div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-800">멍멍이젤리</span>
                  <span className="text-[10px] text-gray-400">30분 전</span>
                </div>
                <p className="text-sm text-gray-700">공복이 길어져서 그럴 수도 있어요. 사료를 조금씩 자주 줘보시는 건 어떨까요?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Input */}
      <div className="bg-white border-t border-[var(--color-border)] p-3 pb-safe sticky bottom-0">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="댓글을 입력하세요..." 
            className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-accent)] transition-all"
          />
          <button className="bg-[var(--color-accent)] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}
