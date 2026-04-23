"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useStore((state) => state.login);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Mock successful login
    login({
      email,
      name: email.split("@")[0] || "User",
    });

    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 bg-[var(--color-bg)]">
      <div className="w-full flex-1 flex flex-col justify-center max-w-sm mx-auto pt-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[var(--color-accent)] rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-md rotate-3">
            ❤️‍🩹
          </div>
          <h1 className="text-2xl font-bold mb-2">포켓 닥터</h1>
          <p className="text-sm text-[var(--color-text-sub)]">
            당신의 손 안의 작은 건강 비서
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input 
            type="email" 
            placeholder="이메일 주소" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
          />
          <button type="submit" className="mt-2 w-full flex items-center justify-center gap-3 bg-white text-zinc-900 dark:bg-[var(--color-accent)] dark:text-white py-3.5 px-4 rounded-xl font-medium shadow-sm border border-zinc-200 dark:border-none hover:bg-zinc-50 dark:hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]">
            로그인
          </button>
        </form>

        <div className="mt-6 flex justify-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <button className="hover:text-zinc-900 dark:hover:text-white transition-colors">비밀번호 찾기</button>
          <span>|</span>
          <button className="hover:text-[var(--color-accent)] font-medium transition-colors">회원가입</button>
        </div>
      </div>
    </div>
  );
}
