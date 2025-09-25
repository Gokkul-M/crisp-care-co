import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface LaundererOrderCardProps {
  order: {
    id: string;
    customer: string;
    service: string;
    amount: string;
    status: string;
  };
}

const LaundererOrderCard: React.FC<LaundererOrderCardProps> = ({ order }) => {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "picked-up": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in-progress": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "out-for-delivery": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "completed": return "bg-green-100 text-green-800 hover:bg-green-100";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-semibold">#{order.id}</p>
          <p className="text-sm text-muted-foreground">{order.customer}</p>
        </div>
        <Badge className={getStatusColor(order.status)}>
          {order.status.replace("-", " ")}
        </Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span>Service</span>
          <span className="font-medium">{order.service}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Amount</span>
          <span className="font-bold text-primary">{order.amount}</span>
        </div>
      </div>

      <Button size="sm" className="w-full" onClick={() => navigate(`/launderer/orders/${order.id}`)}>
        View Details
      </Button>
    </Card>
  );
};

export default LaundererOrderCard;
