import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotServiceable = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate('/role-selection')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Service Area</h1>
        </div>

        <Card className="service-card p-6 animate-fade-in text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
            <h2 className="text-lg font-medium mb-2">We're Not in Your Area Yet!</h2>
            <p className="text-sm text-muted-foreground mb-6">
                We're working hard to expand our services and hope to be in your neighborhood soon. Please check back later!
            </p>
            <Button onClick={() => navigate('/')} className="w-full">
                Back to Home
            </Button>
        </Card>
      </div>
    </div>
  );
};

export default NotServiceable;
