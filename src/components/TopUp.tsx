import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TopUpProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setBalance: (balance: (prev: number) => number) => void;
}

const TopUp: React.FC<TopUpProps> = ({ open, onOpenChange, setBalance }) => {
  const [amount, setAmount] = useState("");

  const handleTopUp = () => {
    const topUpAmount = parseInt(amount, 10);
    if (topUpAmount > 0) {
      setBalance(prev => prev + topUpAmount);
      alert(`$${topUpAmount} added to your balance.`);
      onOpenChange(false);
      setAmount("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funds</DialogTitle>
          <DialogDescription>
            Enter the amount you want to add to your balance.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleTopUp}>Add Funds</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TopUp;
