import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";

const NewOrder = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Create a New Order</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>New Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input id="customerName" placeholder="e.g., John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerPhone">Customer Phone</Label>
                <Input id="customerPhone" placeholder="e.g., 555-1234" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="e.g., 123 Main St, Anytown USA" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="items">Items</Label>
              <Textarea id="items" placeholder="e.g., 5 shirts, 2 pairs of jeans" />
            </div>

            <Button type="submit" className="w-full">Create Order</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewOrder;
