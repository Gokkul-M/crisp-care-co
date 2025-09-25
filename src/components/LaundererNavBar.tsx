import { Hand, Home, List, PieChart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

const navItems = [
  { to: "/launderer/dashboard", icon: Home, label: "Home" },
  { to: "/launderer/orders", icon: List, label: "Orders" },
  { to: "/launderer/new-order", icon: Hand, label: "New Order" },
  { to: "/launderer/revenue", icon: PieChart, label: "Revenue" },
];

const LaundererNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-md md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs">{item.label}</span>
          </NavLink>
        ))}
         <Sheet>
          <SheetTrigger asChild>
            <div className="flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors text-muted-foreground hover:text-primary">
                <User className="h-6 w-6 mb-1" />
                <span className="text-xs">Profile</span>
            </div>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>My Account</SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <NavLink to="/launderer/dispute" className="text-muted-foreground hover:text-primary">Dispute</NavLink>
              <NavLink to="/settings" className="text-muted-foreground hover:text-primary">Settings</NavLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default LaundererNavBar;
