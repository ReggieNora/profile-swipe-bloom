import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { MessagesCard } from "./MessagesCard";
import { SettingsCard } from "./SettingsCard";
import { FullProfileCard } from "./FullProfileCard";
import { StepNavigation } from "./StepNavigation";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  imageUrl: string;
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

const initialProfiles: Profile[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Front-End Developer',
    skills: ['React', 'Tailwind', 'Figma'],
    imageUrl: '/lovable-uploads/8c9eafc7-de20-466b-b705-5ac838b5833b.png',
  },
  {
    id: '2',
    name: 'Jamie Smith',
    role: 'UX/UI Designer',
    skills: ['Figma', 'Sketch', 'Adobe XD'],
    imageUrl: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: '3',
    name: 'Taylor Reed',
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB'],
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    sender: {
      name: 'Alex Johnson',
      avatar: '/lovable-uploads/8c9eafc7-de20-466b-b705-5ac838b5833b.png',
      initials: 'AJ'
    },
    preview: 'Hey, I saw your project and I was wondering if you...',
    timestamp: '10m',
    isUnread: true
  },
  {
    id: '2',
    sender: {
      name: 'Jamie Smith',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      initials: 'JS'
    },
    preview: 'Are you available for a project this month?',
    timestamp: '1h',
    isUnread: true
  },
  {
    id: '3',
    sender: {
      name: 'Taylor Reed',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      initials: 'TR'
    },
    preview: 'Thanks for connecting! I took a look at your portfolio...',
    timestamp: '2h',
    isUnread: false
  },
  {
    id: '4',
    sender: {
      name: 'Jordan Parker',
      avatar: '',
      initials: 'JP'
    },
    preview: 'Do you have experience with TypeScript and Next.js?',
    timestamp: '1d',
    isUnread: false
  },
  {
    id: '5',
    sender: {
      name: 'Casey Morgan',
      avatar: '',
      initials: 'CM'
    },
    preview: 'Our team is looking for a front-end developer with...',
    timestamp: '2d',
    isUnread: false
  }
];

type Step = 'profile' | 'messages' | 'settings' | 'fullProfile';

export const ProfileDeck = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [messages] = useState<Message[]>(initialMessages);
  const [currentStep, setCurrentStep] = useState<Step>('profile');
  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    const currentProfile = profiles[0];
    
    // Show toast based on swipe direction
    if (direction === 'left') {
      toast({
        title: "Passed",
        description: `You passed on ${currentProfile.name}`,
      });
    } else if (direction === 'right') {
      toast({
        title: "Liked!",
        description: `You liked ${currentProfile.name}`,
      });
    } else if (direction === 'up') {
      toast({
        title: "Favorited!",
        description: `You favorited ${currentProfile.name}`,
      });
    }

    // Remove the current card and show the next one
    setTimeout(() => {
      setProfiles((prevProfiles) => {
        if (prevProfiles.length <= 1) {
          // If this was the last card, reset the deck
          return initialProfiles;
        }
        return prevProfiles.slice(1);
      });
    }, 300);
  };

  const handleNavigateStep = (direction: 'next' | 'previous') => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection(direction === 'next' ? 'left' : 'right');
    
    const stepOrder: Step[] = ['profile', 'messages', 'settings', 'fullProfile'];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    let nextIndex: number;
    if (direction === 'next') {
      nextIndex = currentIndex === stepOrder.length - 1 ? 0 : currentIndex + 1;
    } else {
      nextIndex = currentIndex === 0 ? stepOrder.length - 1 : currentIndex - 1;
    }
    
    setTimeout(() => {
      setCurrentStep(stepOrder[nextIndex]);
      setSlideDirection(null);
      setIsTransitioning(false);
    }, 300);
  };

  const handleNext = () => handleNavigateStep('next');
  const handlePrevious = () => handleNavigateStep('previous');

  if (profiles.length === 0) {
    return <div>No more profiles to show</div>;
  }

  return (
    <div className="relative w-full">
      <div 
        className={`transition-transform duration-300 ease-in-out ${
          slideDirection === 'left' 
            ? 'translate-x-[-100vw]' 
            : slideDirection === 'right' 
            ? 'translate-x-[100vw]' 
            : ''
        }`}
      >
        {currentStep === 'profile' && (
          <ProfileCard
            name={profiles[0].name}
            role={profiles[0].role}
            skills={profiles[0].skills}
            imageUrl={profiles[0].imageUrl}
            onSwipe={handleSwipe}
          />
        )}
        {currentStep === 'messages' && (
          <MessagesCard messages={messages} />
        )}
        {currentStep === 'settings' && (
          <SettingsCard />
        )}
        {currentStep === 'fullProfile' && (
          <FullProfileCard profile={profiles[0]} />
        )}
      </div>
      
      {/* Step indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {['profile', 'messages', 'settings', 'fullProfile'].map((step, index) => (
          <div 
            key={step} 
            className={`w-2 h-2 rounded-full transition-all ${
              currentStep === step 
                ? 'bg-white w-4' 
                : 'bg-white/40'
            }`}
          />
        ))}
      </div>
      
      <StepNavigation 
        onPrevious={handlePrevious}
        onNext={handleNext}
        showPrevious={true}
        showNext={true}
      />
    </div>
  );
};
