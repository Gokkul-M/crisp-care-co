import { Clock, Home, Tag, ScanLine, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/customer/dashboard", icon: Home, label: "Home" },
  { to: "/customer/offers", icon: Tag, label: "Offers" },
  { to: "/customer/orders", icon: Clock, label: "Orders" }, // Central button
  { to: "/customer/book", icon: ScanLine, label: "Book" },
  { to: "/customer/settings", icon: User, label: "Profile" },
];

const MobileNavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
  }, []);

  const centralItem = navItems[2];
  const regularItems = [...navItems.slice(0, 2), ...navItems.slice(3, 5)];

  return (
    <div
      className={`fixed bottom-0 inset-x-0 h-28 z-50 pointer-events-none transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}>
      <div className="w-full max-w-sm mx-auto h-full flex flex-col justify-end pb-2">
        <div className="relative bg-background/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/30 rounded-3xl h-[70px] flex justify-around items-center pointer-events-auto">
          <div className="flex justify-around w-full">
            {regularItems.slice(0, 2).map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
            <div className="w-20"></div> {/* Spacer for central button */}
            {regularItems.slice(2, 4).map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </div>

          <NavLink
            to={centralItem.to}
            className={({ isActive }) =>
              `absolute left-1/2 -translate-x-1/2 -top-1/3 group ${
                isActive ? "active-central-button" : ""
              }`
            }
          >
            <div className="w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-lg transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:-translate-y-1 group-active:scale-95">
              <centralItem.icon className="h-9 w-9 text-primary-foreground transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-[.active-central-button]:opacity-100">
              {centralItem.label}
            </span>
          </NavLink>
        </div>

        {/* Subtle bottom indicator */}
        <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-2.5"></div>
      </div>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label }: (typeof navItems)[0]) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center text-xs font-medium transition-all duration-300 ease-in-out w-16 h-full rounded-2xl group ${
          isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className="h-6 w-6 mb-1 transition-transform duration-300 group-hover:scale-125"
            strokeWidth={isActive ? 2.5 : 2}
          />
          <span className={`transition-transform duration-300 ${isActive ? "font-bold" : ""}`}>
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default MobileNavBar;
