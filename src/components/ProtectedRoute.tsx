import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role: 'customer' | 'launderer';
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
