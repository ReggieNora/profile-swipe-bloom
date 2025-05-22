
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

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Mock resume data
  const resumeData = {
    education: "Bachelor's in Computer Science, Tech University",
    experience: [
      {
        title: "Senior Front-End Developer",
        company: "WebTech Solutions",
        period: "2020-Present",
        description: "Leading UI/UX development for enterprise applications"
      },
      {
        title: "Front-End Developer",
        company: "CreativeTech",
        period: "2018-2020",
        description: "Developed responsive web applications using modern frameworks"
      }
    ],
    contact: {
      email: "alex@example.com",
      linkedin: "linkedin.com/in/alexjohnson"
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div 
        className={`glass-card rounded-3xl w-full max-w-xs animate-card-appear ${swipeAnimation || ''} ${isFlipped ? 'flip-card' : ''}`}
      >
        <div className="flip-card-inner">
          {/* Front side of the card */}
          <div className="flip-card-front">
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
                onClick={handleFlip}
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Back side of the card (Resume) */}
          <div className="flip-card-back">
            <div className="flex flex-col p-6 h-full">
              <h2 className="text-xl font-bold text-white mb-4 text-center">{name}'s Resume</h2>
              
              <div className="text-white/90 text-sm space-y-4 flex-1 overflow-auto">
                <div>
                  <h3 className="text-profile-light-purple font-semibold">Education</h3>
                  <p>{resumeData.education}</p>
                </div>
                
                <div>
                  <h3 className="text-profile-light-purple font-semibold">Experience</h3>
                  {resumeData.experience.map((exp, index) => (
                    <div key={index} className="mb-2">
                      <p className="font-medium">{exp.title} at {exp.company}</p>
                      <p className="text-xs text-white/70">{exp.period}</p>
                      <p className="text-xs mt-1">{exp.description}</p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h3 className="text-profile-light-purple font-semibold">Contact</h3>
                  <p>Email: {resumeData.contact.email}</p>
                  <p>LinkedIn: {resumeData.contact.linkedin}</p>
                </div>
              </div>
              
              <button 
                className="gradient-button w-full mt-4"
                onClick={handleFlip}
              >
                Back to Profile
              </button>
            </div>
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
