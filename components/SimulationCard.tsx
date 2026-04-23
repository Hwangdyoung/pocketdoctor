import { SimulationResult } from "@/types";

interface SimulationCardProps {
  simulation: SimulationResult;
}

export default function SimulationCard({ simulation }: SimulationCardProps) {
  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden w-full mb-4">
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
        <h2 className="font-bold flex items-center gap-2">
          <span>🔮</span> 미래 시뮬레이션
        </h2>
        <p className="text-xs text-[var(--color-text-sub)] mt-1">
          현재 상태를 바탕으로 예측한 두 가지 시나리오입니다.
        </p>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
        
        {/* 방치했을 경우 */}
        <div className="p-5 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
          <h3 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2 mb-3">
            <span>⚠️</span> 아무 조치를 취하지 않았을 경우
          </h3>
          <div className="space-y-2">
            <div className="flex gap-4">
              <div className="w-1.5 rounded-full bg-red-200"></div>
              <div className="flex-1">
                <p className="text-xs font-bold mb-0.5 text-gray-500">예상 경과</p>
                <p className="text-sm">{simulation.ifIgnored.timeline}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 rounded-full bg-red-200"></div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">악화 가능성</span>
                <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 rounded font-bold">
                  {simulation.ifIgnored.worseningProbability}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 관리했을 경우 */}
        <div className="p-5 bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
          <h3 className="text-sm font-bold text-green-700 dark:text-green-400 flex items-center gap-2 mb-3">
            <span>✅</span> 즉각적으로 관리/치료했을 경우
          </h3>
          <div className="space-y-2">
            <div className="flex gap-4">
              <div className="w-1.5 rounded-full bg-green-200"></div>
              <div className="flex-1">
                <p className="text-xs font-bold mb-0.5 text-gray-500">예상 경과</p>
                <p className="text-sm">{simulation.ifManaged.timeline}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1.5 rounded-full bg-green-200"></div>
              <div className="flex-1 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">회복 예상 시간</span>
                <span className="text-sm font-medium text-green-800 dark:text-green-400">
                  {simulation.ifManaged.recoveryTime}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
