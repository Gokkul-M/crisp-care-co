import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface WithdrawProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  setBalance: (balance: (prev: number) => number) => void;
  balance: number;
}

const Withdraw: React.FC<WithdrawProps> = ({ open, onOpenChange, setBalance, balance }) => {
  const [amount, setAmount] = useState("");

  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount, 10);
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(prev => prev - withdrawAmount);
      alert(`$${withdrawAmount} withdrawn from your balance.`);
      onOpenChange(false);
      setAmount("");
    } else {
      alert("Invalid withdrawal amount.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Withdraw Funds</DialogTitle>
          <DialogDescription>
            Enter the amount you want to withdraw from your balance.
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
          <Button onClick={handleWithdraw}>Withdraw</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Withdraw;
