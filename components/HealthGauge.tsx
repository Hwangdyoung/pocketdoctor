"use client";

import { useEffect, useState } from "react";

interface HealthGaugeProps {
  score: number; // 0 to 100
}

export default function HealthGauge({ score }: HealthGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Simple count-up animation
    const duration = 1500;
    const steps = 60;
    const stepTime = Math.abs(Math.floor(duration / steps));
    let currentScore = 0;
    
    const timer = setInterval(() => {
      currentScore += score / steps;
      if (currentScore >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(currentScore));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = (val: number) => {
    if (val >= 80) return "text-[var(--color-success)] stroke-[var(--color-success)]";
    if (val >= 50) return "text-[var(--color-warning)] stroke-[var(--color-warning)]";
    return "text-[var(--color-danger)] stroke-[var(--color-danger)]";
  };

  const getMessage = (val: number) => {
    if (val >= 80) return "건강 상태가 양호합니다!";
    if (val >= 50) return "지속적인 관리가 필요합니다.";
    return "주의! 빠른 조치가 필요합니다.";
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col items-center mb-4 w-full">
      <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-4 w-full">건강 게이지</h3>
      
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-32 h-32 absolute">
          <circle 
            cx="64" cy="64" r={radius} 
            stroke="currentColor" 
            strokeWidth="8" 
            fill="transparent" 
            className="text-gray-100 dark:text-neutral-700" 
          />
          <circle 
            cx="64" cy="64" r={radius} 
            stroke="currentColor" 
            strokeWidth="8" 
            fill="transparent" 
            className={`${getColor(animatedScore)} transition-all duration-300 ease-out`}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="text-center flex flex-col items-center">
          <span className={`text-3xl font-black ${getColor(animatedScore).split(' ')[0]}`}>
            {animatedScore}
          </span>
          <span className="text-[10px] text-[var(--color-text-sub)]">/ 100점</span>
        </div>
      </div>
      
      <p className="text-sm font-medium mt-4 text-center dark:text-neutral-200">
        {getMessage(animatedScore)}
      </p>
    </div>
  );
}
