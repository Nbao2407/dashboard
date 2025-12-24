import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import WarehouseManagement from "./pages/admin/WarehouseManagement";
import BookingManagement from "./pages/admin/BookingManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import StaffManagement from "./pages/admin/StaffManagement";
import RevenueReport from "./pages/admin/RevenueReport";
import SystemSettings from "./pages/admin/SystemSettings";

// Staff pages
import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffWarehouse from "./pages/staff/StaffWarehouse";
import StaffBookings from "./pages/staff/StaffBookings";
import CheckInOut from "./pages/staff/CheckInOut";
import Inventory from "./pages/staff/Inventory";
import Maintenance from "./pages/staff/Maintenance";
import StaffReports from "./pages/staff/StaffReports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/warehouses" element={<WarehouseManagement />} />
          <Route path="/admin/bookings" element={<BookingManagement />} />
          <Route path="/admin/customers" element={<CustomerManagement />} />
          <Route path="/admin/staff" element={<StaffManagement />} />
          <Route path="/admin/revenue" element={<RevenueReport />} />
          <Route path="/admin/settings" element={<SystemSettings />} />
          
          {/* Staff Routes */}
          <Route path="/staff" element={<StaffDashboard />} />
          <Route path="/staff/warehouse" element={<StaffWarehouse />} />
          <Route path="/staff/bookings" element={<StaffBookings />} />
          <Route path="/staff/checkin" element={<CheckInOut />} />
          <Route path="/staff/inventory" element={<Inventory />} />
          <Route path="/staff/maintenance" element={<Maintenance />} />
          <Route path="/staff/reports" element={<StaffReports />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
