import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)] px-6 pt-12 pb-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-main)]">
            안녕하세요, <br />
            <span className="text-[var(--color-accent)]">포켓 닥터</span>입니다.
          </h1>
          <p className="text-sm text-[var(--color-text-sub)] mt-2">
            누구의 건강을 살펴볼까요?
          </p>
        </div>
      </header>

      {/* Main Options */}
      <div className="flex flex-col gap-4 mt-4">
        <Link 
          href="/symptom/human"
          className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all hover:shadow-md group"
        >
          <div className="flex justify-between items-center z-10 relative">
            <div>
              <h2 className="text-xl font-bold mb-1">사람</h2>
              <p className="text-xs text-[var(--color-text-sub)]">나와 가족의 증상을 분석합니다</p>
            </div>
            <div className="w-16 h-16 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
              🧑
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[var(--color-accent)]/5 rounded-full z-0"></div>
        </Link>

        <Link 
          href="/symptom/pet"
          className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all hover:shadow-md group"
        >
          <div className="flex justify-between items-center z-10 relative">
            <div>
              <h2 className="text-xl font-bold mb-1">반려동물</h2>
              <p className="text-xs text-[var(--color-text-sub)]">강아지, 고양이의 상태를 알아봅니다</p>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform cursor-base">
              🐶
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50/50 rounded-full z-0"></div>
        </Link>
      </div>

      {/* Health Overview Teaser */}
      <div className="mt-10 bg-white rounded-2xl p-5 shadow-sm border border-[var(--color-border)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-sm">최근 건강 브리핑</h3>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">NEW</span>
        </div>
        <div className="flex items-center gap-3 bg-[var(--color-bg)] p-3 rounded-xl border border-[var(--color-border)]">
          <div className="text-2xl">🚨</div>
          <div>
            <p className="text-xs font-bold">최근 2주간 두통 빈도 증가</p>
            <p className="text-[10px] text-[var(--color-text-sub)] mt-0.5">상태를 확인하고 물을 자주 마셔주세요.</p>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="mt-auto pt-6 text-center">
        <p className="text-[10px] text-[var(--color-text-sub)] max-w-[200px] mx-auto">
          ⚠️ 이 정보는 참고용이며 정확한 진단은 의료 전문가와 상담하세요.
        </p>
      </div>
    </div>
  );
}
