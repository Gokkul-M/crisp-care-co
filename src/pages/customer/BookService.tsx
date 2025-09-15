import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Minus, Camera, MapPin, Calendar, Clock } from "lucide-react";

const BookService = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});
  const [totalAmount, setTotalAmount] = useState(0);

  const services = [
    {
      id: 'wash-iron',
      name: 'Wash & Iron',
      description: 'Complete wash and iron service',
      price: 5,
      icon: '👕'
    },
    {
      id: 'dry-clean',
      name: 'Dry Cleaning',
      description: 'Premium dry cleaning service',
      price: 15,
      icon: '🧥'
    },
    {
      id: 'wash-only',
      name: 'Wash Only',
      description: 'Wash without ironing',
      price: 3,
      icon: '🧺'
    }
  ];

  const garmentTypes = [
    { name: 'Shirt', price: 5 },
    { name: 'T-Shirt', price: 3 },
    { name: 'Jeans', price: 6 },
    { name: 'Dress', price: 12 },
    { name: 'Suit', price: 20 },
    { name: 'Bedsheet', price: 8 }
  ];

  const updateItemCount = (item: string, change: number) => {
    const newCount = Math.max(0, (selectedItems[item] || 0) + change);
    const newItems = { ...selectedItems };
    
    if (newCount === 0) {
      delete newItems[item];
    } else {
      newItems[item] = newCount;
    }
    
    setSelectedItems(newItems);
    
    // Calculate total
    const total = Object.entries(newItems).reduce((sum, [itemName, count]) => {
      const item = garmentTypes.find(g => g.name === itemName);
      return sum + (item ? item.price * count : 0);
    }, 0);
    setTotalAmount(total);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => window.location.href = '/customer/dashboard'}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Book Service</h1>
        </div>

        {/* Service Selection */}
        <div className="mb-6">
          <h2 className="font-semibold mb-4">Select Service Type</h2>
          <div className="space-y-3">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`p-4 cursor-pointer transition-all hover:shadow-medium ${
                  selectedService === service.id 
                    ? 'border-primary bg-primary/5 shadow-medium' 
                    : 'hover:border-primary/50'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{service.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <Badge variant="secondary">${service.price}/item</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Garment Selection */}
        {selectedService && (
          <div className="mb-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Select Items</h2>
              <Button variant="outline" size="sm">
                <Camera className="h-4 w-4 mr-2" />
                Upload Photo
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {garmentTypes.map((garment) => (
                <Card key={garment.name} className="p-4">
                  <div className="text-center mb-3">
                    <h3 className="font-medium text-sm">{garment.name}</h3>
                    <p className="text-xs text-muted-foreground">${garment.price}/piece</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateItemCount(garment.name, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <span className="font-medium w-8 text-center">
                      {selectedItems[garment.name] || 0}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateItemCount(garment.name, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Pickup & Delivery */}
        {Object.keys(selectedItems).length > 0 && (
          <div className="mb-6 animate-slide-up">
            <h2 className="font-semibold mb-4">Pickup & Delivery</h2>
            
            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Pickup Address</h3>
                </div>
                <Input
                  placeholder="Enter pickup address"
                  className="mobile-input"
                />
              </Card>
              
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm">Pickup Date</h3>
                  </div>
                  <Input
                    type="date"
                    className="mobile-input text-sm"
                  />
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <h3 className="font-medium text-sm">Pickup Time</h3>
                  </div>
                  <Input
                    type="time"
                    className="mobile-input text-sm"
                  />
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Special Instructions */}
        {Object.keys(selectedItems).length > 0 && (
          <Card className="service-card mb-6">
            <Label htmlFor="instructions" className="font-medium">Special Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Any special care instructions for your items..."
              className="mobile-input mt-2 min-h-[80px]"
            />
          </Card>
        )}

        {/* Order Summary */}
        {totalAmount > 0 && (
          <Card className="service-card mb-6 animate-slide-up">
            <h3 className="font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-2 mb-4">
              {Object.entries(selectedItems).map(([item, count]) => {
                const garment = garmentTypes.find(g => g.name === item);
                return (
                  <div key={item} className="flex justify-between text-sm">
                    <span>{item} x {count}</span>
                    <span>${garment ? garment.price * count : 0}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">${totalAmount}</span>
              </div>
            </div>
          </Card>
        )}

        {/* Book Now Button */}
        {totalAmount > 0 && (
          <Button className="service-button animate-slide-up">
            Book Now - ${totalAmount}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookService;