import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'customer' | 'launderer') => {
    login(role);
    if (role === 'customer') {
      navigate('/customer/dashboard');
    } else {
      navigate('/launderer/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Select Your Role</CardTitle>
          <CardDescription>Choose how you want to use the application.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => handleLogin('customer')}>
            <User className="h-8 w-8" />
            <span className="text-lg">Customer</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center space-y-2" onClick={() => handleLogin('launderer')}>
            <Shield className="h-8 w-8" />
            <span className="text-lg">Launderer</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelection;
