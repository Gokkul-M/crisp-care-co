import {
  ArrowLeft,
  CheckCircle,
  FileText,
  HelpCircle,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const OrderDetails = () => {
  // Mock data for a single order, in a real app this would come from an API
  const order = {
    id: "ORD-001",
    status: "In Progress",
    launderer: {
      name: "Speedy Wash",
      img: "/placeholder.svg",
      address: "123 Main St, Anytown, USA",
      phone: "+91 98765 43210",
    },
    service: "Wash & Fold",
    items: 24,
    amount: "₹450.00",
    paymentMethod: "UPI",
    pickupDate: "2023-10-27T10:00:00",
    deliveryDate: "2023-10-29T18:00:00",
    progress: 66,
    timeline: [
      { status: "Order Placed", date: "2023-10-27 09:30", completed: true },
      { status: "Picked Up", date: "2023-10-27 11:00", completed: true },
      { status: "In Progress", date: "2023-10-28 14:00", completed: false },
      { status: "Out for Delivery", date: null, completed: false },
      { status: "Completed", date: null, completed: false },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      <div className="mobile-container">
        <header className="py-6 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Order Details</h1>
            <p className="text-sm text-muted-foreground">Order ID: {order.id}</p>
          </div>
        </header>

        <main className="space-y-6">
          {/* Status Section */}
          <section className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border/30">
            <div className="flex items-center mb-4">
              <img
                src={order.launderer.img}
                alt={order.launderer.name}
                className="w-12 h-12 rounded-full mr-4 border-2 border-primary/50"
              />
              <div className="flex-grow">
                <p className="font-bold text-foreground">
                  {order.launderer.name}
                </p>
                <Badge variant="secondary">{order.status}</Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-primary">
                  {order.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {order.progress}%
                </span>
              </div>
              <Progress value={order.progress} className="h-2" />
            </div>
          </section>

          {/* Timeline Section */}
          <section className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border/30">
            <h2 className="font-semibold mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {order.timeline.map((event, index) => (
                <div key={index} className="flex">
                  <div className="flex flex-col items-center mr-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        event.completed ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      {event.completed && (
                        <CheckCircle className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    {index < order.timeline.length - 1 && (
                      <div className="w-px h-8 bg-muted"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{event.status}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Order Summary */}
          <section className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border/30">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{order.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{order.items} pieces</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total Amount</span>
                <span className="font-bold text-primary">{order.amount}</span>
              </div>
            </div>
          </section>

          {/* Support */}
          <section className="bg-card/80 backdrop-blur-md rounded-2xl p-4 border border-border/30">
            <h2 className="font-semibold mb-4">Need Help?</h2>
            <div className="flex gap-4">
              <Button variant="outline" className="w-full">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQs
              </Button>
              <Button variant="secondary" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
