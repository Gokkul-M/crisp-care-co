import { useState, useEffect } from 'react';
import { Home, Search, Clock, User, Scan } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './MobileNavBar.css';

const MobileNavBar = () => {
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
        <a onClick={() => navigate('/customer/dashboard')} className="flex flex-col items-center justify-center text-primary w-1/5 nav-item-pop">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </a>
        <a onClick={() => navigate('/customer/search')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <Search className="w-6 h-6" />
          <span className="text-xs font-medium">Search</span>
        </a>
        <div className="w-1/5 flex justify-center">
            <button className="w-16 h-16 bg-primary rounded-full shadow-strong flex items-center justify-center text-primary-foreground transform -translate-y-4 nav-item-pop">
                <Scan className="w-8 h-8" />
            </button>
        </div>
        <a onClick={() => navigate('/customer/orders')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <Clock className="w-6 h-6" />
          <span className="text-xs font-medium">History</span>
        </a>
        <a onClick={() => navigate('/customer/settings')} className="flex flex-col items-center justify-center text-muted-foreground w-1/5 nav-item-pop">
          <User className="w-6 h-6" />
          <span className="text-xs font-medium">Profile</span>
        </a>
      </div>
    </div>
  );
};

export default MobileNavBar;
