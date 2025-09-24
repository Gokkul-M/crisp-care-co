import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  MapPin, 
  Bell,
  Shield,
  LogOut,
  Edit,
  Camera,
  CreditCard,
  FileText,
  Moon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import ThemeToggle from "@/components/ThemeToggle";

const CustomerSettings = () => {
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [smsUpdates, setSmsUpdates] = useState(true);
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+91 98765 43210",
    address: "123 Park Street, Sector 15, Gurgaon"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    toast("You have been logged out.");
    navigate("/auth");
  };

  const menuItems = [
    { icon: MapPin, label: "My Addresses", route: "/customer/addresses" },
    { icon: CreditCard, label: "Payment Methods", route: "/customer/payments" },
    { icon: FileText, label: "Terms & Conditions", route: "/terms" },
    { icon: Shield, label: "Privacy & Security", route: "/privacy" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <Button 
            variant={editMode ? "default" : "outline"} 
            size="sm"
            onClick={() => editMode ? handleSave() : setEditMode(true)}
          >
            <Edit className="h-4 w-4 mr-2" />
            {editMode ? "Save" : "Edit Profile"}
          </Button>
        </div>

        <Card className="mb-6 p-4 shadow-sm">
          <div className="flex items-center space-x-4 mb-5">
            <div className="relative">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center border">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
              {editMode && (
                <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-background">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{profileData.name}</h2>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input id="name" value={profileData.name} onChange={handleInputChange} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input id="email" type="email" value={profileData.email} onChange={handleInputChange} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input id="phone" value={profileData.phone} onChange={handleInputChange} disabled={!editMode} />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm font-medium">Default Address</Label>
              <Input id="address" value={profileData.address} onChange={handleInputChange} disabled={!editMode} />
            </div>
          </div>
        </Card>

        <Card className="mb-6 p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Appearance</h3>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-sm">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </Card>

        <Card className="mb-6 p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Preferences</h3>
           <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium text-sm">Push Notifications</p>
                <p className="text-xs text-muted-foreground">For order updates & offers</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between py-2">
               <div>
                <p className="font-medium text-sm">SMS Notifications</p>
                <p className="text-xs text-muted-foreground">For critical updates</p>
              </div>
              <Switch checked={smsUpdates} onCheckedChange={setSmsUpdates} />
            </div>
        </Card>

        <div className="space-y-2 mb-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button key={item.label} variant="ghost" className="w-full justify-start p-4 h-14 text-sm" onClick={() => navigate(item.route)}>
                <Icon className="h-5 w-5 mr-4 text-muted-foreground" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full text-destructive-foreground border-destructive/50 hover:bg-destructive/10">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
              <AlertDialogDescription>
                You will be returned to the login screen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  );
};

export default CustomerSettings;
