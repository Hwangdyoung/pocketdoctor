"use client";

import { useState, useEffect, useRef } from "react";
import sounds from "@/data/notificationSounds.json";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState(sounds[0]);

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  // Handle client-side hydration for next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDarkMode = theme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse profile data", e);
      }
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch for theme-specific UI
  }

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)] text-zinc-900 dark:text-zinc-100">
      <header className="px-6 py-4 bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <span>⚙️</span> 설정
        </h1>
        <button
          onClick={handleSaveProfile}
          className="bg-white text-zinc-900 dark:bg-[var(--color-accent)] dark:text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-zinc-200 dark:border-none hover:bg-zinc-50 dark:hover:bg-[var(--color-accent-hover)] transition-colors active:scale-95"
        >
          저장
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-4 text-zinc-900 dark:text-zinc-100">프로필 편집</h3>

          <div className="flex items-center gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-full border-2 border-zinc-100 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800 overflow-hidden relative shadow-sm cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl text-gray-400 font-bold">
                  {profile.name ? profile.name[0] : "📷"}
                </span>
              )}

              <div className="absolute inset-0 bg-white/40 dark:bg-black/20 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-black dark:text-white font-bold tracking-widest">
                  EDIT
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h2 className="font-bold text-lg text-zinc-900 dark:text-white">
                {profile.name || "이름 없음"}
              </h2>
              <p className="text-xs text-[var(--color-text-sub)] mt-0.5">
                {profile.email || "이메일 없음"}
              </p>
            </div>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 dark:text-neutral-400 mb-1.5 ml-1">
                이름
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
                placeholder="이름을 입력하세요"
                className="w-full text-sm text-zinc-900 dark:text-neutral-100 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1">
                이메일
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                placeholder="이메일을 입력하세요"
                className="w-full text-sm text-zinc-900 dark:text-neutral-100 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1.5 ml-1">
                자기소개
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) =>
                  setProfile({ ...profile, bio: e.target.value })
                }
                placeholder="자신을 짧게 소개해주세요"
                className="w-full text-sm text-zinc-900 dark:text-neutral-100 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 resize-none"
                rows={3}
              />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-sm space-y-5">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">앱 설정</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">푸시 알림</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">
                약 복용 시간 등 행동 타이머 알림
              </p>
            </div>
            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${notificationsEnabled
                ? "bg-[var(--color-success)]"
                : "bg-zinc-200 dark:bg-zinc-700"
                }`}
            >
              <div
                className={`w-4 h-4 bg-white dark:bg-zinc-200 rounded-full shadow-sm transition-transform ${notificationsEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">알림 소리</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">
                선택된 소리: {selectedSound}
              </p>
            </div>
            <select
              value={selectedSound}
              onChange={(e) => setSelectedSound(e.target.value)}
              disabled={!notificationsEnabled}
              className="text-sm bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-1 outline-none focus:border-[var(--color-accent)] disabled:opacity-50"
            >
              {sounds.map((sound) => (
                <option key={sound} value={sound}>
                  {sound}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="font-medium text-sm">다크 모드</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">
                어두운 테마 사용
              </p>
            </div>
            <button
              onClick={handleThemeToggle}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? "bg-zinc-900" : "bg-zinc-200"
                }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? "translate-x-6" : "translate-x-0"
                  }`}
              />
            </button>
          </div>
        </section>

        <div className="pt-2 pb-6">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full text-center text-sm font-medium text-[var(--color-danger)] dark:text-red-400 py-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>

      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white border border-zinc-200 dark:border-none px-6 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 pointer-events-none z-50 flex items-center gap-2 ${isToastVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
          }`}
      >
        <span>✅</span> Saved successfully
      </div>
    </div>
  );
}