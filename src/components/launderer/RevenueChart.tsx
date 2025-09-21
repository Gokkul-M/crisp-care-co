
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const dailyData = [
  { date: "2024-07-15", revenue: 250 },
  { date: "2024-07-16", revenue: 300 },
  { date: "2024-07-17", revenue: 280 },
  { date: "2024-07-18", revenue: 350 },
  { date: "2024-07-19", revenue: 400 },
  { date: "2024-07-20", revenue: 320 },
  { date: "2024-07-21", revenue: 380 },
];

const weeklyData = [
  { week: "Jul 1-7", revenue: 1800 },
  { week: "Jul 8-14", revenue: 2200 },
  { week: "Jul 15-21", revenue: 2500 },
  { week: "Jul 22-28", revenue: 2300 },
];

const monthlyData = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 9500 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 10500 },
  { month: "May", revenue: 12000 },
  { month: "Jun", revenue: 11500 },
  { month: "Jul", revenue: 13000 },
];


const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState("weekly");

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData;
      case "weekly":
        return weeklyData;
      case "monthly":
        return monthlyData;
      default:
        return weeklyData;
    }
  };

  const data = getData();
  const dataKey = timeRange === 'daily' ? 'date' : timeRange === 'weekly' ? 'week' : 'month';

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Your earnings over time.</CardDescription>
            </div>
            <Select onValueChange={setTimeRange} value={timeRange}>
                <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKey} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
