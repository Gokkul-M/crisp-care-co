import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  User
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";
import MapComponent from "@/components/GoogleMap";

const LaundererDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  
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

      {/* Top Header - Floating */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
              <p className="text-xs text-muted-foreground">{newOrders.length} new orders</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`}></div>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} />
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards - Floating */}
      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="bg-background/95 backdrop-blur-lg border-border/50 shadow-sm p-2 text-center animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Bottom Floating Order Cards */}
      <div className="absolute bottom-20 left-0 right-0 z-10 px-4">
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {/* New Orders Card */}
          {newOrders.length > 0 && (
            <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-lg animate-slide-up">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">New Orders</h3>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10 text-xs">
                    {newOrders.length} pending
                  </Badge>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {newOrders.map((order, index) => (
                    <div 
                      key={order.id}
                      className="border border-border/50 rounded-lg p-3 bg-background/50 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-xs">#{order.id} • {order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {order.amount}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-muted-foreground">{order.service} • {order.items} items</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 text-xs h-7">
                          Accept
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-xs h-7">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Ongoing Orders Card */}
          {ongoingOrders.length > 0 && (
            <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">Ongoing Orders</h3>
                  <Button variant="link" size="sm" className="text-primary p-0 text-xs">
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  {ongoingOrders.slice(0, 2).map((order, index) => (
                    <div 
                      key={order.id}
                      className="flex items-center space-x-3 p-2 rounded-lg bg-background/50 border border-border/50 animate-fade-in"
                      style={{ animationDelay: `${index * 100 + 300}ms` }}
                    >
                      <div className={`w-2 h-2 ${order.statusColor} rounded-full`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-xs">#{order.id} • {order.customer}</p>
                          <span className="text-xs text-muted-foreground">{order.eta}</span>
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
            </Card>
          )}
        </div>
      </div>

      <MobileNavbar />
    </div>
  );
};

export default LaundererDashboard;