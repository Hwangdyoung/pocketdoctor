import Link from "next/link";
import SymptomButtons from "@/components/SymptomButtons";

export default function HumanSymptomPage() {
  const options = [
    "두통이 심해요 🤕", 
    "기침이 안 멈춰요 😷", 
    "배가 아파요 🤢", 
    "열이 나요 🤒", 
    "너무 피곤해요 🥱", 
    "기타 증상 💬"
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)] px-6 pt-12 pb-8">
      <header className="mb-8">
        <Link href="/" className="inline-block p-2 -ml-2 mb-4 text-xl">
          ←
        </Link>
        <h1 className="text-2xl font-bold">
          어디가 아프신가요?
        </h1>
        <p className="text-sm text-[var(--color-text-sub)] mt-2">
          가장 비슷한 증상을 선택하거나 직접 입력해주세요.
        </p>
      </header>

      <div className="flex-1">
        <SymptomButtons options={options} isPet={false} />
      </div>

    </div>
  );
}
