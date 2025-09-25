import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Home, Package, Settings, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import LaundererOrderCard from "@/components/LaundererOrderCard";
import SegmentedControl from "@/components/SegmentedControl";

const LaundererOrders = () => {
  const [selectedTab, setSelectedTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const orders = [
    {
      id: "CC001",
      customer: "John Doe",
      service: "Wash & Iron",
      amount: "$450",
      status: "in-progress",
    },
    {
      id: "CC002", 
      customer: "Jane Smith",
      service: "Dry Cleaning",
      amount: "$320",
      status: "picked-up",
    },
    {
      id: "CC003",
      customer: "Bob Johnson",
      service: "Wash & Iron", 
      amount: "$680",
      status: "completed",
    }
  ];

  const navItems = [
    { icon: Home, label: "Home", route: "/launderer/dashboard" },
    { icon: Package, label: "Orders", route: "/launderer/orders" },
    { icon: Settings, label: "Settings", route: "/launderer/settings" },
  ];

  const tabs = [
    { label: "Active", value: "active" },
    { label: "History", value: "completed" },
  ];

  const filteredOrders = orders.filter((order) => {
    const matchesTab = selectedTab === "active" ? !["completed", "cancelled"].includes(order.status) : ["completed", "cancelled"].includes(order.status);
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Orders</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by Order ID or Customer"
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <SegmentedControl tabs={tabs} onTabChange={setSelectedTab} />

        <div className="space-y-4 pt-4">
          {filteredOrders.map((order) => (
            <LaundererOrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t z-20">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.route;
            return (
              <button
                key={item.label}
                className={`flex flex-col items-center justify-center h-full w-full rounded-lg transition-colors ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
                onClick={() => navigate(item.route)}
              >
                <Icon className={`h-5 w-5 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[11px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LaundererOrders;
