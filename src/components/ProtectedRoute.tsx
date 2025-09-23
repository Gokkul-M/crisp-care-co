import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  role: 'customer' | 'launderer';
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const isAuthenticated = !!localStorage.getItem('userRole');
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated || userRole !== role) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
