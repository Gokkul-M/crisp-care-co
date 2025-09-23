import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Shirt, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Role = 'customer' | 'launderer';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('userRole', selectedRole);
      if (selectedRole === 'customer') {
        navigate('/customer/dashboard');
      } else if (selectedRole === 'launderer') {
        navigate('/launderer/dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="mobile-container py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2"
            onClick={() => navigate('/auth')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Choose Your Role</h1>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium mb-2">How will you use CleanCare?</h2>
            <p className="text-sm text-muted-foreground">
              Select the option that best describes you
            </p>
          </div>

          {/* Customer Role */}
          <Card 
            className={`role-card cursor-pointer ${selectedRole === 'customer' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('customer')}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-base">I'm a Customer</h3>
                  {selectedRole === 'customer' && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I want to book laundry services and get my clothes picked up and delivered
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Book Services
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Track Orders
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Manage Profile
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Launderer Role */}
          <Card 
            className={`role-card cursor-pointer ${selectedRole === 'launderer' ? 'selected' : ''}`}
            onClick={() => setSelectedRole('launderer')}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shirt className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-base">I'm a Launderer</h3>
                  {selectedRole === 'launderer' && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce-in">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I provide laundry services and want to manage orders and grow my business
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Manage Orders
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Track Revenue
                  </span>
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                    Set Availability
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className="service-button mt-8"
          >
            Continue as {selectedRole === 'customer' ? 'Customer' : selectedRole === 'launderer' ? 'Launderer' : '...'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
