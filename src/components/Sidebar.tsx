
import { Home, BookOpen, Trophy, BarChart3, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'course' | 'quiz') => void;
  onBackToDashboard: () => void;
}

export const Sidebar = ({ currentView, onViewChange, onBackToDashboard }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === currentView || (item.id === 'dashboard' && currentView === 'dashboard');
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left hover:bg-blue-50 hover:text-blue-600 transition-colors",
                isActive && "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              )}
              onClick={() => {
                if (item.id === 'dashboard') {
                  onBackToDashboard();
                } else {
                  onViewChange(item.id as any);
                }
              }}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
          <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
          <p className="text-xs opacity-90 mt-1">Unlock unlimited access to all courses</p>
          <Button size="sm" className="mt-2 bg-white text-blue-600 hover:bg-gray-100">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};
