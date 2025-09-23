import { useLocation, useNavigate } from "react-router-dom";
import { Home, ShoppingBag, User } from "lucide-react";
import PageTransition from "./PageTransition";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", route: "/customer/dashboard" },
    { icon: ShoppingBag, label: "Orders", route: "/customer/orders" },
    { icon: User, label: "Profile", route: "/customer/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PageTransition>{children}</PageTransition>
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <button
                key={item.label}
                className={`flex flex-col items-center justify-center h-full w-full transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500'
                }`}
                onClick={() => navigate(item.route)}
              >
                <Icon className={`h-6 w-6 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
