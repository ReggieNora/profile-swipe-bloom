
import { ProfileDeck } from "@/components/ProfileDeck";

const Index = () => {
  return (
    <div className="min-h-screen w-full gradient-bg flex flex-col items-center justify-center overflow-hidden">
      <header className="w-full px-6 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">DevSwipe</h1>
      </header>
      
      <main className="flex-1 w-full flex flex-col items-center justify-center px-4">
        <ProfileDeck />
      </main>
      
      <footer className="w-full text-center py-4 text-white/60 text-xs">
        Swipe through top developer profiles
      </footer>
    </div>
  );
};

export default Index;
