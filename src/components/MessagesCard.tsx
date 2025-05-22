
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

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

interface MessagesCardProps {
  messages: Message[];
}

export const MessagesCard = ({ messages }: MessagesCardProps) => {
  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="glass-card rounded-3xl w-full max-w-xs animate-card-appear overflow-hidden">
        <div className="flex flex-col p-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">Messages</h2>
          </div>

          {/* Messages List */}
          <ScrollArea className="h-80 pr-2">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start gap-3 py-2">
                  <Avatar className="h-10 w-10 border border-white/20">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback className="bg-white/10 text-white">
                      {message.sender.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-white truncate">
                        {message.sender.name}
                      </p>
                      <span className="text-xs text-profile-light-purple">
                        {message.timestamp}
                      </span>
                    </div>
                    <p 
                      className={`text-sm truncate ${message.isUnread ? "text-white font-medium" : "text-white/70"}`}
                    >
                      {message.preview}
                    </p>
                  </div>
                  {message.isUnread && (
                    <div className="w-2 h-2 rounded-full bg-profile-pink mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Button */}
          <div className="mt-6">
            <button className="gradient-button w-full">
              Open Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
