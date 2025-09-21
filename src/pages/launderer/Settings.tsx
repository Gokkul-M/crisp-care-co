import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Bell,
  Shield,
  Star,
  TrendingUp,
  LogOut,
  Edit,
  Camera,
  Settings,
  Clock,
  Package,
  Home
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const LaundererSettings = () => {
  const [editMode, setEditMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const profileData = {
    name: "Fresh & Clean Laundry",
    ownerName: "Rajesh Kumar", 
    email: "contact@freshcleanlaundry.com",
    phone: "+91 98765 43210",
    address: "Shop 15, Commercial Complex, Sector 22, Gurgaon",
    rating: 4.8,
    totalOrders: 1250,
    experience: "5 years"
  };

  const stats = [
    { label: "Total Orders", value: "1,250", icon: Package, color: "text-primary" },
    { label: "Rating", value: "4.8", icon: Star, color: "text-yellow-500" },
    { label: "Revenue", value: "₹1.2L", icon: TrendingUp, color: "text-green-500" },
    { label: "Response Time", value: "15 min", icon: Clock, color: "text-blue-500" }
  ];

  const preferences = [
    {
      title: "Online Status",
      description: "Available for new orders",
      enabled: isOnline,
      onChange: setIsOnline
    },
    {
      title: "Order Notifications",
      description: "Get notified for new orders",
      enabled: notifications,
      onChange: setNotifications
    },
    {
      title: "Auto Accept",
      description: "Automatically accept orders",
      enabled: false,
      onChange: () => {}
    }
  ];

  const menuItems = [
    { icon: Package, label: "Service Settings", route: "/launderer/services" },
    { icon: MapPin, label: "Service Areas", route: "/launderer/areas" },
    { icon: TrendingUp, label: "Revenue Analytics", route: "/launderer/revenue" },
    { icon: Bell, label: "Notification Settings", route: "/launderer/notifications" },
    { icon: Shield, label: "Privacy & Security", route: "/launderer/privacy" },
  ];

  const navItems = [
    { icon: Home, label: "Home", route: "/launderer/dashboard" },
    { icon: Package, label: "Orders", route: "/launderer/orders" },
    { icon: Settings, label: "Settings", route: "/launderer/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "Save" : "Edit Profile"}
          </Button>
        </div>

        <Card className="mb-6 p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
              <Button 
                size="icon" 
                variant="outline"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{profileData.name}</h2>
              <p className="text-sm text-muted-foreground">Owner: {profileData.ownerName}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={isOnline ? "default" : "secondary"}>
                  {isOnline ? "Online" : "Offline"}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{profileData.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input id="businessName" value={profileData.name} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="ownerName">Owner Name</Label>
              <Input id="ownerName" value={profileData.ownerName} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profileData.email} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" value={profileData.phone} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="address">Business Address</Label>
              <Input id="address" value={profileData.address} disabled={!editMode} />
            </div>
          </div>
        </Card>

        <Card className="mb-6 p-4">
          <h3 className="font-semibold mb-4">Business Settings</h3>
          <div className="space-y-4">
            {preferences.map((pref) => (
              <div key={pref.title} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{pref.title}</p>
                  <p className="text-sm text-muted-foreground">{pref.description}</p>
                </div>
                <Switch checked={pref.enabled} onCheckedChange={pref.onChange} />
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-2 mb-6">
            {menuItems.map((item) => {
                const Icon = item.icon;
                return(
                    <Button key={item.label} variant="ghost" className="w-full justify-start p-4">
                        <Icon className="h-5 w-5 mr-4 text-gray-600" />
                        <span>{item.label}</span>
                    </Button>
                )
            })}
        </div>

        <Button variant="outline" className="w-full text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
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

export default LaundererSettings;
