
import { useState } from "react";
import { ProfileCard } from "./ProfileCard";
import { useToast } from "@/components/ui/use-toast";

interface Profile {
  id: string;
  name: string;
  role: string;
  skills: string[];
  imageUrl: string;
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

export const ProfileDeck = () => {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
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

  if (profiles.length === 0) {
    return <div>No more profiles to show</div>;
  }

  return (
    <div className="relative w-full">
      <ProfileCard
        name={profiles[0].name}
        role={profiles[0].role}
        skills={profiles[0].skills}
        imageUrl={profiles[0].imageUrl}
        onSwipe={handleSwipe}
      />
    </div>
  );
};
