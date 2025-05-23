import { ArrowLeft } from "lucide-react";

interface FullProfileCardProps {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    period: string;
  }>;
  imageUrl: string;
  onBack: () => void;
}

export const FullProfileCard = ({
  name,
  role,
  bio,
  skills,
  experience,
  imageUrl,
  onBack,
}: FullProfileCardProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
      <div className="glass-card rounded-3xl w-full max-w-xs animate-card-appear overflow-hidden">
        <div className="flex flex-col items-center p-6">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute left-8 top-8 text-white/70 hover:text-white transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Profile Image */}
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/30 shadow-lg ring-2 ring-profile-purple/30">
              <img 
                src={imageUrl} 
                alt={`${name}'s profile`} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Name and Role */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-white mb-1">{name}</h2>
            <p className="text-profile-light-purple text-sm">{role}</p>
          </div>
          
          {/* Bio */}
          <p className="text-white/80 text-center text-sm mb-6">
            {bio}
          </p>
          
          {/* Divider */}
          <div className="w-full h-px bg-white/10 mb-6" />
          
          {/* Skills */}
          <div className="w-full mb-6">
            <h3 className="text-white/90 text-sm font-medium mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 rounded-full glass-card text-white/90 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Experience */}
          <div className="w-full mb-6">
            <h3 className="text-white/90 text-sm font-medium mb-3">Experience</h3>
            <div className="space-y-3">
              {experience.map((exp, index) => (
                <div key={index} className="text-left">
                  <p className="text-white font-medium text-sm">{exp.title}</p>
                  <p className="text-profile-light-purple text-xs">{exp.company}</p>
                  <p className="text-white/60 text-xs">{exp.period}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 w-full">
            <button 
              onClick={onBack}
              className="flex-1 py-3 px-6 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Back
            </button>
            <button className="flex-1 gradient-button">
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};