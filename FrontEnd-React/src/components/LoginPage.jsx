import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { Eye, EyeOff, Lock, Mail, ShipWheel } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const { user: currentUser, login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { user, accessToken, refreshToken, token } = await authService.login(email, password);
      login(user, accessToken || token, refreshToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, loading, navigate]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#a5d6ff] via-[#e0f0ff] to-[#f0f9ff] flex items-center justify-center p-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.5),transparent)]" />

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl p-8 border border-white/60">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-teal-600 rounded-2xl flex items-center text-white justify-center shadow-inner">
              <ShipWheel size={18} />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-semibold text-gray-900">Sign in with email</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Make sure not to share your password<br />
              with anyone. Keep it safe!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Mail size={18} /></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-2 bg-gray-50 text-sm border border-gray-200 focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={18} /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-2 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 text-gray-900 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-end">
              <a href="#forgot" className="text-sm text-gray-600 hover:text-gray-900 underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-600 hover:bg-teal-900 disabled:bg-gray-400 text-white py-3 font-medium text-[15px] transition-all active:scale-[0.985]"
            >
              {isLoading ? "Signing in..." : "Get Started"}
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