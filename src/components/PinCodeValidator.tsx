import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface PinCodeValidatorProps {
  onServiceableChange: (isServiceable: boolean) => void;
}

const PinCodeValidator = ({ onServiceableChange }: PinCodeValidatorProps) => {
  const [pinCode, setPinCode] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckAvailability = () => {
    setIsChecking(true);
    setTimeout(() => {
      const serviceablePinCodes = ["110011", "122001", "122002", "122018", "602105"];
      const isAvailable = serviceablePinCodes.includes(pinCode);
      
      onServiceableChange(isAvailable);
      setIsChecking(false);
      
      if (!isAvailable) {
        toast.error("Sorry, we do not currently service your area.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input 
          type="text" 
          placeholder="Enter your PIN code"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          maxLength={6}
          className="mobile-input"
        />
        <Button 
          onClick={handleCheckAvailability}
          disabled={isChecking || pinCode.length !== 6}
        >
          {isChecking ? "Checking..." : "Check"}
        </Button>
      </div>
    </div>
  );
};

export default PinCodeValidator;
