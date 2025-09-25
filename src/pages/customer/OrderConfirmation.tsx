import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/customer/payment");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Order Confirmation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Selected Services</h3>
            <p>Wash & Fold, Dry Cleaning</p>
          </div>
          <div>
            <h3 className="font-semibold">Pickup & Delivery</h3>
            <p>123 Main St, Anytown, USA</p>
          </div>
          <div>
            <h3 className="font-semibold">Total Amount</h3>
            <p>$45.00</p>
          </div>
        </div>
        <Button className="w-full mt-6" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
