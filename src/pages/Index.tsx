import { useState } from "react";
import { Package, DollarSign, Target, Clock, AlertTriangle } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { InventoryTable } from "@/components/dashboard/InventoryTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WarehouseChart } from "@/components/dashboard/WarehouseChart";
import { CapacityGuide } from "@/components/dashboard/CapacityGuide";
import { RevenueByLocation } from "@/components/dashboard/RevenueByLocation";

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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
              title="Total Stock"
              value="23,340 Units"
              icon={Package}
              trend={{ value: 25, isPositive: true }}
              variant="green"
            />
            <StatCard
              title="Total Inventory Value"
              value="$23,56847"
              icon={DollarSign}
              trend={{ value: 25, isPositive: true }}
              variant="yellow"
            />
            <StatCard
              title="Total Picking Accuracy"
              value="90%"
              icon={Target}
              trend={{ value: 5, isPositive: true }}
              variant="blue"
              showProgress
              progressValue={90}
            />
            <StatCard
              title="Pending Orders"
              value="7350"
              icon={Clock}
              trend={{ value: 7, isPositive: true }}
              variant="orange"
            />
            <StatCard
              title="Low Stock Item"
              value="152 Unit"
              icon={AlertTriangle}
              trend={{ value: 10, isPositive: false }}
              variant="red"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WarehouseChart />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <RevenueByLocation />
              <CapacityGuide />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <InventoryTable />
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
