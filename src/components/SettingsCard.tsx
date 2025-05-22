import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const SettingsCard = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [language, setLanguage] = useState("english");

  return (
    <div className="flex flex-col items-center px-4 py-8">
      <div className="glass-card rounded-3xl w-full max-w-xs animate-card-appear overflow-hidden">
        <div className="flex flex-col p-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Settings</h2>
          
          <div className="space-y-6">
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Notifications</span>
              <Switch 
                checked={notificationsEnabled} 
                onCheckedChange={setNotificationsEnabled} 
                className="data-[state=checked]:bg-profile-purple"
              />
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">Dark Mode</span>
              <Switch 
                checked={darkModeEnabled} 
                onCheckedChange={setDarkModeEnabled} 
                className="data-[state=checked]:bg-profile-purple"
              />
            </div>
            
            {/* Language Dropdown */}
            <div className="flex flex-col gap-2">
              <span className="text-white font-medium">Language</span>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Privacy Settings Button/Dialog */}
            <div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full py-3 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all">
                    Privacy Settings
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#2A0022] text-white border-white/20">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Privacy Settings</AlertDialogTitle>
                    <AlertDialogDescription className="text-white/70">
                      Manage your privacy preferences and data sharing options.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="py-4">
                    <p className="text-white/80">
                      These settings control how your profile is shared with others and what data is collected.
                    </p>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/10 text-white hover:bg-white/20 border-white/20">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="bg-profile-purple hover:bg-profile-purple/90">
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          {/* Logout Button */}
          <div className="mt-6">
            <button className="gradient-button w-full">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};