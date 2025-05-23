import { useState } from "react";
import { Building2, User } from "lucide-react";

type UserRole = "employer" | "candidate";

interface LoginScreenProps {
  onLogin: (role: UserRole, email: string, password: string) => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, email, password);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4 animate-fade-in">
      <div className="glass-card rounded-3xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Hired</h1>
          <p className="text-white/60">Sign in to continue</p>
        </div>

        {/* Role Selection */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setSelectedRole("candidate")}
            className={`flex-1 p-4 rounded-2xl transition-all ${
              selectedRole === "candidate"
                ? "glass-card border-2 border-white/40"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <User className={`w-6 h-6 ${
                selectedRole === "candidate" ? "text-white" : "text-white/60"
              }`} />
              <span className={`font-medium ${
                selectedRole === "candidate" ? "text-white" : "text-white/60"
              }`}>
                Candidate
              </span>
            </div>
          </button>

          <button
            onClick={() => setSelectedRole("employer")}
            className={`flex-1 p-4 rounded-2xl transition-all ${
              selectedRole === "employer"
                ? "glass-card border-2 border-white/40"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Building2 className={`w-6 h-6 ${
                selectedRole === "employer" ? "text-white" : "text-white/60"
              }`} />
              <span className={`font-medium ${
                selectedRole === "employer" ? "text-white" : "text-white/60"
              }`}>
                Employer
              </span>
            </div>
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white/80 text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white/80 text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right">
            <button
              type="button"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="gradient-button w-full mt-6"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}; 