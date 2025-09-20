import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Plus, 
  Package, 
  Clock, 
  MapPin, 
  Bell, 
  Gift,
  History,
  Star,
  Truck,
  Home,
  Menu,
  User,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";
import MapComponent from "@/components/GoogleMap";

const CustomerDashboard = () => {
  const [greeting, setGreeting] = useState("Good morning");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);

  // User's current location (mockup)
  const userLocation = { lat: 40.7128, lng: -74.0060 };

  // Nearby laundrers (mockup data)
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
    {
      id: "3",
      name: "EcoWash Station",
      lat: 40.7148,
      lng: -74.0080,
      rating: 4.9,
      status: "available" as const,
      estimatedTime: "20 min", 
      services: ["Eco Wash", "Organic Clean"]
    }
  ];

  const quickActions = [
    { icon: Plus, label: "Book Service", color: "bg-primary", route: "/customer/book" },
    { icon: Package, label: "My Orders", color: "bg-secondary", route: "/customer/orders" },
    { icon: Gift, label: "Offers", color: "bg-accent", route: "/customer/offers" },
  ];

  const recentOrders = [
    {
      id: "CC001",
      status: "In Progress",
      service: "Wash & Iron",
      items: 5,
      eta: "2 hours",
      statusColor: "bg-yellow-500"
    },
    {
      id: "CC002", 
      status: "Completed",
      service: "Dry Cleaning",
      items: 2,
      completedAt: "Yesterday",
      statusColor: "bg-green-500"
    }
  ];

  const offers = [
    {
      title: "20% OFF First Order",
      description: "New customer special",
      code: "WELCOME20",
      expiry: "Valid till Dec 31"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-width Google Map */}
      <div className="absolute inset-0">
        <MapComponent
          center={userLocation}
          laundrers={nearbyLaundrers}
          showUserLocation={true}
          height="100vh"
        />
      </div>

      {/* Top Header - Minimal */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Hi Sarah!</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              3 laundrers nearby
            </p>
          </div>
          <Button variant="ghost" size="icon" className="w-9 h-9 relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </Button>
        </div>
      </div>

      {/* Active Order Banner */}
      {recentOrders.length > 0 && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <Card className="bg-primary/95 text-primary-foreground backdrop-blur-md border-0 shadow-lg">
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Order in progress</p>
                  <p className="text-xs opacity-90">ETA: Today, 6:00 PM</p>
                </div>
                <Button variant="secondary" size="sm" className="text-xs px-3">
                  Track
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Action Cards - Uber Style */}
      <div className="absolute bottom-20 left-0 right-0 z-10 px-4">
        <Collapsible open={!isActionCardMinimized} onOpenChange={(open) => setIsActionCardMinimized(!open)}>
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-xl animate-slide-up">
            {/* Minimized Header */}
            {isActionCardMinimized && (
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {quickActions.slice(0, 3).map((action, index) => {
                          const Icon = action.icon;
                          return (
                            <div key={index} className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
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
            
            {/* Expanded Content */}
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
                        onClick={() => window.location.href = action.route}
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

      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;