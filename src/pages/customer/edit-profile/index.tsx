import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, MapPin, Camera, CreditCard, Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("9876543210"); // Default phone number for demo
  const [addresses, setAddresses] = useState(["123 Main St, Anytown USA"]);
  const [paymentMode, setPaymentMode] = useState("cod");

  const handleAddAddress = () => {
    setAddresses([...addresses, ""]);
  };

  const handleAddressChange = (index: number, value: string) => {
    const newAddresses = [...addresses];
    newAddresses[index] = value;
    setAddresses(newAddresses);
  };

  const handleRemoveAddress = (index: number) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  const handleSaveProfile = () => {
    if (!name || addresses.some(addr => !addr)) {
      toast.error("Please fill all the required fields.");
      return;
    }
    toast.success("Profile updated successfully!");
    navigate("/customer/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        <div className="flex items-center mb-8">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Edit Your Profile</h1>
        </div>

        <Card className="service-card p-6 animate-fade-in">
            <div className="space-y-8">
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center border-2 border-dashed">
                        <User className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <Button size="icon" variant="outline" className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-background">
                        <Camera className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                            <Input id="name" placeholder="Sarah Johnson" value={name} onChange={e => setName(e.target.value)} className="mobile-input pl-11" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                            <Input id="phone" type="tel" value={phone} disabled className="mobile-input pl-11 font-medium" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Label>Your Addresses</Label>
                        {addresses.map((address, index) => (
                            <div key={index} className="relative">
                                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                <Input placeholder="123 Main St, Anytown USA" value={address} onChange={e => handleAddressChange(index, e.target.value)} className="mobile-input pl-11 pr-10"/>
                                {addresses.length > 1 && (
                                    <Button size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" onClick={() => handleRemoveAddress(index)}>
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={handleAddAddress} className="w-full border-dashed">
                            <Plus className="h-4 w-4 mr-2" />
                            Add another address
                        </Button>
                    </div>

                    <div className="space-y-3">
                        <Label>Preferred Payment Mode</Label>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant={paymentMode === 'cod' ? 'default' : 'outline'} onClick={() => setPaymentMode('cod')} className="h-12 text-sm">
                                <CreditCard className="h-5 w-5 mr-2" />
                                Cash on Delivery
                            </Button>
                            <Button variant={paymentMode === 'online' ? 'default' : 'outline'} onClick={() => setPaymentMode('online')} className="h-12 text-sm">
                                Online Payment
                            </Button>
                        </div>
                    </div>

                    <Button onClick={handleSaveProfile} className="service-button w-full !mt-8">
                        Save Changes
                    </Button>
                </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EditProfile;
