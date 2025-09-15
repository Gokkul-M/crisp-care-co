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
  Settings
} from "lucide-react";

const LaundererDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);

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
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your laundry business</p>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Availability Toggle */}
        <Card className="service-card mb-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isOnline ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <Power className={`h-5 w-5 ${isOnline ? 'text-green-600' : 'text-gray-500'}`} />
              </div>
              <div>
                <p className="font-medium">You're {isOnline ? 'Online' : 'Offline'}</p>
                <p className="text-sm text-muted-foreground">
                  {isOnline ? 'Accepting new orders' : 'Not accepting orders'}
                </p>
              </div>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="service-card text-center animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* New Orders */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">New Orders</h3>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
              {newOrders.length} pending
            </Badge>
          </div>
          
          <div className="space-y-3">
            {newOrders.map((order, index) => (
              <Card 
                key={order.id}
                className="p-4 hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 100 + 300}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">#{order.id} • {order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    New
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
                    <span>{order.service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span>{order.items} pieces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium text-green-600">{order.amount}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="flex-1">
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Decline
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Ongoing Orders */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Ongoing Orders</h3>
            <Button variant="link" size="sm" className="text-primary p-0">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            {ongoingOrders.map((order, index) => (
              <Card 
                key={order.id}
                className="p-4 hover:shadow-medium transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 ${order.statusColor} rounded-full`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-sm">#{order.id} • {order.customer}</p>
                      <span className="text-xs text-muted-foreground">{order.eta}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{order.service}</p>
                    <Badge variant="secondary" className="text-xs">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="service-card animate-fade-in" style={{ animationDelay: '700ms' }}>
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Revenue Report
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Truck className="h-4 w-4 mr-2" />
              Deliveries
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <AlertCircle className="h-4 w-4 mr-2" />
              Support
            </Button>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="mobile-nav">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1 text-primary">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <Package className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <DollarSign className="h-5 w-5" />
            <span className="text-xs">Revenue</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col items-center space-y-1">
            <Settings className="h-5 w-5" />
            <span className="text-xs">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LaundererDashboard;