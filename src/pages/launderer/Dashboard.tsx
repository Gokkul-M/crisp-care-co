
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Package, Bell, Truck, ChevronUp, ChevronDown, LogOut, User, ChartBar as BarChart2, ShieldAlert } from "lucide-react";
import MapComponent from "@/components/GoogleMap";
import { useNavigate } from "react-router-dom";

const LaundererDashboard = () => {
  const [isActionCardMinimized, setIsActionCardMinimized] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    navigate('/');
  };

  const laundererLocation = { lat: 40.7128, lng: -74.0060 };

  const newOrders = [];

  const quickActions = [
    { icon: Plus, label: "New Order", color: "bg-accent", route: "/launderer/new-order" },
    { icon: Package, label: "All Orders", color: "bg-primary", route: "/launderer/orders" },
    { icon: BarChart2, label: "Revenue", color: "bg-secondary", route: "/launderer/revenue" },
    { icon: ShieldAlert, label: "Dispute/Claim", color: "bg-destructive", route: "/launderer/dispute" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <div className="absolute inset-0 z-0">
        <MapComponent
          center={laundererLocation}
          customerLocation={newOrders.length > 0 ? newOrders[0].location : undefined}
          showUserLocation={true}
          height="2000vh"
        />
      </div>

      <div className="absolute top-0 left-0 right-0 z-10 bg-background/60 backdrop-blur-md">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} transition-colors border-2 border-background shadow-sm`}></div>
            <h1 className="text-lg font-bold text-foreground">Hi Laundromat!</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
            <Label htmlFor="online-status" className="text-xs font-medium text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </Label>
            <Button variant="ghost" size="icon" className="w-9 h-9" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {isOnline && newOrders.length > 0 && (
        <div className="absolute top-20 left-4 right-4 z-10">
          <Card className="bg-accent/95 text-accent-foreground backdrop-blur-md border-0 shadow-lg">
            <div className="p-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center">
                  <Bell className="h-5 w-5 animate-wiggle" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">New Order!</p>
                  <p className="text-xs opacity-90">{newOrders[0].customer} is {newOrders[0].distance}</p>
                </div>
                <Button variant="secondary" size="sm" className="text-xs px-3" onClick={() => navigate('/launderer/orders')}>
                  View
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="absolute bottom-24 left-0 right-0 z-10 px-4">
        <Collapsible open={!isActionCardMinimized} onOpenChange={(open) => setIsActionCardMinimized(!open)}>
          <Card className="bg-background/95 backdrop-blur-lg border-border/50 shadow-xl animate-slide-up">
            {isActionCardMinimized && (
              <CollapsibleTrigger asChild>
                <div className="p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        {quickActions.map((action) => {
                          const Icon = action.icon;
                          return (
                            <div key={action.label} className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
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
            
            <CollapsibleContent className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-foreground">Quick Actions</h2>
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
                        onClick={() => navigate(action.route)}
                      >
                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-foreground">{action.label}</p>
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
    </div>
  );
};

export default LaundererDashboard;
