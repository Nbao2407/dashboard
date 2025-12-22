import { useState } from "react";
import { Package, Truck, AlertTriangle, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WarehouseChart } from "@/components/dashboard/WarehouseChart";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          {/* Page Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Warehouse Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor your inventory, orders, and shipments</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Items"
              value="12,847"
              icon={Package}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Pending Orders"
              value="284"
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
              variant="info"
            />
            <StatCard
              title="Shipments Today"
              value="47"
              icon={Truck}
              trend={{ value: 4, isPositive: false }}
              variant="success"
            />
            <StatCard
              title="Low Stock Items"
              value="12"
              icon={AlertTriangle}
              variant="warning"
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WarehouseChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>

          {/* Inventory Table */}
          <InventoryTable />
        </main>
      </div>
    </div>
  );
};

export default Index;
