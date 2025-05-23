import { Profile } from "@/types/profile";

interface FullProfileCardProps {
  profile: Profile;
}

export const FullProfileCard = ({ profile }: FullProfileCardProps) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/20">
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
          <p className="text-white/80">{profile.role}</p>
        </div>
        
        <div className="w-full space-y-4">
          <div>
            <h3 className="text-white/90 font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white/90 font-semibold mb-2">About</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Experienced developer with a passion for creating beautiful and functional applications.
              Specialized in modern web technologies and best practices.
            </p>
          </div>
          
          <div>
            <h3 className="text-white/90 font-semibold mb-2">Experience</h3>
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-lg">
                <h4 className="text-white font-medium">Senior Developer</h4>
                <p className="text-white/60 text-sm">Tech Company • 2020 - Present</p>
              </div>
              <div className="bg-white/5 p-3 rounded-lg">
                <h4 className="text-white font-medium">Full Stack Developer</h4>
                <p className="text-white/60 text-sm">Startup • 2018 - 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};