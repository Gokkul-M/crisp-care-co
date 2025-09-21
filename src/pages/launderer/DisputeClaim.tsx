
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Camera } from "lucide-react";

const DisputeClaim = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Report a Dispute/Claim</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a New Claim</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input id="orderId" placeholder="e.g., CC001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item">Item(s)</Label>
                <Input id="item" placeholder="e.g., Shirt, Jeans" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Issue</Label>
              <Textarea id="description" placeholder="Describe the damage, loss, or other issue..." className="min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <Label>Attach Photos</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG, or GIF (MAX. 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div> 
            </div>

            <Button type="submit" className="w-full">Submit Claim</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DisputeClaim;
