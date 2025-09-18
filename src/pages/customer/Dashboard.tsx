import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  User
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";
import MapComponent from "@/components/GoogleMap";

const CustomerDashboard = () => {
  const [greeting, setGreeting] = useState("Good morning");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

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

      {/* Top Header - Floating */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">{greeting}, Sarah!</h1>
              <p className="text-xs text-muted-foreground">3 laundrers nearby</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="w-8 h-8 relative">
              <Bell className="h-4 w-4" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Order - Floating Card */}
      {recentOrders.length > 0 && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-lg animate-fade-in">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Active Order</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  In Progress
                </Badge>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-xs">Order #CC001 - Wash & Iron</p>
                  <p className="text-xs text-muted-foreground">ETA: Today, 6:00 PM</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                  Track
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bottom Floating Action Cards */}
      <div className="absolute bottom-20 left-0 right-0 z-10 px-4">
        <div className="space-y-4">
          {/* Quick Actions Card */}
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-lg animate-slide-up">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Quick Actions</h3>
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.label}
                      variant="outline"
                      size="sm"
                      className="flex-col h-16 space-y-1 hover-lift animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() => window.location.href = action.route}
                    >
                      <div className={`w-6 h-6 ${action.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-xs font-medium">{action.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Special Offer Card */}
          {offers.length > 0 && (
            <Card className="bg-gradient-primary text-white shadow-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4" />
                    <span className="font-semibold text-sm">{offers[0].title}</span>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/20 text-xs">
                    {offers[0].code}
                  </Badge>
                </div>
                <p className="text-white/90 text-xs">{offers[0].description}</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;