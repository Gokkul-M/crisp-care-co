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
import AdminLayout from "./pages/admin/AdminLayout";
import CustomersPage from "./pages/admin/Customers";
import LaunderersPage from "./pages/admin/Launderers";
import PricingPage from "./pages/admin/Pricing";
import AnalyticsPage from "./pages/admin/Analytics";
import CartPage from "./pages/customer/Cart";
import SchedulerPage from "./pages/customer/Scheduler";
import LiveTrackingPage from "./pages/customer/LiveTracking";
import OrderHistoryPage from "./pages/customer/OrderHistory";
import InventoryPage from "./pages/launderer/Inventory";
import DisputesPage from "./pages/launderer/Disputes";

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
        <Route element={<CustomerLayout />}>
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/book" element={<BookService />} />
          <Route path="/customer/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/customer/payment" element={<Payment />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />
          <Route path="/customer/order/:orderId" element={<CustomerOrderDetails />} />
          <Route path="/customer/settings" element={<CustomerSettings />} />
          <Route path="/customer/notification-settings" element={<NotificationSettingsPage />} />
          <Route path="/customer/language-settings" element={<LanguageSettingsPage />} />
          <Route path="/customer/offers" element={<CustomerOffers />} />
          <Route path="/customer/edit-profile" element={<EditProfile />} />
          <Route path="/customer/search" element={<Search />} />
          <Route path="/customer/cart" element={<CartPage />} />
          <Route path="/customer/scheduler" element={<SchedulerPage />} />
          <Route path="/customer/tracking" element={<LiveTrackingPage />} />
          <Route path="/customer/order-history" element={<OrderHistoryPage />} />
        </Route>
      </Route>
      
      <Route element={<ProtectedRoute role="launderer" />}>
        <Route element={<LaundererLayout />}>
          <Route path="/launderer/dashboard" element={<LaundererDashboard />} />
          <Route path="/launderer/orders" element={<LaundererOrders />} />
          <Route path="/launderer/orders/:orderId" element={<OrderDetails />} />
          <Route path="/launderer/settings" element={<LaundererSettingsPage />} />
          <Route path="/launderer/new-order" element={<NewOrder />} />
          <Route path="/launderer/revenue" element={<Revenue />} />
          <Route path="/launderer/dispute" element={<Dispute />} />
          <Route path="/launderer/inventory" element={<InventoryPage />} />
          <Route path="/launderer/disputes" element={<DisputesPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute role="admin" />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/customers" element={<CustomersPage />} />
          <Route path="/admin/launderers" element={<LaunderersPage />} />
          <Route path="/admin/pricing" element={<PricingPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
        </Route>
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
