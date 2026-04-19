"use client";

import { useState } from "react";
import sounds from "@/data/notificationSounds.json";

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedSound, setSelectedSound] = useState(sounds[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "김망고아빠",
    bio: "반려견 망고와 함께하는 일상",
    healthMemo: "혈압약 매일 아침 식후 복용"
  });

  return (
    <div className="flex flex-col h-full bg-[var(--color-bg)]">
      {/* Header */}
      <header className="px-6 py-4 bg-white sticky top-0 z-10 border-b border-[var(--color-border)]">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span>⚙️</span> 설정
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        
        {/* Profile Section */}
        <section className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[#f8e5e5] flex items-center justify-center text-white font-bold text-xl relative">
              {profile.name[0]}
              <button className="absolute bottom-0 right-0 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center text-[10px] border-2 border-white">
                ✏️
              </button>
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">{profile.name}</h2>
              <p className="text-xs text-[var(--color-text-sub)] mt-1">{profile.bio}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">이름</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">자기소개</label>
              <input 
                type="text" 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5">건강 메모</label>
              <textarea 
                value={profile.healthMemo}
                onChange={(e) => setProfile({...profile, healthMemo: e.target.value})}
                className="w-full text-sm border border-[var(--color-border)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all bg-gray-50 focus:bg-white resize-none"
                rows={3}
                placeholder="잊지 말아야 할 약 복용 시간, 알러지 등을 적어두세요."
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
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-gray-900' : 'bg-gray-200'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>

        </section>

        {/* Auth Row */}
        <div className="pt-2 pb-6">
          <button className="w-full text-center text-sm font-medium text-[var(--color-danger)] py-3 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
            로그아웃
          </button>
        </div>

      </div>
    </div>
  );
}
