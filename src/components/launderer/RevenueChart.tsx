import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, Package, Users, CalendarDays } from "lucide-react";

interface RevenueChartProps {
  className?: string;
}

const RevenueChart = ({ className }: RevenueChartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("daily");

  // Mock data
  const dailyData = [
    { name: 'Mon', revenue: 240, orders: 12 },
    { name: 'Tue', revenue: 300, orders: 15 },
    { name: 'Wed', revenue: 200, orders: 10 },
    { name: 'Thu', revenue: 450, orders: 22 },
    { name: 'Fri', revenue: 380, orders: 18 },
    { name: 'Sat', revenue: 520, orders: 25 },
    { name: 'Sun', revenue: 290, orders: 14 },
  ];

  const weeklyData = [
    { name: 'Week 1', revenue: 1890, orders: 95 },
    { name: 'Week 2', revenue: 2100, orders: 110 },
    { name: 'Week 3', revenue: 1750, orders: 88 },
    { name: 'Week 4', revenue: 2380, orders: 125 },
  ];

  const monthlyData = [
    { name: 'Jan', revenue: 8200, orders: 410 },
    { name: 'Feb', revenue: 7800, orders: 390 },
    { name: 'Mar', revenue: 9100, orders: 455 },
    { name: 'Apr', revenue: 8900, orders: 445 },
    { name: 'May', revenue: 9800, orders: 490 },
    { name: 'Jun', revenue: 8500, orders: 425 },
  ];

  const serviceData = [
    { name: 'Wash & Iron', value: 45, color: '#3b82f6' },
    { name: 'Dry Clean', value: 30, color: '#10b981' },
    { name: 'Express', value: 15, color: '#f59e0b' },
    { name: 'Delicate', value: 10, color: '#ef4444' },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return dailyData;
    }
  };

  const getTotalRevenue = () => {
    return getCurrentData().reduce((sum, item) => sum + item.revenue, 0);
  };

  const getTotalOrders = () => {
    return getCurrentData().reduce((sum, item) => sum + item.orders, 0);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className={`flex items-center space-x-2 ${className}`}>
            <TrendingUp className="h-4 w-4" />
            <span>Revenue</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Revenue Dashboard</span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-xl font-bold">${getTotalRevenue()}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                    <p className="text-xl font-bold">{getTotalOrders()}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Order</p>
                    <p className="text-xl font-bold">${Math.round(getTotalRevenue() / getTotalOrders())}</p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Growth</p>
                    <p className="text-xl font-bold text-green-600">+12%</p>
                  </div>
                </div>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="daily" className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Daily Revenue</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={dailyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Bar dataKey="revenue" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card className="p-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Service Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={serviceData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                          >
                            {serviceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        {serviceData.map((item) => (
                          <div key={item.name} className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                            <span className="text-xs">{item.name} ({item.value}%)</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="weekly" className="space-y-4">
                <Card className="p-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Weekly Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="monthly" className="space-y-4">
                <Card className="p-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Monthly Revenue Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="revenue" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RevenueChart;