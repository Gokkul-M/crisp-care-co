import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CustomerSettings = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Card className="p-4">
        <Button variant="destructive" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Card>
    </div>
  );
};

export default CustomerSettings;
