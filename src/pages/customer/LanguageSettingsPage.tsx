import LanguageSelection from "@/components/LanguageSelection";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LanguageSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-subtle pb-24">
      <div className="mobile-container py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate('/customer/settings')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Language</h1>
        </div>
        <LanguageSelection />
      </div>
    </div>
  );
};

export default LanguageSettingsPage;
