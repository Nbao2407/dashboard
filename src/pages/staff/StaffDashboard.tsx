import { useState } from "react";
import { Package, FileText, Users, ClipboardList } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StaffSidebar } from "@/components/dashboard/StaffSidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StaffDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <StaffSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Dashboard Nhân viên</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Xin chào, Nhân viên</h1>
            <p className="text-muted-foreground mt-1">Quản lý kho được giao và các nhiệm vụ hàng ngày</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Kho phụ trách"
              value="2"
              icon={Package}
              variant="primary"
            />
            <StatCard
              title="Đơn thuê cần xử lý"
              value="5"
              icon={FileText}
              variant="info"
            />
            <StatCard
              title="Check-in hôm nay"
              value="12"
              icon={Users}
              variant="success"
            />
            <StatCard
              title="Công việc chờ"
              value="3"
              icon={ClipboardList}
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kho được giao</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kho Bình Dương A1</p>
                      <p className="text-sm text-muted-foreground">KCN VSIP, Bình Dương</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">Hoạt động</p>
                      <p className="text-sm text-muted-foreground">64% sử dụng</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Kho Long An B2</p>
                      <p className="text-sm text-muted-foreground">KCN Long Hậu, Long An</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">Hoạt động</p>
                      <p className="text-sm text-muted-foreground">94% sử dụng</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDashboard;
