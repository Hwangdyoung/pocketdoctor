"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide Bottom Nav on login page
  if (pathname.includes("/auth/login") || pathname.includes("/symptom/chat")) {
    return null;
  }

  const navItems = [
    { name: "홈", path: "/", icon: "🏠" },
    { name: "커뮤니티", path: "/community", icon: "🧑‍🤝‍🧑" },
    { name: "글쓰기", path: "/community/post/new", icon: "➕", isCenter: true },
    { name: "지도", path: "/map", icon: "📍" },
    { name: "설정", path: "/settings", icon: "⚙️" },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white border-t border-[var(--color-border)] pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path) && !item.isCenter);

          if (item.isCenter) {
            return (
              <Link
                key={item.path}
                href={item.path}
                className="relative -top-5 flex items-center justify-center w-14 h-14 bg-[var(--color-accent)] text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
              >
                <span className="text-2xl">{item.icon}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
                isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-sub)] hover:text-[var(--color-text-main)]"
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-[10px] font-medium tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
