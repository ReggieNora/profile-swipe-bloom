import { useState } from "react";
import { Building2, MapPin, Heart, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: string[];
  salary: string;
  type: string;
  posted: string;
}

interface JobCardProps {
  job: Job;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
}

export const JobCard = ({ job, onSwipe }: JobCardProps) => {
  const [swipeAnimation, setSwipeAnimation] = useState<string | null>(null);

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

  return (
    <div className="flex flex-col items-center px-4 py-4">
      <div 
        className={`glass-card rounded-3xl w-full max-w-xs animate-card-appear ${swipeAnimation || ''}`}
      >
        <div className="flex flex-col items-center p-4">
          {/* Company Logo */}
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 flex items-center justify-center">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Job Title and Company */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-white mb-1">{job.title}</h2>
            <p className="text-profile-light-purple text-sm">{job.company}</p>
          </div>

          {/* Location */}
          <div className="flex items-center text-white/60 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{job.location}</span>
          </div>

          {/* Job Details */}
          <div className="w-full space-y-3">
            <div className="flex justify-between text-sm text-white/80">
              <span>{job.type}</span>
              <span>{job.salary}</span>
            </div>

            {/* Description */}
            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
              {job.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full glass-card text-white/90 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Posted Date */}
            <p className="text-white/60 text-xs text-center">{job.posted}</p>
          </div>

          {/* Action Button */}
          <div className="w-full mt-4">
            <Button
              onClick={() => handleSwipe('up')}
              className="gradient-button w-full"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Interaction Icons */}
      <div className="flex justify-center gap-4 mt-4">
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