"use client";

import { useState } from "react";

interface VoteOption {
  id: string;
  label: string;
  percentage: number;
}

interface VotePanelProps {
  initialVoted?: boolean;
}

export default function VotePanel({ initialVoted = false }: VotePanelProps) {
  const [hasVoted, setHasVoted] = useState(initialVoted);
  
  // Dummy vote data for demo
  const [options, setOptions] = useState<VoteOption[]>([
    { id: "1", label: "병원 가야 한다 🏥", percentage: 55 },
    { id: "2", label: "지켜봐도 된다 👀", percentage: 30 },
    { id: "3", label: "나도 겪어봤다 🙋", percentage: 15 },
  ]);

  const handleVote = (id: string) => {
    if (hasVoted) return;
    
    // Increment selected option slightly for demo effect
    setOptions(prev => prev.map(opt => {
      if (opt.id === id) return { ...opt, percentage: Math.min(100, opt.percentage + 2) };
      return { ...opt, percentage: Math.max(0, opt.percentage - 1) };
    }));
    
    setHasVoted(true);
  };

  return (
    <div className="bg-white border text-sm border-[var(--color-border)] rounded-2xl p-5 w-full my-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🗳️</span>
        <h3 className="font-bold">커뮤니티의 생각은?</h3>
      </div>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleVote(option.id)}
            disabled={hasVoted}
            className="w-full relative overflow-hidden rounded-xl h-11 border border-[var(--color-border)] text-left hover:border-[var(--color-accent)] transition-all group disabled:cursor-default disabled:hover:border-[var(--color-border)]"
          >
            {/* Background Percentage Bar (only visible after vote) */}
            <div 
              className={`absolute top-0 left-0 h-full bg-[var(--color-accent)]/20 transition-all duration-1000 ease-out ${hasVoted ? 'opacity-100' : 'opacity-0'}`}
              style={{ width: `${hasVoted ? option.percentage : 0}%` }}
            ></div>
            
            <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
              <span className={`font-medium ${hasVoted ? 'text-gray-800' : 'text-gray-600 group-hover:text-black'}`}>
                {option.label}
              </span>
              {hasVoted && (
                <span className="font-bold text-[var(--color-accent)]">
                  {Math.round(option.percentage)}%
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {hasVoted && (
        <p className="text-center text-xs text-[var(--color-text-sub)] mt-3">
          투표가 완료되었습니다.
        </p>
      )}
    </div>
  );
}
