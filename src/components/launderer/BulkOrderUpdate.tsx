import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Package, CheckCircle2, Clock, Truck } from "lucide-react";
import { toast } from "sonner";

interface Order {
  id: string;
  customer: string;
  service: string;
  status: "in-process" | "ready" | "delivered" | "pending";
  amount: string;
  items: number;
}

interface BulkOrderUpdateProps {
  orders: Order[];
  onUpdateOrders: (orderIds: string[], newStatus: string) => void;
}

const BulkOrderUpdate = ({ orders, onUpdateOrders }: BulkOrderUpdateProps) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [bulkStatus, setBulkStatus] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const statusOptions = [
    { value: "in-process", label: "In Process", icon: Clock, color: "bg-yellow-500" },
    { value: "ready", label: "Ready for Pickup", icon: CheckCircle2, color: "bg-green-500" },
    { value: "delivered", label: "Delivered", icon: Truck, color: "bg-blue-500" },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(orders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleBulkUpdate = () => {
    if (selectedOrders.length === 0 || !bulkStatus) {
      toast.error("Please select orders and status");
      return;
    }
    
    onUpdateOrders(selectedOrders, bulkStatus);
    toast.success(`Updated ${selectedOrders.length} orders to ${statusOptions.find(s => s.value === bulkStatus)?.label}`);
    setSelectedOrders([]);
    setBulkStatus("");
    setIsOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = statusOptions.find(s => s.value === status) || 
      { label: status, color: "bg-gray-500", icon: Package };
    const Icon = statusConfig.icon;
    
    return (
      <Badge variant="secondary" className="flex items-center space-x-1">
        <div className={`w-2 h-2 rounded-full ${statusConfig.color}`}></div>
        <span className="text-xs">{statusConfig.label}</span>
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2">
          <Package className="h-4 w-4" />
          <span>Bulk Update</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Bulk Order Update</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Bulk Actions */}
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={selectedOrders.length === orders.length}
                onCheckedChange={handleSelectAll}
              />
              <span className="text-sm font-medium">
                Select All ({selectedOrders.length} of {orders.length})
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select value={bulkStatus} onValueChange={setBulkStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Update Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => {
                    const Icon = status.icon;
                    return (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${status.color}`}></div>
                          <span>{status.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleBulkUpdate}
                disabled={selectedOrders.length === 0 || !bulkStatus}
                size="sm"
              >
                Update ({selectedOrders.length})
              </Button>
            </div>
          </div>

          {/* Orders List */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {orders.map((order) => (
              <Card key={order.id} className={`p-3 ${selectedOrders.includes(order.id) ? 'ring-2 ring-primary' : ''}`}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">#{order.id} • {order.customer}</p>
                        <p className="text-xs text-muted-foreground">{order.service} • {order.items} items</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{order.amount}</Badge>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BulkOrderUpdate;