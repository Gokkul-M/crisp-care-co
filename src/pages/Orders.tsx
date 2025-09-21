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
  RefreshCw
} from "lucide-react";

const Orders = () => {
  const [selectedTab, setSelectedTab] = useState("active");

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
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
            <p className="text-sm text-muted-foreground">Track your laundry orders</p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 text-center animate-fade-in">
            <div className="text-2xl font-bold text-primary">
              {orders.filter(o => ["pending", "picked-up", "in-progress", "out-for-delivery"].includes(o.status)).length}
            </div>
            <div className="text-xs text-muted-foreground">Active Orders</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="text-2xl font-bold text-secondary">
              {orders.filter(o => o.status === "completed").length}
            </div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </Card>
        </div>

        {/* Order Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="active">
              Active ({orders.filter(o => !["completed", "cancelled"].includes(o.status)).length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              History ({orders.filter(o => ["completed", "cancelled"].includes(o.status)).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {orders.filter(o => !["completed", "cancelled"].includes(o.status)).map((order, index) => (
              <Card key={order.id} className="service-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-sm">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.launderer}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.replace("-", " ")}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{order.items} pieces</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-primary">{order.amount}</span>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-accent/20 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    {getProgressSteps(order.status).map((step, idx) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.key} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                            step.completed ? 'bg-primary text-white' : 
                            step.active ? 'bg-primary/20 text-primary' : 'bg-gray-200 text-gray-400'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="text-xs text-center">
                            <div className={step.completed ? 'text-primary' : 'text-muted-foreground'}>
                              {step.label}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-accent/10 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Expected delivery: {order.deliveryDate}, {order.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{order.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" className="flex-1">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Order
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {orders.filter(o => ["completed", "cancelled"].includes(o.status)).map((order, index) => (
              <Card key={order.id} className="service-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-sm">#{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.launderer}</p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{order.service}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">{order.completedDate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount</span>
                    <span className="font-bold text-primary">{order.amount}</span>
                  </div>
                </div>

                {order.rating && (
                  <div className="bg-accent/20 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Your Rating</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{order.rating}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Reorder
                  </Button>
                  <Button size="sm" variant="outline">
                    <Star className="h-4 w-4 mr-2" />
                    Rate
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
