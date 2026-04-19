"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChatInput from "@/components/ChatInput";
import AIResultCard from "@/components/AIResultCard";
import HealthGauge from "@/components/HealthGauge";
import SimulationCard from "@/components/SimulationCard";
import { AIResult, SimulationResult } from "@/types";

function ChatContent() {
  const searchParams = useSearchParams();
  const type = searchParams?.get("type") || "human";
  const initialQuery = searchParams?.get("q") || "";
  
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [simulation, setSimulation] = useState<SimulationResult | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    if (initialQuery && initialQuery !== "custom" && messages.length === 0) {
      handleSend(initialQuery);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, result, simulation, isLoading]);

  const handleSend = async (message: string) => {
    setMessages(prev => [...prev, { role: "user", content: message }]);
    setIsLoading(true);
    setResult(null);
    setSimulation(null);

    try {
      // Parallel API calls
      const [aiRes, simRes] = await Promise.all([
        fetch("/api/symptom", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptom: message, isPet: type === "pet" })
        }).then(r => r.json()),
        
        fetch("/api/simulation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptom: message, isPet: type === "pet" })
        }).then(r => r.json())
      ]);

      if (aiRes.error) throw new Error(aiRes.error);
      
      setResult(aiRes);
      setSimulation(simRes);
      
      // Calculate a dummy health score based on risk level
      const mockScore = aiRes.riskLevel === "낮음" ? Math.floor(Math.random() * 20) + 80 // 80-100
        : aiRes.riskLevel === "중간" ? Math.floor(Math.random() * 30) + 50 // 50-80
        : Math.floor(Math.random() * 30) + 20; // 20-50
        
      setMessages(prev => [
        ...prev, 
        { 
          role: "ai", 
          content: `${type === 'pet' ? '반려동물' : '환자'}님의 증상 분석이 완료되었습니다. 자세한 결과는 아래 카드를 확인해주세요.` 
        }
      ]);

      setResult(prev => prev ? { ...prev, score: mockScore } : null);

    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev, 
        { role: "ai", content: "죄송합니다. 분석 중 오류가 발생했습니다. 다시 시도해주세요." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[var(--color-bg)]">
      {/* Header */}
      <header className="flex items-center px-4 py-4 bg-white/80 backdrop-blur-md border-b border-[var(--color-border)] sticky top-0 z-20">
        <Link href={`/symptom/${type}`} className="p-2 -ml-2 text-xl">
          ←
        </Link>
        <div className="ml-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-[var(--color-accent)]/20 rounded-full flex items-center justify-center text-sm">
            🤖
          </div>
          <div>
            <h1 className="text-sm font-bold">AI 건강 비서</h1>
            <p className="text-[10px] text-[var(--color-text-sub)]">
              {type === "pet" ? "반려동물 건강 분석 모드" : "일반 건강 분석 모드"}
            </p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pt-6 pb-28 space-y-6 hide-scrollbar flex flex-col">
        
        {/* Intro Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex-shrink-0 flex items-center justify-center text-xs">
            🤖
          </div>
          <div className="bg-white border border-[var(--color-border)] rounded-2xl rounded-tl-sm p-4 text-sm shadow-sm max-w-[85%] leading-relaxed">
            안녕하세요. 증상을 자세히 말씀해주시면, AI가 상태를 분석하여 가능한 원인과 대처법을 안내해 드립니다.
          </div>
        </div>

        {/* Message Loop */}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex-shrink-0 flex items-center justify-center text-xs">
                🤖
              </div>
            )}
            <div className={`p-4 rounded-2xl text-sm shadow-sm max-w-[85%] leading-relaxed ${
              msg.role === "user" 
                ? "bg-[var(--color-accent)] text-white rounded-tr-sm" 
                : "bg-white border border-[var(--color-border)] rounded-tl-sm text-[var(--color-text-main)]"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)]/20 flex-shrink-0 flex items-center justify-center text-xs">
              🤖
            </div>
            <div className="bg-white border border-[var(--color-border)] rounded-2xl rounded-tl-sm p-4 py-5 shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Results Block */}
        {!isLoading && result && (
          <div className="pt-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
            <HealthGauge score={(result as any).score || 65} />
            <AIResultCard result={result} />
            {simulation && <SimulationCard simulation={simulation} />}
            
            <div className="mt-8 text-center text-[10px] text-[var(--color-text-sub)]">
              위 결과는 참고용이며, 의사의 진단을 대신할 수 없습니다.
            </div>
          </div>
        )}

      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="flex h-[100dvh] items-center justify-center bg-[var(--color-bg)]">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-[var(--color-accent)] animate-spin"></div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
