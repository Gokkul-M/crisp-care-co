import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import RevenueChart from "@/components/launderer/RevenueChart";

const Revenue = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Revenue</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm"
              variant={timeRange === "daily" ? "secondary" : "ghost"} 
              onClick={() => setTimeRange("daily")}
            >
              Daily
            </Button>
            <Button 
              size="sm"
              variant={timeRange === "weekly" ? "secondary" : "ghost"} 
              onClick={() => setTimeRange("weekly")}
            >
              Weekly
            </Button>
            <Button 
              size="sm"
              variant={timeRange === "monthly" ? "secondary" : "ghost"} 
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="capitalize">{timeRange} Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Revenue;
