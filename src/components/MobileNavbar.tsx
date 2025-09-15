import { Home, Calendar, User, History, Settings, Package } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  activePattern: RegExp;
}

const MobileNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine user role from current path
  const isCustomer = location.pathname.includes('/customer');
  const isLaunderer = location.pathname.includes('/launderer');

  const customerNavItems: NavItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Home",
      path: "/customer/dashboard",
      activePattern: /^\/customer\/dashboard$/
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Book",
      path: "/customer/book",
      activePattern: /^\/customer\/book/
    },
    {
      icon: <History className="h-5 w-5" />,
      label: "Orders",
      path: "/customer/orders",
      activePattern: /^\/customer\/orders/
    },
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      path: "/customer/profile",
      activePattern: /^\/customer\/profile/
    }
  ];

  const laundererNavItems: NavItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: "Dashboard",
      path: "/launderer/dashboard",
      activePattern: /^\/launderer\/dashboard$/
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "Orders",
      path: "/launderer/orders",
      activePattern: /^\/launderer\/orders/
    },
    {
      icon: <History className="h-5 w-5" />,
      label: "History",
      path: "/launderer/history",
      activePattern: /^\/launderer\/history/
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      path: "/launderer/settings",
      activePattern: /^\/launderer\/settings/
    }
  ];

  // Don't show navbar on auth pages
  if (!isCustomer && !isLaunderer) {
    return null;
  }

  const navItems = isCustomer ? customerNavItems : laundererNavItems;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-lg" />
      
      {/* Semi-rounded navbar container */}
      <div className="relative bg-gradient-to-r from-background via-background/95 to-background rounded-t-3xl border-t border-l border-r border-border shadow-elegant mx-2 mb-2">
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-primary rounded-full" />
        
        {/* Navigation items */}
        <div className="flex items-center justify-around px-4 py-3 pt-4">
          {navItems.map((item, index) => {
            const isActive = item.activePattern.test(location.pathname);
            
            return (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 h-auto py-2 px-3 rounded-xl transition-all duration-200",
                  "hover:bg-primary/10 hover:scale-105",
                  isActive && "bg-primary/15 shadow-sm"
                )}
              >
                <div className={cn(
                  "transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.icon}
                </div>
                <span className={cn(
                  "text-xs font-medium transition-colors duration-200",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
        
        {/* Bottom safe area for devices with home indicator */}
        <div className="h-1" />
      </div>
    </div>
  );
};

export default MobileNavbar;