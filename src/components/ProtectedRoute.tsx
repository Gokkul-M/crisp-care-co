import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role: 'customer' | 'launderer';
}

// Mock authentication
const isAuthenticated = true;
const userRole = 'launderer'; // or 'launderer'

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
