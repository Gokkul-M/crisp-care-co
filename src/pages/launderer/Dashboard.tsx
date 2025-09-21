import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Package, 
  Clock, 
  DollarSign,
  CheckCircle,
  Settings,
  Menu,
  ChevronUp,
  ChevronDown,
  Truck,
  LogOut,
  Home,
  User
} from "lucide-react";
import MapComponent from "@/components/GoogleMap";
import BulkOrderUpdate from "@/components/launderer/BulkOrderUpdate";
import RevenueChart from "@/components/launderer/RevenueChart";
import DisputeClaim from "@/components/launderer/DisputeClaim";
import InventoryTracker from "@/components/launderer/InventoryTracker";
import { useAuth } from "@/hooks/use-auth";
import { useOrders } from "@/hooks/use-orders";
import { useLocation, useNavigate } from "react-router-dom";

const LaundererDashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);
  const { logout } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const laundererLocation = { lat: 40.7128, lng: -74.0060 };

  const newOrders = orders.filter(order => order.status === 'pending');
  const pendingOrders = orders.filter(order => order.status === 'in-process' || order.status === 'ready');
  const ongoingOrders = orders.filter(order => order.status === 'in-process');

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'in-process');
  };

  const handleDeclineOrder = (orderId: string) => {
    console.log(`Order ${orderId} declined`);
  };

  const stats = [
    { label: "Today's Orders", value: newOrders.length, icon: Package, color: "text-primary" },
    { label: "Revenue", value: "$340", icon: DollarSign, color: "text-green-500" },
    { label: "Completed", value: orders.filter(o => o.status === 'completed').length, icon: CheckCircle, color: "text-green-500" },
    { label: "Pending", value: pendingOrders.length, icon: Clock, color: "text-yellow-500" },
  ];

  const navItems = [
    { icon: Home, label: "Home", route: "/launderer/dashboard" },
    { icon: Package, label: "Orders", route: "/launderer/orders" },
    { icon: User, label: "Profile", route: "/launderer/profile" },
  ];

  const allOrdersForBulkUpdate = orders.map(o => ({ ...o, status: o.status as "in-process" | "ready" | "delivered" | "pending" }));

  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <div className="absolute inset-0">
        <MapComponent
          center={laundererLocation}
          laundrers={[]}
          showUserLocation={true}
          height="100vh"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
             <Button variant="ghost" size="icon" className="w-9 h-9">
              <Menu className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
              <p className="text-xs text-muted-foreground">{newOrders.length} new, {pendingOrders.length} pending</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-background/80 px-3 py-1.5 rounded-full border border-border/50">
              <span className="text-xs font-medium">Availability</span>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'} animate-pulse`}></div>
              <Switch checked={isOnline} onCheckedChange={setIsOnline} className="h-4 w-7" />
            </div>
             <Button variant="ghost" size="icon" className="w-9 h-9">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-4 right-4 z-10">
        <div className="grid grid-cols-4 gap-2 mb-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="bg-background/90 backdrop-blur-lg border-border/50 shadow-sm p-2 text-center animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className={`h-4 w-4 mx-auto mb-1 ${stat.color}`} />
                <div className="text-base font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-24 left-0 right-0 z-10 px-4">
        <Collapsible open={!isActionCardMinimized} onOpenChange={(open) => setIsActionCardMinimized(!open)}>
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-xl animate-slide-up">
            {isActionCardMinimized && (
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex -space-x-2">
                          <div className={`w-8 h-8 bg-primary/20 text-primary border-2 border-background rounded-full flex items-center justify-center`}>
                            <Package className="h-4 w-4" />
                          </div>
                           <div className={`w-8 h-8 bg-yellow-500/20 text-yellow-500 border-2 border-background rounded-full flex items-center justify-center`}>
                            <Clock className="h-4 w-4" />
                          </div>
                           <div className={`w-8 h-8 bg-blue-500/20 text-blue-500 border-2 border-background rounded-full flex items-center justify-center`}>
                            <Truck className="h-4 w-4" />
                          </div>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {newOrders.length} New, {pendingOrders.length} Pending
                      </p>
                    </div>
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CollapsibleTrigger>
            )}
            
            <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
               <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-foreground">Manage Orders & Actions</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <Tabs defaultValue="new-orders" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-12">
                    <TabsTrigger value="new-orders" className="relative">
                      New
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 justify-center text-xs">{newOrders.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending-orders" className="relative">
                      Pending
                       <Badge variant="secondary" className="absolute -top-1 -right-1 h-4 w-4 p-0 justify-center text-xs">{pendingOrders.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="ongoing-orders">Ongoing</TabsTrigger>
                    <TabsTrigger value="actions">Actions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="new-orders" className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                    {newOrders.map((order) => (
                       <div key={order.id} className="border border-border/50 rounded-lg p-3 bg-background/50">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-xs">#{order.id} • {order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">{order.amount}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{order.service} • {order.items} items</p>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 text-xs h-8" onClick={() => handleAcceptOrder(order.id)}>Accept</Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs h-8" onClick={() => handleDeclineOrder(order.id)}>Decline</Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="pending-orders" className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                     {pendingOrders.map((order) => (
                      <div key={order.id} className="border border-border/50 rounded-lg p-3 bg-background/50">
                        <div className="flex items-center justify-between mb-2">
                           <div>
                            <p className="font-medium text-xs">#{order.id} • {order.customer}</p>
                            <p className="text-xs text-muted-foreground">{order.time}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">{order.amount}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs mb-3">
                          <span className="text-muted-foreground">{order.service} • {order.items} items</span>
                          <Badge variant="secondary" className={`text-xs ${order.status === 'ready' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                            {order.status === 'ready' ? 'Ready' : 'In Process'}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 text-xs h-8" onClick={() => updateOrderStatus(order.id, 'ready')}>Update Status</Button>
                          <Button variant="outline" size="sm" className="flex-1 text-xs h-8">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="ongoing-orders" className="mt-4 space-y-3 max-h-60 overflow-y-auto">
                     {ongoingOrders.map((order) => (
                      <div key={order.id} className="flex items-center space-x-3 p-2 rounded-lg bg-background/50 border border-border/50">
                        <div className={`w-2 h-2 ${order.statusColor} rounded-full`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-xs">#{order.id} • {order.customer}</p>
                            <span className="text-xs text-muted-foreground">{order.eta}</span>
                          </div>
                           <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">{order.service}</p>
                            <Badge variant="secondary" className="text-xs">{order.status}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="actions" className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                     <BulkOrderUpdate 
                        orders={allOrdersForBulkUpdate} 
                        onUpdateOrders={(orderIds, newStatus) => {
                            orderIds.forEach(orderId => updateOrderStatus(orderId, newStatus));
                        }}
                     />
                     <RevenueChart />
                     <DisputeClaim />
                     <InventoryTracker />
                  </TabsContent>
                </Tabs>
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

export default LaundererDashboard;
