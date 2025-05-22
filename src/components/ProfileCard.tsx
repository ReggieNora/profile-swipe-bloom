
import { useState } from "react";
import { Heart, Star, X } from "lucide-react";

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
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleViewProfile = () => {
    setIsFlipped(!isFlipped);
  };

  // Resume content based on the candidate
  const getResumeContent = () => {
    // This would ideally come from a database or API
    return (
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-lg font-bold text-white mb-4">Professional Experience</h3>
        <div className="mb-4">
          <p className="text-profile-light-purple text-sm font-semibold">Senior Frontend Developer</p>
          <p className="text-white/80 text-xs">TechCorp Inc. • 2020 - Present</p>
          <ul className="text-white/70 text-xs mt-1 list-disc pl-4">
            <li>Led the redesign of the company's main product dashboard</li>
            <li>Implemented responsive design patterns across all web applications</li>
            <li>Reduced load times by 40% through code optimization</li>
          </ul>
        </div>

        <div className="mb-4">
          <p className="text-profile-light-purple text-sm font-semibold">Frontend Developer</p>
          <p className="text-white/80 text-xs">WebSolutions • 2017 - 2020</p>
          <ul className="text-white/70 text-xs mt-1 list-disc pl-4">
            <li>Developed and maintained multiple client-facing applications</li>
            <li>Created reusable component library using React</li>
          </ul>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 mt-2">Education</h3>
        <div>
          <p className="text-profile-light-purple text-sm font-semibold">BS Computer Science</p>
          <p className="text-white/80 text-xs">Tech University • 2013 - 2017</p>
        </div>
        
        <button 
          onClick={handleViewProfile}
          className="mt-auto gradient-button w-full"
        >
          Back to Profile
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div 
        className={`glass-card rounded-3xl w-full max-w-xs animate-card-appear ${swipeAnimation || ''} ${isFlipped ? 'flip' : ''}`}
      >
        <div className="card-inner">
          {/* Front of Card */}
          <div className="card-front flex flex-col items-center p-6">
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
              onClick={handleViewProfile}
            >
              View Profile
            </button>
          </div>
          
          {/* Back of Card (Resume) */}
          <div className="card-back">
            {getResumeContent()}
          </div>
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
