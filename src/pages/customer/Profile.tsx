import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail,
  Bell,
  Shield,
  Heart,
  Gift,
  LogOut,
  Edit,
  Camera,
  Settings,
  CreditCard
} from "lucide-react";

const CustomerProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you'd handle logout here.
    console.log("Logging out...");
    navigate('/');
  };

  const profileData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    address: "123 Park Street, Sector 15, Gurgaon, Haryana 122001"
  };

  const preferences = [
    {
      title: "Push Notifications",
      description: "Receive order updates and offers",
      enabled: notifications,
      onChange: setNotifications
    },
    {
      title: "Dark Mode",
      description: "Use dark theme",
      enabled: darkMode,
      onChange: setDarkMode
    },
    {
      title: "SMS Updates",
      description: "Get SMS for important updates",
      enabled: true,
      onChange: () => {}
    }
  ];

  const menuItems = [
    { icon: MapPin, label: "Saved Addresses", count: 3, route: "/customer/addresses" },
    { icon: CreditCard, label: "Payment Methods", count: 2, route: "/customer/payments" },
    { icon: Gift, label: "Referral Program", route: "/customer/referrals" },
    { icon: Heart, label: "Favorite Launderers", count: 5, route: "/customer/favorites" },
    { icon: Bell, label: "Notifications", route: "/customer/notifications" },
    { icon: Shield, label: "Privacy & Security", route: "/customer/privacy" },
    { icon: Settings, label: "App Settings", route: "/customer/settings" }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4">
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
        <div className="px-4">
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
                <p className="text-sm text-muted-foreground">Premium Member</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  defaultValue={profileData.name}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={profileData.email}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue={profileData.phone}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <Input
                  id="address"
                  defaultValue={profileData.address}
                  disabled={!editMode}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6 px-4">
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="text-xl font-bold text-primary">24</div>
            <div className="text-xs text-muted-foreground">Orders</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="text-xl font-bold text-secondary">₹2,450</div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </Card>
          <Card className="p-4 text-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="text-xl font-bold text-accent">150</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </Card>
        </div>

        {/* Preferences */}
        <div className="px-4">
          <Card className="service-card mb-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <h3 className="font-semibold mb-4">Preferences</h3>
            <div className="space-y-4">
              {preferences.map((pref) => (
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
        </div>
        
        {/* Menu Items */}
        <div className="space-y-3 mb-6 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.label}
                className="p-4 cursor-pointer hover:shadow-medium transition-all animate-fade-in"
                style={{ animationDelay: `${index * 50 + 500}ms` }}
                onClick={() => navigate(item.route)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.label}</p>
                      {item.count && (
                        <p className="text-xs text-muted-foreground">{item.count} items</p>
                      )}
                    </div>
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
        <div className="px-4">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-200 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
