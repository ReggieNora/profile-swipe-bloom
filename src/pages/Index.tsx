import { useState } from "react";
import { ProfileDeck } from "@/components/ProfileDeck";
import { JobDeck } from "@/components/JobDeck";
import { LoginScreen } from "@/components/LoginScreen";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"employer" | "candidate">("candidate");

  const handleLogin = (role: "employer" | "candidate", email: string, password: string) => {
    console.log("Login attempt:", { role, email, password });
    setUserRole(role);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen w-full gradient-bg flex flex-col items-center justify-center overflow-hidden">
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">Hired</h1>
        <span className="text-white/60 text-sm">
          {userRole === "employer" ? "Employer Dashboard" : "Job Search"}
        </span>
      </header>
      
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4">
        {userRole === "employer" ? <ProfileDeck /> : <JobDeck />}
      </main>
      
      <footer className="w-full text-center py-4 text-white/60 text-xs">
        {userRole === "employer" 
          ? "Swipe through top developer profiles"
          : "Find your next opportunity"}
      </footer>
    </div>
  );
};

export default Index;
