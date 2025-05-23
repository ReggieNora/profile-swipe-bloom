import { useState } from "react";
import { JobCard } from "@/components/JobCard";
import { MessagesCard } from "@/components/MessagesCard";
import { SettingsCard } from "@/components/SettingsCard";
import { FullProfileCard } from "@/components/FullProfileCard";
import { StepNavigation } from "@/components/StepNavigation";
import { useToast } from "@/components/ui/use-toast";

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

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
    initials: string;
  };
  preview: string;
  timestamp: string;
  isUnread: boolean;
}

export const JobDeck = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Demo data
  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Google",
      location: "Mountain View, CA",
      description: "Join our team to build the next generation of cloud infrastructure.",
      tags: ["React", "TypeScript", "Node.js", "AWS"],
      salary: "$180,000 - $250,000",
      type: "Full-time",
      posted: "2 days ago"
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "Microsoft",
      location: "Redmond, WA",
      description: "Work on cutting-edge web applications and cloud services.",
      tags: ["JavaScript", "Python", "Azure", "React"],
      salary: "$160,000 - $220,000",
      type: "Full-time",
      posted: "1 day ago"
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=1",
        initials: "SJ"
      },
      preview: "Hi! I saw your profile and would love to discuss...",
      timestamp: "2h ago",
      isUnread: true
    },
    {
      id: "2",
      sender: {
        name: "Michael Chen",
        avatar: "https://i.pravatar.cc/150?img=2",
        initials: "MC"
      },
      preview: "Thanks for your application! When are you...",
      timestamp: "1d ago",
      isUnread: false
    }
  ];

  const handleJobSwipe = (direction: 'left' | 'right' | 'up') => {
    if (direction === 'left') {
      toast({
        title: "Job Skipped",
        description: "We'll find more opportunities for you!",
      });
    } else if (direction === 'right') {
      toast({
        title: "Job Saved",
        description: "We'll notify you about similar positions!",
      });
    } else if (direction === 'up') {
      toast({
        title: "Job Applied",
        description: "Good luck with your application!",
      });
    }
  };

  const handleStepChange = (step: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection(step > currentStep ? 'left' : 'right');
    
    setTimeout(() => {
      setCurrentStep(step);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 300);
  };

  const renderCard = () => {
    switch (currentStep) {
      case 0:
        return (
          <JobCard
            job={jobs[0]}
            onSwipe={handleJobSwipe}
          />
        );
      case 1:
        return <MessagesCard messages={messages} />;
      case 2:
        return <SettingsCard />;
      case 3:
        return (
          <FullProfileCard
            profile={{
              id: "1",
              name: "John Doe",
              role: "Senior Software Engineer",
              skills: ["React", "Node.js", "TypeScript", "AWS"],
              imageUrl: "https://i.pravatar.cc/150?img=3"
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`transition-all duration-300 ${slideDirection === 'left' ? 'animate-slide-left' : slideDirection === 'right' ? 'animate-slide-right' : ''}`}>
        {renderCard()}
      </div>

      {/* Step Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        <StepNavigation
          onPrevious={() => handleStepChange((currentStep - 1 + 4) % 4)}
          onNext={() => handleStepChange((currentStep + 1) % 4)}
          showPrevious={true}
          showNext={true}
        />
      </div>
    </div>
  );
}; 