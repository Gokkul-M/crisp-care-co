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
  Package
} from "lucide-react";
import MobileNavbar from "@/components/MobileNavbar";

const LaundererProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [notifications, setNotifications] = useState(true);

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
    { icon: Settings, label: "App Settings", route: "/launderer/settings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "Save" : "Edit"}
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="service-card mb-6 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <Button 
                size="icon" 
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

          {/* Profile Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName" className="text-sm font-medium">Business Name</Label>
              <Input
                id="businessName"
                value={profileData.name}
                disabled={!editMode}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="ownerName" className="text-sm font-medium">Owner Name</Label>
              <Input
                id="ownerName"
                value={profileData.ownerName}
                disabled={!editMode}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={profileData.email}
                disabled={!editMode}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                value={profileData.phone}
                disabled={!editMode}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Business Address</Label>
              <Input
                id="address"
                value={profileData.address}
                disabled={!editMode}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={stat.label}
                className="p-4 text-center animate-fade-in" 
                style={{ animationDelay: `${index * 100 + 100}ms` }}
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Business Settings */}
        <Card className="service-card mb-6 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h3 className="font-semibold mb-4">Business Settings</h3>
          <div className="space-y-4">
            {preferences.map((pref, index) => (
              <div key={pref.title} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{pref.title}</p>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
                <Switch
                  checked={pref.enabled}
                  onCheckedChange={pref.onChange}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Menu Items */}
        <div className="space-y-3 mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.label}
                className="p-4 cursor-pointer hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 50 + 600}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-medium text-sm">{item.label}</p>
                  </div>
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-xs">›</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
      <MobileNavbar />
    </div>
  );
};

export default LaundererProfile;