import Link from "next/link";
import SymptomButtons from "@/components/SymptomButtons";

export default function PetSymptomPage() {
  const options = [
    "밥을 안 먹어요 🥣", 
    "구토를 해요 🤮", 
    "설사를 해요 💩", 
    "기운이 없어요 🥺", 
    "이상 행동을 해요 🌀", 
    "기타 증상 💬"
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)] px-6 pt-12 pb-8">
      <header className="mb-8">
        <Link href="/" className="inline-block p-2 -ml-2 mb-4 text-xl dark:text-neutral-200">
          ←
        </Link>
        <h1 className="text-2xl font-bold">
          어떤 증상을 보이나요?
        </h1>
        <p className="text-sm text-[var(--color-text-sub)] mt-2">
          반려동물의 상태를 선택하거나 직접 알려주세요.
        </p>
      </header>

      <div className="flex-1">
        <SymptomButtons options={options} isPet={true} />
        
        <div className="mt-8 border border-[var(--color-border)] rounded-2xl p-5 bg-white dark:bg-neutral-800 shadow-sm flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-700/50 rounded-full flex items-center justify-center text-xl">
            📷
          </div>
          <div className="text-center">
            <h3 className="font-bold text-sm dark:text-neutral-100">사진으로 증상 확인</h3>
            <p className="text-xs text-[var(--color-text-sub)] mt-1">상처나 이상 부위를 찍어주세요 🐶🐱</p>
          </div>
          <button className="w-full mt-2 bg-gray-100 dark:bg-neutral-100 text-gray-900 dark:text-gray-900 text-sm font-medium py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-neutral-200 border border-gray-200 dark:border-none transition-colors">
            사진 업로드
          </button>
        </div>
      </div>

    </div>
  );
}
