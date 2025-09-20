import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Power, 
  Package, 
  TrendingUp, 
  Clock, 
  DollarSign,
  CheckCircle,
  AlertCircle,
  Truck,
  Calendar,
  Settings,
  Menu,
  Bell,
  MapPin,
  User,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";
import MapComponent from "@/components/GoogleMap";

const LaundererDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);
  
  // Launderer's location (mockup)
  const laundererLocation = { lat: 40.7128, lng: -74.0060 };

  // Nearby customers/orders (mockup data)
  const nearbyCustomers = [
    {
      id: "customer1",
      name: "Sarah's Order",
      lat: 40.7138,
      lng: -74.0070,
      rating: 5.0,
      status: "available" as const,
      estimatedTime: "Pickup needed",
      services: ["Wash & Iron - 5 items"]
    },
    {
      id: "customer2", 
      name: "Mike's Order",
      lat: 40.7118,
      lng: -74.0050,
      rating: 4.8,
      status: "busy" as const,
      estimatedTime: "Ready for delivery",
      services: ["Dry Clean - 2 items"]
    }
  ];

  const stats = [
    { label: "Today's Orders", value: "12", icon: Package, color: "text-blue-600" },
    { label: "Revenue", value: "$340", icon: DollarSign, color: "text-green-600" },
    { label: "Completed", value: "8", icon: CheckCircle, color: "text-green-500" },
    { label: "Pending", value: "4", icon: Clock, color: "text-yellow-500" },
  ];

  const newOrders = [
    {
      id: "CC003",
      customer: "John Smith",
      service: "Wash & Iron",
      items: 3,
      amount: "$25",
      pickup: "123 Main St",
      time: "2 min ago"
    },
    {
      id: "CC004", 
      customer: "Emma Wilson",
      service: "Dry Cleaning",
      items: 2,
      amount: "$40",
      pickup: "456 Oak Ave",
      time: "5 min ago"
    }
  ];

  const ongoingOrders = [
    {
      id: "CC001",
      customer: "Sarah Johnson",
      service: "Wash & Iron",
      status: "Washing",
      eta: "45 min",
      statusColor: "bg-blue-500"
    },
    {
      id: "CC002",
      customer: "Mike Brown", 
      service: "Dry Cleaning",
      status: "Ready for Pickup",
      eta: "Now",
      statusColor: "bg-green-500"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full-width Google Map */}
      <div className="absolute inset-0">
        <MapComponent
          center={laundererLocation}
          laundrers={nearbyCustomers}
          showUserLocation={true}
          height="100vh"
        />
      </div>

      {/* Top Header - Minimal */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div>
            <h1 className="text-lg font-bold text-foreground">Hi Alex!</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {isOnline ? 'Online' : 'Offline'} • {newOrders.length} new orders
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="w-9 h-9 relative">
              <Bell className="h-4 w-4" />
              {newOrders.length > 0 && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              )}
            </Button>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`}></div>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
          </div>
        </div>
      </div>

      {/* Active Order Banner */}
      {ongoingOrders.length > 0 && (
        <div className="absolute top-16 left-4 right-4 z-10">
          <Card className="bg-primary/95 text-primary-foreground backdrop-blur-md border-0 shadow-lg">
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Active orders: {ongoingOrders.length}</p>
                  <p className="text-xs opacity-90">Next pickup ready: {ongoingOrders[0]?.eta}</p>
                </div>
                <Button variant="secondary" size="sm" className="text-xs px-3">
                  View
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
                        {stats.slice(0, 3).map((stat, index) => {
                          const Icon = stat.icon;
                          return (
                            <div key={index} className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm font-medium text-foreground">Dashboard Overview</p>
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
                  <h2 className="text-lg font-bold text-foreground">Your Dashboard</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div 
                        key={stat.label}
                        className="text-center p-3 rounded-lg bg-muted/30 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                        <div className="text-lg font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* New Orders Section */}
                {newOrders.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">New Orders</h3>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
                        {newOrders.length} pending
                      </Badge>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {newOrders.map((order, index) => (
                        <div 
                          key={order.id}
                          className="border border-border/50 rounded-lg p-3 bg-background/50 animate-fade-in"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium text-sm">#{order.id} • {order.customer}</p>
                              <p className="text-xs text-muted-foreground">{order.service} • {order.items} items</p>
                            </div>
                            <Badge variant="outline" className="text-sm">
                              {order.amount}
                            </Badge>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button size="sm" className="flex-1 text-xs h-8">
                              Accept
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ongoing Orders Section */}
                {ongoingOrders.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-sm">Ongoing Orders</h3>
                      <Button variant="link" size="sm" className="text-primary p-0 text-xs">
                        View All
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {ongoingOrders.slice(0, 3).map((order, index) => (
                        <div 
                          key={order.id}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 border border-border/50 animate-fade-in"
                          style={{ animationDelay: `${index * 100 + 200}ms` }}
                        >
                          <div className={`w-3 h-3 ${order.statusColor} rounded-full`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">#{order.id} • {order.customer}</p>
                              <span className="text-sm text-muted-foreground">{order.eta}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-muted-foreground">{order.service}</p>
                              <Badge variant="secondary" className="text-xs">
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default LaundererDashboard;