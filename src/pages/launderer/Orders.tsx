import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Clock, 
  MapPin, 
  Phone,
  CheckCircle,
  AlertCircle,
  Truck,
  Calendar,
  Filter,
  Search,
  MoreHorizontal
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";

const LaundererOrders = () => {
  const [selectedTab, setSelectedTab] = useState("new");

  const orders = [
    {
      id: "ORD001",
      customer: "Sarah Johnson", 
      phone: "+91 98765 43210",
      address: "123 Park Street, Sector 15",
      service: "Wash & Iron",
      items: 8,
      amount: "₹450",
      status: "new",
      priority: "high",
      pickupTime: "10:00 AM - 12:00 PM",
      date: "Today",
      distance: "0.8 km"
    },
    {
      id: "ORD002", 
      customer: "Michael Chen",
      phone: "+91 87654 32109",
      address: "456 Green Valley, Sector 22",
      service: "Dry Cleaning",
      items: 3,
      amount: "₹320",
      status: "accepted",
      priority: "medium",
      pickupTime: "2:00 PM - 4:00 PM", 
      date: "Today",
      distance: "1.2 km"
    },
    {
      id: "ORD003",
      customer: "Priya Sharma",
      phone: "+91 76543 21098", 
      address: "789 Rose Garden, Sector 8",
      service: "Wash Only",
      items: 12,
      amount: "₹280",
      status: "in-progress",
      priority: "low",
      deliveryTime: "6:00 PM - 8:00 PM",
      date: "Today", 
      distance: "2.1 km"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "accepted": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";  
      case "in-progress": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const filterOrdersByStatus = (status: string) => {
    if (status === "new") return orders.filter(o => o.status === "new");
    if (status === "active") return orders.filter(o => ["accepted", "in-progress"].includes(o.status));
    if (status === "completed") return orders.filter(o => o.status === "completed");
    return orders;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-sm text-muted-foreground">Manage your laundry orders</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 text-center animate-fade-in">
            <div className="text-2xl font-bold text-primary">
              {orders.filter(o => o.status === "new").length}
            </div>
            <div className="text-xs text-muted-foreground">New Orders</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="text-2xl font-bold text-secondary">
              {orders.filter(o => ["accepted", "in-progress"].includes(o.status)).length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-2xl font-bold text-accent">₹1,050</div>
            <div className="text-xs text-muted-foreground">Today's Revenue</div>
          </Card>
        </div>

        {/* Order Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="new">New ({orders.filter(o => o.status === "new").length})</TabsTrigger>
            <TabsTrigger value="active">Active ({orders.filter(o => ["accepted", "in-progress"].includes(o.status)).length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            {filterOrdersByStatus("new").map((order, index) => (
              <Card key={order.id} className="service-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">#{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(order.priority)}
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
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

                <div className="bg-accent/20 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{order.address}</p>
                      <p className="text-xs text-muted-foreground">{order.distance} away</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Pickup: {order.date}, {order.pickupTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept Order
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {filterOrdersByStatus("active").map((order, index) => (
              <Card key={order.id} className="service-card hover-lift animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Truck className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">#{order.id}</p>
                    </div>
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
                    <span className="text-muted-foreground">Items</span>
                    <span className="font-medium">{order.items} pieces</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" className="flex-1">
                    Update Status
                  </Button>
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No completed orders today</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default LaundererOrders;