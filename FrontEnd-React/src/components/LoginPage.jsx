import { useState } from "react";

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to your Node.js endpoint here
    // Example: fetch('/api/auth/login', { ... })
    onLogin();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#a5d6ff] via-[#e0f0ff] to-[#f0f9ff] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.5),transparent)]" />

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl p-8 border border-white/60">
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="text-3xl">↗</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Sign in with email</h1>
            <p className="text-gray-600 mt-2 text-[15px]">
              Make sure not to share your password<br />
              with anyone. Keep it safe!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ✉️
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔒
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-11 pr-12 py-2 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? "👁️" : "🙈"}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <a href="#forgot" className="text-sm text-gray-600 hover:text-gray-900 underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-gray-900 text-white py-3 font-medium text-[15px] transition-all active:scale-[0.985]"
            >
              Get Started
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <a href="#signup" className="text-black font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;