import { Home, Package, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { to: "/launderer/dashboard", icon: Home, label: "Home" },
  { to: "/launderer/orders", icon: Package, label: "Orders" },
  { to: "/launderer/settings", icon: Settings, label: "Settings" },
];

const LaundererNavBar = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center h-full w-full rounded-lg transition-colors ${
                isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[11px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default LaundererNavBar;
