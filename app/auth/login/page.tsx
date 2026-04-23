import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-[var(--color-bg)]">
      <div className="w-full flex-1 flex flex-col justify-center max-w-sm mx-auto">
        
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-[var(--color-accent)] rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-md rotate-3">
            ❤️‍🩹
          </div>
          <h1 className="text-2xl font-bold mb-2">포켓 닥터</h1>
          <p className="text-sm text-[var(--color-text-sub)]">
            당신의 손 안의 작은 건강 비서
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <button className="w-full relative flex items-center justify-center gap-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 py-3.5 px-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute left-5 text-xl">G</span>
              구글로 계속하기
            </button>
          </form>

          <form
            action={async () => {
              "use server";
              await signIn("apple", { redirectTo: "/" });
            }}
          >
            <button className="w-full relative flex items-center justify-center gap-3 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white py-3.5 px-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-shadow">
              <span className="absolute left-5 text-xl"></span>
              Apple로 계속하기
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[var(--color-bg)] px-4 text-[var(--color-text-sub)]">또는</span>
            </div>
          </div>

          <form
            action={async (formData) => {
              "use server";
              await signIn("credentials", formData);
            }}
            className="flex flex-col gap-3"
          >
            <input 
              type="email" 
              name="email"
              placeholder="이메일 주소" 
              required
              className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            <button type="submit" className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900 dark:bg-[var(--color-accent)] dark:text-white py-3.5 px-4 border border-zinc-200 dark:border-none rounded-xl font-medium shadow-sm hover:bg-zinc-50 dark:hover:bg-[var(--color-accent-hover)] transition-colors">
              이메일로 계속하기
            </button>
          </form>
        </div>
        
      </div>
      
      <p className="text-[10px] text-[var(--color-text-sub)] text-center pb-8 pt-4">
        가입 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다.
      </p>
    </div>
  );
}
