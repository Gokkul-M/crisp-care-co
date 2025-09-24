import { useState, useEffect } from 'react';
import { LayoutDashboard, List, Clock, User, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MobileNavBar.css';

const LaundererNavBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`mobile-nav ${isVisible ? 'mobile-nav-enter-active' : 'mobile-nav-enter'}`}>
      <div className="flex justify-around items-center h-full">
        <a onClick={() => navigate('/launderer/dashboard')} className="flex flex-col items-center justify-center text-primary w-1/5 nav-item-pop">
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-xs font-medium">Dashboard</span>
        </a>
        <a onClick={() => navigate('/launderer/orders')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <List className="w-6 h-6" />
          <span className="text-xs font-medium">Orders</span>
        </a>
        <div className="w-1/5 flex justify-center">
            <button onClick={() => navigate('/launderer/new-order')} className="w-16 h-16 bg-primary rounded-full shadow-strong flex items-center justify-center text-primary-foreground transform -translate-y-4 nav-item-pop">
                <PlusCircle className="w-8 h-8" />
            </button>
        </div>
        <a onClick={() => navigate('/launderer/revenue')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <Clock className="w-6 h-6" />
          <span className="text-xs font-medium">Revenue</span>
        </a>
        <a onClick={() => navigate('/launderer/settings')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default LaundererNavBar;
