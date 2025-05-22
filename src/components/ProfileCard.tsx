import { useState } from "react";
import { Heart, Star, X } from "lucide-react";
import { FullProfileCard } from "./FullProfileCard";

interface ProfileCardProps {
  name: string;
  role: string;
  skills: string[];
  imageUrl: string;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

export const ProfileCard = ({
  name,
  role,
  skills,
  imageUrl,
  onSwipe,
}: ProfileCardProps) => {
  const [swipeAnimation, setSwipeAnimation] = useState<string | null>(null);
  const [showFullProfile, setShowFullProfile] = useState(false);

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'left') {
      setSwipeAnimation('animate-swipe-left');
    } else if (direction === 'right') {
      setSwipeAnimation('animate-swipe-right');
    }
    
    setTimeout(() => {
      onSwipe(direction);
      setSwipeAnimation(null);
    }, 500);
  };

  if (showFullProfile) {
    return (
      <FullProfileCard
        name={name}
        role={role}
        bio="Passionate developer with 5+ years of experience building beautiful and responsive web applications. Focused on creating intuitive user experiences with modern technologies."
        skills={skills}
        experience={[
          {
            title: "Senior Frontend Developer",
            company: "TechCorp Inc.",
            period: "2021 - Present"
          },
          {
            title: "Frontend Developer",
            company: "WebSolutions Ltd.",
            period: "2019 - 2021"
          }
        ]}
        imageUrl={imageUrl}
        onBack={() => setShowFullProfile(false)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div 
        className={`glass-card rounded-3xl w-full max-w-xs animate-card-appear ${swipeAnimation || ''}`}
      >
        <div className="flex flex-col items-center p-6">
          {/* Profile Image */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
              <img 
                src={imageUrl} 
                alt={`${name}'s profile`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Name and Role */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
            <p className="text-profile-light-purple text-sm">{role}</p>
          </div>
          
          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skills.map((skill) => (
              <span 
                key={skill} 
                className="px-4 py-1 rounded-full glass-card text-white/90 text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Button */}
          <button 
            className="gradient-button w-full"
            onClick={() => setShowFullProfile(true)}
          >
            View Profile
          </button>
        </div>
      </div>
      
      {/* Swipe Buttons */}
      <div className="flex justify-center items-center space-x-8 mt-8">
        <button 
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-red-500/20 transition-colors border border-white/10"
        >
          <X className="text-red-400 hover:text-red-300" size={24} />
        </button>
        
        <button
          onClick={() => handleSwipe('up')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-yellow-500/20 transition-colors border border-white/10"
        >
          <Star className="text-yellow-400 hover:text-yellow-300" size={24} />
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 hover:bg-green-500/20 transition-colors border border-white/10"
        >
          <Heart className="text-green-400 hover:text-green-300" size={24} />
        </button>
      </div>
    </div>
  );
};