import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { OrdersProvider } from "@/hooks/use-orders";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import CustomerDashboard from "./pages/customer/Dashboard";
import BookService from "./pages/customer/BookService";
import CustomerOrders from "./pages/customer/Orders";
import CustomerProfile from "./pages/customer/Profile";
import CustomerOffers from "./pages/customer/Offers";
import LaundererDashboard from "./pages/launderer/Dashboard";
import LaundererOrders from "./pages/launderer/Orders";
import LaundererProfile from "./pages/launderer/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Welcome /> : <Navigate to="/role-selection" />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      
      <Route element={<ProtectedRoute role="customer" />}>
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/book" element={<BookService />} />
        <Route path="/customer/orders" element={<CustomerOrders />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/customer/offers" element={<CustomerOffers />} />
      </Route>
      
      <Route element={<ProtectedRoute role="launderer" />}>
        <Route path="/launderer/dashboard" element={<LaundererDashboard />} />
        <Route path="/launderer/orders" element={<LaundererOrders />} />
        <Route path="/launderer/profile" element={<LaundererProfile />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <OrdersProvider>
            <AppRoutes />
          </OrdersProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
