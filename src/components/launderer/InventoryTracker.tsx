import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Package, Plus, Minus, AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  category: "detergent" | "softener" | "bleach" | "starch" | "chemical" | "supplies";
  currentStock: number;
  maxCapacity: number;
  unit: string;
  costPerUnit: number;
  lastRestocked: string;
  lowStockThreshold: number;
}

interface InventoryTrackerProps {
  className?: string;
}

const InventoryTracker = ({ className }: InventoryTrackerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [usageAmount, setUsageAmount] = useState<string>("");
  const [restockAmount, setRestockAmount] = useState<string>("");

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: "det001",
      name: "Heavy Duty Detergent",
      category: "detergent",
      currentStock: 15,
      maxCapacity: 50,
      unit: "L",
      costPerUnit: 8.50,
      lastRestocked: "2024-01-10",
      lowStockThreshold: 10
    },
    {
      id: "soft001",
      name: "Fabric Softener",
      category: "softener",
      currentStock: 8,
      maxCapacity: 30,
      unit: "L",
      costPerUnit: 6.20,
      lastRestocked: "2024-01-08",
      lowStockThreshold: 5
    },
    {
      id: "ble001",
      name: "Oxygen Bleach",
      category: "bleach",
      currentStock: 3,
      maxCapacity: 20,
      unit: "kg",
      costPerUnit: 12.00,
      lastRestocked: "2024-01-05",
      lowStockThreshold: 5
    },
    {
      id: "star001",
      name: "Liquid Starch",
      category: "starch",
      currentStock: 12,
      maxCapacity: 25,
      unit: "L",
      costPerUnit: 4.80,
      lastRestocked: "2024-01-12",
      lowStockThreshold: 8
    },
    {
      id: "chem001",
      name: "Spot Remover",
      category: "chemical",
      currentStock: 6,
      maxCapacity: 15,
      unit: "bottles",
      costPerUnit: 15.00,
      lastRestocked: "2024-01-09",
      lowStockThreshold: 3
    }
  ]);

  const categories = [
    { value: "detergent", label: "Detergents", icon: "🧼", color: "bg-blue-500" },
    { value: "softener", label: "Softeners", icon: "🌸", color: "bg-pink-500" },
    { value: "bleach", label: "Bleach", icon: "⚪", color: "bg-gray-500" },
    { value: "starch", label: "Starch", icon: "✨", color: "bg-yellow-500" },
    { value: "chemical", label: "Chemicals", icon: "🧪", color: "bg-green-500" },
    { value: "supplies", label: "Supplies", icon: "📦", color: "bg-purple-500" }
  ];

  const getStockStatus = (item: InventoryItem) => {
    const percentage = (item.currentStock / item.maxCapacity) * 100;
    if (item.currentStock <= item.lowStockThreshold) {
      return { status: "low", color: "text-red-600", bgColor: "bg-red-100" };
    } else if (percentage < 50) {
      return { status: "medium", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    } else {
      return { status: "good", color: "text-green-600", bgColor: "bg-green-100" };
    }
  };

  const getLowStockItems = () => {
    return inventory.filter(item => item.currentStock <= item.lowStockThreshold);
  };

  const getTotalValue = () => {
    return inventory.reduce((total, item) => total + (item.currentStock * item.costPerUnit), 0);
  };

  const handleUsage = () => {
    if (!selectedItem || !usageAmount || parseFloat(usageAmount) <= 0) {
      toast.error("Please select an item and enter valid usage amount");
      return;
    }

    const amount = parseFloat(usageAmount);
    setInventory(prev => prev.map(item => {
      if (item.id === selectedItem) {
        const newStock = Math.max(0, item.currentStock - amount);
        if (newStock === 0) {
          toast.warning(`${item.name} is now out of stock!`);
        } else if (newStock <= item.lowStockThreshold) {
          toast.warning(`${item.name} is running low!`);
        }
        return { ...item, currentStock: newStock };
      }
      return item;
    }));

    toast.success(`Used ${amount} ${inventory.find(i => i.id === selectedItem)?.unit} of ${inventory.find(i => i.id === selectedItem)?.name}`);
    setUsageAmount("");
    setSelectedItem("");
  };

  const handleRestock = () => {
    if (!selectedItem || !restockAmount || parseFloat(restockAmount) <= 0) {
      toast.error("Please select an item and enter valid restock amount");
      return;
    }

    const amount = parseFloat(restockAmount);
    setInventory(prev => prev.map(item => {
      if (item.id === selectedItem) {
        const newStock = Math.min(item.maxCapacity, item.currentStock + amount);
        return { 
          ...item, 
          currentStock: newStock,
          lastRestocked: new Date().toISOString().split('T')[0]
        };
      }
      return item;
    }));

    toast.success(`Restocked ${amount} ${inventory.find(i => i.id === selectedItem)?.unit} of ${inventory.find(i => i.id === selectedItem)?.name}`);
    setRestockAmount("");
    setSelectedItem("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className={`flex items-center space-x-2 ${className}`}>
          <Package className="h-4 w-4" />
          <span>Inventory</span>
          {getLowStockItems().length > 0 && (
            <Badge variant="destructive" className="h-4 text-xs">
              {getLowStockItems().length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Tracker</span>
            {getLowStockItems().length > 0 && (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <AlertTriangle className="h-3 w-3" />
                <span>{getLowStockItems().length} Low Stock</span>
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Record Usage</TabsTrigger>
            <TabsTrigger value="restock">Restock</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                    <p className="text-xl font-bold">{inventory.length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Low Stock</p>
                    <p className="text-xl font-bold text-red-600">{getLowStockItems().length}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-xl font-bold">${getTotalValue().toFixed(2)}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Well Stocked</p>
                    <p className="text-xl font-bold text-green-600">{inventory.length - getLowStockItems().length}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Inventory List */}
            <div className="max-h-96 overflow-y-auto space-y-2">
              {inventory.map((item) => {
                const stockStatus = getStockStatus(item);
                const percentage = (item.currentStock / item.maxCapacity) * 100;
                const category = categories.find(c => c.value === item.category);
                
                return (
                  <Card key={item.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${category?.color}`}></div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">{category?.label}</p>
                          </div>
                        </div>
                        <Badge className={stockStatus.bgColor + " " + stockStatus.color}>
                          {stockStatus.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Stock Level</span>
                          <span>{item.currentStock} / {item.maxCapacity} {item.unit}</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Cost: ${item.costPerUnit}/{item.unit}</span>
                        <span>Last restocked: {item.lastRestocked}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="space-y-4">
            <Card className="p-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Record Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Item</Label>
                  <Select value={selectedItem} onValueChange={setSelectedItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose inventory item" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventory.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{item.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {item.currentStock} {item.unit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Usage Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter amount used"
                      value={usageAmount}
                      onChange={(e) => setUsageAmount(e.target.value)}
                      min="0"
                      step="0.1"
                    />
                    <Button onClick={handleUsage} className="flex items-center space-x-2">
                      <Minus className="h-4 w-4" />
                      <span>Record Usage</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="restock" className="space-y-4">
            <Card className="p-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Restock Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Item</Label>
                  <Select value={selectedItem} onValueChange={setSelectedItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose inventory item" />
                    </SelectTrigger>
                    <SelectContent>
                      {inventory.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{item.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {item.currentStock} / {item.maxCapacity} {item.unit}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Restock Amount</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Enter amount to add"
                      value={restockAmount}
                      onChange={(e) => setRestockAmount(e.target.value)}
                      min="0"
                      step="0.1"
                    />
                    <Button onClick={handleRestock} className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Restock</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Low Stock Alert */}
            {getLowStockItems().length > 0 && (
              <Card className="p-4 border-red-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-red-600 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Low Stock Alert</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getLowStockItems().map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                        <span className="font-medium">{item.name}</span>
                        <Badge variant="destructive">
                          {item.currentStock} {item.unit} left
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryTracker;