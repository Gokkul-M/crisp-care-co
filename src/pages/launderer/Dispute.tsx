import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload } from "lucide-react";

const Dispute = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">File a Dispute/Claim</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dispute Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID</Label>
              <Input id="orderId" placeholder="e.g., ORD001" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of Issue</Label>
              <Textarea id="description" placeholder="Please describe the issue in detail..." />
            </div>

            <div className="space-y-2">
              <Label>Attachments</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Drag & drop files here, or click to upload</p>
                <Input id="attachments" type="file" className="sr-only" multiple />
              </div>
            </div>

            <Button type="submit" className="w-full">Submit Claim</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dispute;
