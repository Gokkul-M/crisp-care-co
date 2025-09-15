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
  Home
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";

const CustomerDashboard = () => {
  const [greeting, setGreeting] = useState("Good morning");

  const quickActions = [
    { icon: Plus, label: "Book Service", color: "bg-primary", route: "/customer/book" },
    { icon: Package, label: "My Orders", color: "bg-secondary", route: "/customer/orders" },
    { icon: Gift, label: "Offers", color: "bg-accent", route: "/customer/offers" },
    { icon: History, label: "History", color: "bg-muted", route: "/customer/history" },
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
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{greeting}, Sarah!</h1>
            <p className="text-sm text-muted-foreground">Ready to get your laundry done?</p>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.label}
                className="service-card text-center cursor-pointer hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => window.location.href = '/customer/book'}
              >
                <div className={`w-12 h-12 mx-auto ${action.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-medium text-sm">{action.label}</h3>
              </Card>
            );
          })}
        </div>

        {/* Active Order */}
        <Card className="service-card mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Order</h3>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              <Clock className="w-3 h-3 mr-1" />
              In Progress
            </Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Order #CC001 - Wash & Iron</p>
                <p className="text-xs text-muted-foreground">5 items • Pickup completed</p>
              </div>
            </div>
            
            <div className="bg-accent/50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Estimated delivery</span>
                <span className="font-medium">Today, 6:00 PM</span>
              </div>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Track Order
            </Button>
          </div>
        </Card>

        {/* Recent Orders */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Orders</h3>
            <Button variant="link" size="sm" className="text-primary p-0">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentOrders.slice(0, 2).map((order, index) => (
              <Card 
                key={order.id}
                className="p-4 hover:shadow-medium transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${order.statusColor} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">#{order.id}</p>
                      <span className="text-xs text-muted-foreground">
                        {order.eta || order.completedAt}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {order.service} • {order.items} items
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Offers */}
        <Card className="service-card mb-6 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Special Offers</h3>
            <Gift className="h-5 w-5 text-primary" />
          </div>
          
          {offers.map((offer) => (
            <div key={offer.code} className="bg-gradient-primary text-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-lg">{offer.title}</h4>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/20">
                  {offer.code}
                </Badge>
              </div>
              <p className="text-white/90 text-sm mb-2">{offer.description}</p>
              <p className="text-white/70 text-xs">{offer.expiry}</p>
            </div>
          ))}
        </Card>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default CustomerDashboard;