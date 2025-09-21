import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Camera, FileText, Send, Package } from "lucide-react";
import { toast } from "sonner";

interface DisputeClaimProps {
  className?: string;
}

const DisputeClaim = ({ className }: DisputeClaimProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    orderId: "",
    issueType: "",
    description: "",
    customerName: "",
    itemsAffected: "",
    photos: [] as File[]
  });

  const issueTypes = [
    { value: "damaged", label: "Damaged Items", icon: "⚠️" },
    { value: "missing", label: "Missing Items", icon: "❓" },
    { value: "stain-not-removed", label: "Stain Not Removed", icon: "🔴" },
    { value: "color-bleeding", label: "Color Bleeding", icon: "🌈" },
    { value: "shrinkage", label: "Shrinkage", icon: "📏" },
    { value: "wrong-items", label: "Wrong Items Returned", icon: "🔄" },
    { value: "other", label: "Other Issue", icon: "📝" }
  ];

  const recentOrders = [
    { id: "CC001", customer: "Sarah Johnson", service: "Wash & Iron", date: "2024-01-15" },
    { id: "CC002", customer: "Mike Brown", service: "Dry Cleaning", date: "2024-01-14" },
    { id: "CC003", customer: "John Smith", service: "Express Wash", date: "2024-01-13" },
    { id: "CC004", customer: "Emma Wilson", service: "Delicate Care", date: "2024-01-12" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-populate customer name when order is selected
    if (field === "orderId") {
      const order = recentOrders.find(o => o.id === value);
      if (order) {
        setFormData(prev => ({ ...prev, customerName: order.customer }));
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...newFiles].slice(0, 5) // Max 5 photos
      }));
    }
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    if (!formData.orderId || !formData.issueType || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would submit the dispute/claim
    toast.success("Dispute claim submitted successfully");
    
    // Reset form
    setFormData({
      orderId: "",
      issueType: "",
      description: "",
      customerName: "",
      itemsAffected: "",
      photos: []
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={`flex items-center space-x-2 ${className}`}>
          <AlertTriangle className="h-4 w-4" />
          <span>Report Issue</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Report Damaged/Missing Garments</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Selection */}
          <div className="space-y-2">
            <Label htmlFor="orderId">Order ID *</Label>
            <Select value={formData.orderId} onValueChange={(value) => handleInputChange("orderId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an order" />
              </SelectTrigger>
              <SelectContent>
                {recentOrders.map((order) => (
                  <SelectItem key={order.id} value={order.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>#{order.id} - {order.customer}</span>
                      <Badge variant="outline" className="ml-2">{order.service}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              placeholder="Auto-filled when order is selected"
              disabled
            />
          </div>

          {/* Issue Type */}
          <div className="space-y-2">
            <Label htmlFor="issueType">Issue Type *</Label>
            <Select value={formData.issueType} onValueChange={(value) => handleInputChange("issueType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                {issueTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center space-x-2">
                      <span>{type.icon}</span>
                      <span>{type.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Items Affected */}
          <div className="space-y-2">
            <Label htmlFor="itemsAffected">Items Affected</Label>
            <Input
              id="itemsAffected"
              value={formData.itemsAffected}
              onChange={(e) => handleInputChange("itemsAffected", e.target.value)}
              placeholder="e.g., White shirt, Blue jeans, Red dress"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the issue in detail..."
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Evidence Photos (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-4">
              <div className="text-center">
                <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload photos of damaged or missing items
                </p>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Label
                  htmlFor="photo-upload"
                  className="cursor-pointer inline-flex items-center space-x-2 text-primary hover:text-primary/80"
                >
                  <span>Choose Photos</span>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Max 5 photos, up to 5MB each
                </p>
              </div>
              
              {formData.photos.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removePhoto(index)}
                      >
                        ×
                      </Button>
                      <p className="text-xs truncate mt-1">{photo.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Submit Claim</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisputeClaim;