import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Public pages
import PublicLayout from "./components/layout/PublicLayout";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Warehouses from "./pages/public/Warehouses";
import Pricing from "./pages/public/Pricing";
import Contact from "./pages/public/Contact";

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

// Customer pages
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CustomerProfile from "./pages/customer/CustomerProfile";
import SearchWarehouse from "./pages/customer/SearchWarehouse";
import MyBookings from "./pages/customer/MyBookings";
import MyContracts from "./pages/customer/MyContracts";
import Invoices from "./pages/customer/Invoices";
import Support from "./pages/customer/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/warehouses" element={<Warehouses />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          
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
          
          {/* Customer Routes */}
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/search" element={<SearchWarehouse />} />
          <Route path="/customer/bookings" element={<MyBookings />} />
          <Route path="/customer/contracts" element={<MyContracts />} />
          <Route path="/customer/invoices" element={<Invoices />} />
          <Route path="/customer/support" element={<Support />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
