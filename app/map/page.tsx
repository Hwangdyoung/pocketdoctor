"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Map component to avoid SSR issues with Leaflet
const Map = dynamic(
  () => import("../../components/MapComponent"), 
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 dark:border-neutral-700 border-t-[var(--color-accent)] animate-spin mb-4"></div>
        <p className="text-sm font-medium text-gray-500">지도를 불러오는 중입니다...</p>
      </div>
    )
  }
);

export default function MapPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white dark:bg-neutral-800 sticky top-0 z-10 border-b border-[var(--color-border)] shadow-sm">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>📍</span> 주변 병원 찾기
        </h1>
        <p className="text-xs text-[var(--color-text-sub)] mt-1">
          현재 위치 기반으로 가까운 수의과/병원을 안내합니다.
        </p>

        {/* Filter Tags */}
        <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
          {["전체", "내과", "소아과", "이비인후과", "동물병원", "24시간"].map((tag, i) => (
            <button 
              key={tag} 
              onClick={() => {
                setActiveCategory(tag);
                console.log(`Selected map category: ${tag}`);
              }}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-medium border transition-colors active:scale-95 ${
                activeCategory === tag
                  ? "bg-gray-100 dark:bg-neutral-100 text-gray-900 dark:text-gray-900 border-gray-300 dark:border-neutral-100" 
                  : "bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-[var(--color-border)] hover:bg-gray-50 dark:hover:bg-neutral-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </header>

      {/* Map Container */}
      <div className="flex-1 relative z-0">
        <Map />
      </div>

    </div>
  );
}
