import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import TopUp from "./TopUp";
import Withdraw from "./Withdraw";

const Balance = () => {
  const [balance, setBalance] = useState(100);
  const [isTopUpOpen, setTopUpOpen] = useState(false);
  const [isWithdrawOpen, setWithdrawOpen] = useState(false);

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Balance</h3>
          <span className="text-2xl font-bold text-primary">${balance}</span>
        </div>
        <div className="flex gap-4">
          <Button className="flex-1" onClick={() => setTopUpOpen(true)}>Add Funds</Button>
          <Button className="flex-1" variant="outline" onClick={() => setWithdrawOpen(true)}>Withdraw</Button>
        </div>
      </Card>
      <TopUp open={isTopUpOpen} onOpenChange={setTopUpOpen} setBalance={setBalance} />
      <Withdraw open={isWithdrawOpen} onOpenChange={setWithdrawOpen} setBalance={setBalance} balance={balance} />
    </>
  );
};

export default Balance;
