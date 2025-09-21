import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Clock, 
  MapPin, 
  Star,
  Truck,
  Calendar,
  Phone,
  MessageCircle,
  RefreshCw,
  Home,
  Settings
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const LaundererOrders = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const navigate = useNavigate();
  const location = useLocation();

  const orders = [
    {
      id: "CC001",
      launderer: "Fresh & Clean Laundry",
      service: "Wash & Iron",
      items: 5,
      amount: "₹450",
      status: "in-progress",
      pickupDate: "Dec 15, 2024",
      deliveryDate: "Dec 17, 2024",
      deliveryTime: "6:00 PM - 8:00 PM",
      progress: 60,
      address: "123 Park Street, Sector 15"
    },
    {
      id: "CC002", 
      launderer: "Elite Dry Cleaners",
      service: "Dry Cleaning",
      items: 2,
      amount: "₹320",
      status: "picked-up",
      pickupDate: "Dec 16, 2024", 
      deliveryDate: "Dec 18, 2024",
      deliveryTime: "4:00 PM - 6:00 PM",
      progress: 25,
      address: "123 Park Street, Sector 15"
    },
    {
      id: "CC003",
      launderer: "QuickWash Express",
      service: "Wash & Iron", 
      items: 8,
      amount: "₹680",
      status: "completed",
      pickupDate: "Dec 12, 2024",
      deliveryDate: "Dec 14, 2024", 
      completedDate: "Dec 14, 2024",
      rating: 4.5,
      address: "123 Park Street, Sector 15"
    }
  ];

  const navItems = [
    { icon: Home, label: "Home", route: "/launderer/dashboard" },
    { icon: Package, label: "Orders", route: "/launderer/orders" },
    { icon: Settings, label: "Settings", route: "/launderer/settings" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "picked-up": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in-progress": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "out-for-delivery": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getProgressSteps = (status: string) => {
    const steps = [
      { key: "pending", label: "Order Placed", icon: Package },
      { key: "picked-up", label: "Picked Up", icon: Truck },
      { key: "in-progress", label: "In Progress", icon: RefreshCw },
      { key: "out-for-delivery", label: "Out for Delivery", icon: Truck },
      { key: "completed", label: "Completed", icon: Package }
    ];
    
    const currentIndex = steps.findIndex(step => step.key === status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Orders</h1>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">History</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4 pt-4">
            {orders.filter(o => !["completed", "cancelled"].includes(o.status)).map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.launderer}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Service</span>
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Amount</span>
                    <span className="font-bold text-primary">{order.amount}</span>
                  </div>
                </div>

                <Button size="sm" className="w-full" onClick={() => navigate(`/launderer/orders/${order.id}`)}>
                  View Details
                </Button>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="completed" className="space-y-4 pt-4">
            {orders.filter(o => ["completed", "cancelled"].includes(o.status)).map((order) => (
              <Card key={order.id} className="p-4">
                 <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold">#{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.launderer}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Completed</span>
                    <span className="font-medium">{order.completedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Amount</span>
                    <span className="font-bold text-primary">{order.amount}</span>
                  </div>
                </div>

                <Button size="sm" variant="outline" className="w-full">
                  <Star className="h-4 w-4 mr-2" />
                  Rate Order
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
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

export default LaundererOrders;
