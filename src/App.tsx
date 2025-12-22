import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Warehouse from "./pages/Warehouse";
import Contracts from "./pages/Contracts";
import Customers from "./pages/Customers";
import WarehouseMap from "./pages/WarehouseMap";
import Regions from "./pages/Regions";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/warehouse-map" element={<WarehouseMap />} />
          <Route path="/regions" element={<Regions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
