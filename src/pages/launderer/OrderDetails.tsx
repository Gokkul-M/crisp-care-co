import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Phone, MessageSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import MapComponent from "@/components/GoogleMap";
import Timeline from "@/components/Timeline";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();

  // Mockup data - in a real app, you would fetch this based on orderId
  const order = {
    id: orderId,
    customer: "Lisa Davis",
    service: "Express Wash",
    items: 4,
    amount: "$35",
    pickup: "789 Pine St, Anytown, USA",
    status: "in-progress",
    location: { lat: 40.7128, lng: -74.0060 }, // Mockup location
    history: [
      { status: "Order Accepted", time: "10:30 AM" },
      { status: "Picked Up", time: "11:00 AM" },
      { status: "Washing", time: "11:15 AM" },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container py-4">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Order #{order.id}</h1>
        </div>

        <Card className="mb-4">
          <div className="h-48 w-full">
            <MapComponent center={order.location} laundrers={[]} showUserLocation={false} height="100%" />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{order.customer}</h2>
                <p className="text-sm text-muted-foreground flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {order.pickup}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span>{order.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items</span>
              <span>{order.items}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold">{order.amount}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-4">
          <h3 className="font-semibold mb-4">Order History</h3>
          <Timeline history={order.history} />
        </Card>

        <div className="space-y-2">
          <Select defaultValue={order.status}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Update Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full">Update Status</Button>
          <Button variant="outline" className="w-full">Navigate to Address</Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
