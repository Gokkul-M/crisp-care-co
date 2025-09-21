import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  Package, 
  MapPin, 
  Bell, 
  Gift,
  Truck,
  ChevronUp,
  ChevronDown,
  LogOut,
  Home,
  User
} from "lucide-react";
import MapComponent from "@/components/GoogleMap";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);
  const { logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userLocation = { lat: 40.7128, lng: -74.0060 };

  const nearbyLaundrers = [
    {
      id: "1",
      name: "QuickWash Pro",
      lat: 40.7138,
      lng: -74.0070,
      rating: 4.8,
      status: "available" as const,
      estimatedTime: "15 min",
      services: ["Wash & Fold", "Dry Clean", "Express"]
    },
    {
      id: "2", 
      name: "SparkleClean",
      lat: 40.7118,
      lng: -74.0050,
      rating: 4.6,
      status: "busy" as const,
      estimatedTime: "25 min",
      services: ["Wash & Iron", "Dry Clean"]
    },
  ];

  const quickActions = [
    { icon: Plus, label: "Book Service", color: "bg-primary", route: "/book" },
    { icon: Package, label: "My Orders", color: "bg-secondary", route: "/orders" },
    { icon: Gift, label: "Offers", color: "bg-accent", route: "/offers" },
  ];

  const navItems = [
    { icon: Home, label: "Home", route: "/dashboard" },
    { icon: Package, label: "Orders", route: "/orders" },
    { icon: User, label: "Profile", route: "/profile" },
  ];

  const recentOrders = orders.filter(order => order.status === 'in-process');

  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <div className="absolute inset-0">
        <MapComponent
          center={userLocation}
          laundrers={nearbyLaundrers}
          showUserLocation={true}
          height="100vh"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Hi Sarah!</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {nearbyLaundrers.length} laundrers nearby
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="w-9 h-9 relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </Button>
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {recentOrders.length > 0 && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <Card className="bg-primary/95 text-primary-foreground backdrop-blur-md border-0 shadow-lg">
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Order in progress</p>
                  <p className="text-xs opacity-90">ETA: {recentOrders[0].eta}</p>
                </div>
                <Button variant="secondary" size="sm" className="text-xs px-3" onClick={() => navigate('/orders')}>
                  Track
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="absolute bottom-24 left-0 right-0 z-10 px-4">
        <Collapsible open={!isActionCardMinimized} onOpenChange={(open) => setIsActionCardMinimized(!open)}>
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-xl animate-slide-up">
            {isActionCardMinimized && (
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {quickActions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <div key={action.label} className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm font-medium text-foreground">Quick Actions</p>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CollapsibleTrigger>
            )}
            
            <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground">What do you need?</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <div className="space-y-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={action.label}
                        variant="ghost"
                        size="lg"
                        className="w-full h-16 justify-start space-x-4 hover:bg-muted/50 group animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                        onClick={() => navigate(action.route)}
                      >
                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">{action.label}</p>
                          <p className="text-xs text-muted-foreground">
                            {action.label === 'Book Service' && 'Schedule pickup & delivery'}
                            {action.label === 'My Orders' && 'Track your laundry'}
                            {action.label === 'Offers' && 'Save with special deals'}
                          </p>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`flex flex-col items-center justify-center h-full w-full rounded-lg transition-colors ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.route)}
              >
                <Icon className={`h-5 w-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;