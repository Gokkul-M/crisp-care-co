import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate a successful payment
    alert("Payment Successful!");
    navigate("/customer/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Gateway</h2>
        <div className="space-y-4">
          <p>This is a simulated payment gateway. Click the button below to complete the payment.</p>
        </div>
        <Button className="w-full mt-6" onClick={handlePayment}>
          Pay Now
        </Button>
      </Card>
    </div>
  );
};

export default Payment;
