import { AIResult } from "@/types";

interface AIResultCardProps {
  result: AIResult;
}

export default function AIResultCard({ result }: AIResultCardProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "높음": return "bg-[var(--color-danger)] text-white";
      case "중간": return "bg-[var(--color-warning)] text-white";
      case "낮음": return "bg-[var(--color-success)] text-white";
      default: return "bg-gray-200 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200";
    }
  };

  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden w-full mb-4">
      <div className="bg-zinc-50 text-zinc-900 dark:bg-gradient-to-r dark:from-[var(--color-accent)] dark:to-red-900/60 dark:text-white px-5 py-4 border-b border-zinc-200 dark:border-none">
        <div className="flex justify-between items-center">
          <h2 className="font-bold">분석 결과</h2>
          <span className={`text-xs px-2 py-1 rounded-full font-bold shadow-sm ${getRiskColor(result.riskLevel)}`}>
            위험도: {result.riskLevel}
          </span>
        </div>
        <p className="text-xl font-bold mt-2 text-[var(--color-accent)] dark:text-inherit">
          {result.possibleDisease} <span className="opacity-75 text-sm font-normal text-zinc-900 dark:text-white">의심</span>
        </p>
      </div>
      
      <div className="p-5 space-y-4">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800 dark:text-white rounded-xl p-3 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-xs font-bold text-red-800 dark:text-red-400 mb-1 flex items-center gap-1">
              <span>🍔</span> 피해야 할 음식
            </h3>
            <p className="text-sm text-red-900 dark:text-red-300">{result.foodsToAvoid}</p>
          </div>
          <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800 dark:text-white rounded-xl p-3 border border-zinc-200 dark:border-zinc-700">
            <h3 className="text-xs font-bold text-orange-800 dark:text-orange-400 mb-1 flex items-center gap-1">
              <span>🏃</span> 피해야 할 행동
            </h3>
            <p className="text-sm text-orange-900 dark:text-orange-300">{result.actionsToAvoid}</p>
          </div>
        </div>

        <div className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800 dark:text-white rounded-xl p-4 border border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-bold text-green-800 dark:text-green-400 mb-1 flex items-center gap-2">
            <span>✨</span> 병원의 추천 행동
          </h3>
          <p className="text-sm text-green-900 dark:text-green-300">{result.recommendedActions}</p>
        </div>

        {result.visitHospital && (
          <div className="bg-red-50 text-red-700 dark:bg-[var(--color-danger)] dark:text-white rounded-xl p-4 shadow-sm flex items-center gap-3 border border-red-100 dark:border-none font-medium">
            <span className="text-2xl">🏥</span>
            <div>
              <h3 className="font-bold text-sm">병원 방문을 권장합니다</h3>
              <p className="text-xs opacity-90 mt-0.5">최대로 빠른 시일 내에 전문가와 상담하세요.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
