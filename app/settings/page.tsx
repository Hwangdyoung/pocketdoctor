"use client";

import { useState, useEffect, useRef } from "react";
import sounds from "@/data/notificationSounds.json";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  profileImage: string;
}

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState(sounds[0]);
  
  const isDarkMode = useStore((state) => state.isDarkMode);
  const toggleDarkMode = useStore((state) => state.toggleDarkMode);
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  // Profile Form States
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    bio: "",
    profileImage: "",
  });
  const [isToastVisible, setIsToastVisible] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load existing profile from localStorage
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
        setProfile((prev) => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white sticky top-0 z-10 border-b border-[var(--color-border)] flex justify-between items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>⚙️</span> 설정
        </h1>
        <button 
          onClick={handleSaveProfile}
          className="text-white text-xs font-bold bg-[var(--color-accent)] px-3 py-1.5 rounded-full shadow-sm hover:bg-[var(--color-accent-hover)] transition-colors active:scale-95"
        >
          저장
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Profile Section */}
        <section className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <h3 className="font-bold text-sm mb-4">프로필 편집</h3>
          
          {/* Image Upload */}
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-16 h-16 rounded-full border-2 border-[var(--color-border)] flex items-center justify-center bg-gray-100 overflow-hidden relative shadow-sm cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {profile.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl text-gray-400 font-bold">{profile.name ? profile.name[0] : "📷"}</span>
              )}
              <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white font-bold tracking-widest text-shadow-sm">EDIT</span>
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="font-bold text-lg">{profile.name || "이름 없음"}</h2>
              <p className="text-xs text-[var(--color-text-sub)] mt-0.5">{profile.email || "이메일 없음"}</p>
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
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">이름</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="이름을 입력하세요"
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">이메일</label>
              <input 
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                placeholder="이메일을 입력하세요"
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 ml-1">자기소개</label>
              <textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="자신을 짧게 소개해주세요"
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white resize-none"
                rows={3}
              />
            </div>
          </div>
        </section>

        {/* App Settings */}
        <section className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm space-y-5">
          <h3 className="font-bold text-sm">앱 설정</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">푸시 알림</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">약 복용 시간 등 행동 타이머 알림</p>
            </div>
            <button 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${notificationsEnabled ? 'bg-[var(--color-success)]' : 'bg-gray-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">알림 소리</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">선택된 소리: {selectedSound}</p>
            </div>
            <select 
              value={selectedSound}
              onChange={(e) => setSelectedSound(e.target.value)}
              disabled={!notificationsEnabled}
              className="text-sm bg-gray-50 border border-[var(--color-border)] rounded-lg px-2 py-1 outline-none focus:border-[var(--color-accent)] disabled:opacity-50"
            >
              {sounds.map(sound => (
                <option key={sound} value={sound}>{sound}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
            <div>
              <p className="font-medium text-sm">다크 모드</p>
              <p className="text-[10px] text-[var(--color-text-sub)]">어두운 테마 사용</p>
            </div>
            <button 
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${isDarkMode ? 'bg-gray-900' : 'bg-gray-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

        </section>

        {/* Auth Row */}
        <div className="pt-2 pb-6">
          <button 
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="w-full text-center text-sm font-medium text-[var(--color-danger)] py-3 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors"
          >
            로그아웃
          </button>
        </div>

      </div>

      {/* Toast Notification */}
      <div 
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 bg-gray-900/90 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 pointer-events-none z-50 flex items-center gap-2 ${
          isToastVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
        }`}
      >
        <span>✅</span> Saved successfully
      </div>

    </div>
  );
}
