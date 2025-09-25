import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Welcome from "./pages/Welcome";
import Auth from "./pages/auth";
import RoleSelection from "./pages/RoleSelection";
import ProfileSetup from "./pages/ProfileSetup";
import NotServiceable from "./pages/NotServiceable";
import CustomerDashboard from "./pages/customer/Dashboard";
import BookService from "./pages/customer/BookService";
import CustomerOrders from "./pages/customer/Orders";
import CustomerOrderDetails from "./pages/customer/OrderDetails";
import CustomerOffers from "./pages/customer/Offers";
import EditProfile from "./pages/customer/EditProfile";
import Search from "./pages/customer/Search";
import LaundererDashboard from "./pages/launderer/Dashboard";
import LaundererOrders from "./pages/launderer/Orders";
import OrderDetails from "./pages/launderer/OrderDetails";
import NewOrder from "./pages/launderer/NewOrder";
import Revenue from "./pages/launderer/Revenue";
import Dispute from "./pages/launderer/Dispute";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import CustomerLayout from "@/components/CustomerLayout";
import LaundererLayout from "@/pages/launderer/LaundererLayout";
import CustomerSettings from "@/pages/Settings";
import LaundererSettingsPage from "@/pages/launderer/Settings";
import OrderConfirmation from "./pages/customer/OrderConfirmation";
import Payment from "./pages/customer/Payment";
import NotificationSettingsPage from "./pages/customer/NotificationSettingsPage";
import LanguageSettingsPage from "./pages/customer/LanguageSettingsPage";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      <Route path="/profile-setup" element={<ProfileSetup />} />
      <Route path="/not-serviceable" element={<NotServiceable />} />

      <Route element={<ProtectedRoute role="customer" />}>
        <Route 
          path="/customer/dashboard" 
          element={<CustomerLayout><CustomerDashboard /></CustomerLayout>} 
        />
        <Route 
          path="/customer/book" 
          element={<CustomerLayout><BookService /></CustomerLayout>} 
        />
        <Route 
          path="/customer/order-confirmation" 
          element={<CustomerLayout><OrderConfirmation /></CustomerLayout>} 
        />
        <Route 
          path="/customer/payment" 
          element={<CustomerLayout><Payment /></CustomerLayout>} 
        />
        <Route 
          path="/customer/orders" 
          element={<CustomerLayout><CustomerOrders /></CustomerLayout>} 
        />
        <Route 
          path="/customer/order/:orderId" 
          element={<CustomerLayout><CustomerOrderDetails /></CustomerLayout>} 
        />
        <Route 
          path="/customer/settings" 
          element={<CustomerLayout><CustomerSettings /></CustomerLayout>} 
        />
        <Route 
          path="/customer/notification-settings" 
          element={<CustomerLayout><NotificationSettingsPage /></CustomerLayout>} 
        />
        <Route 
          path="/customer/language-settings" 
          element={<CustomerLayout><LanguageSettingsPage /></CustomerLayout>} 
        />
        <Route 
          path="/customer/offers" 
          element={<CustomerLayout><CustomerOffers /></CustomerLayout>} 
        />
        <Route 
          path="/customer/edit-profile" 
          element={<CustomerLayout><EditProfile /></CustomerLayout>} 
        />
        <Route 
          path="/customer/search" 
          element={<CustomerLayout><Search /></CustomerLayout>} 
        />
      </Route>
      
      <Route element={<ProtectedRoute role="launderer" />}>
        <Route path="/launderer/dashboard" element={<LaundererLayout><LaundererDashboard /></LaundererLayout>} />
        <Route path="/launderer/orders" element={<LaundererLayout><LaundererOrders /></LaundererLayout>} />
        <Route path="/launderer/orders/:orderId" element={<LaundererLayout><OrderDetails /></LaundererLayout>} />
        <Route path="/launderer/settings" element={<LaundererLayout><LaundererSettingsPage /></LaundererLayout>} />
        <Route path="/launderer/new-order" element={<LaundererLayout><NewOrder /></LaundererLayout>} />
        <Route path="/launderer/revenue" element={<LaundererLayout><Revenue /></LaundererLayout>} />
        <Route path="/launderer/dispute" element={<LaundererLayout><Dispute /></LaundererLayout>} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
