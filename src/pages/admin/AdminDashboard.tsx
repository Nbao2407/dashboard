import { useState } from "react";
import { Package, Truck, AlertTriangle, TrendingUp, Users, FileText, DollarSign } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { WarehouseChart } from "@/components/dashboard/WarehouseChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Dashboard Admin</span>
          </div>

          <div>
            <h1 className="text-heading-xl">Tổng quan Hệ thống</h1>
            <p className="text-body text-muted-foreground mt-1">Quản lý và giám sát toàn bộ hệ thống kho</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Tổng số Kho"
              value="24"
              icon={Package}
              trend={{ value: 2, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Đơn thuê chờ duyệt"
              value="18"
              icon={FileText}
              trend={{ value: 5, isPositive: true }}
              variant="info"
            />
            <StatCard
              title="Khách hàng"
              value="156"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
              variant="success"
            />
            <StatCard
              title="Doanh thu tháng"
              value="2.4 tỷ"
              icon={DollarSign}
              trend={{ value: 8, isPositive: true }}
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WarehouseChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
