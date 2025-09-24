import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PinCodeValidator from "@/components/PinCodeValidator";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);

  const handleServiceableChange = (isAvailable: boolean) => {
    setIsServiceable(isAvailable);
  };

  const handleNext = () => {
    navigate("/customer/edit-profile");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => navigate('/auth')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Check Service Availability</h1>
        </div>

        <Card className="service-card p-6 animate-fade-in">
          <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-lg font-medium">Where are you located?</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your PIN code to check if we serve your area.
                </p>
            </div>

            <PinCodeValidator onServiceableChange={handleServiceableChange} />
            
            {isServiceable === true && (
                 <div className="text-center p-4 mt-4 rounded-lg bg-green-500/10 text-green-600 animate-fade-in">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">Great! Your area is serviceable.</p>
                    <p className="text-sm">Click next to setup your profile.</p>
                    <Button onClick={handleNext} className="mt-4">
                        Next <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </div>
            )}
            
            {isServiceable === false && (
                 <div className="text-center p-4 mt-4 rounded-lg bg-destructive/10 text-destructive animate-fade-in">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-medium">We're not in your area yet!</p>
                    <p className="text-sm">We're working hard to expand our services. Please check back later.</p>
                </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;
