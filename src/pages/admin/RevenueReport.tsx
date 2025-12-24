import { useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, FileText, Calendar } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { WarehouseChart } from "@/components/dashboard/WarehouseChart";

const RevenueReport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="page-container">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Báo cáo Doanh thu</span>
          </div>

          <div className="section-header">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Báo cáo Doanh thu</h1>
              <p className="text-muted-foreground mt-1">Thống kê doanh thu và hiệu suất kinh doanh</p>
            </div>
            <Button className="gap-2 rounded-md">
              <Download className="h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Doanh thu tháng"
              value="2.4 tỷ"
              icon={DollarSign}
              trend={{ value: 12, isPositive: true }}
              variant="primary"
            />
            <StatCard
              title="Doanh thu quý"
              value="7.2 tỷ"
              icon={TrendingUp}
              trend={{ value: 8, isPositive: true }}
              variant="success"
            />
            <StatCard
              title="Hợp đồng mới"
              value="24"
              icon={FileText}
              trend={{ value: 5, isPositive: true }}
              variant="info"
            />
            <StatCard
              title="Hợp đồng hết hạn"
              value="8"
              icon={Calendar}
              trend={{ value: 2, isPositive: false }}
              variant="warning"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doanh thu theo tháng</CardTitle>
              </CardHeader>
              <CardContent>
                <WarehouseChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Thống kê chi tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="card-section flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Tổng doanh thu năm</p>
                    <p className="text-2xl font-bold">28.5 tỷ VND</p>
                  </div>
                  <div className="stat-icon-container bg-success/10">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                </div>
                <div className="card-section flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Chi phí vận hành</p>
                    <p className="text-2xl font-bold">4.2 tỷ VND</p>
                  </div>
                  <div className="stat-icon-container bg-destructive/10">
                    <TrendingDown className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <div className="card-section flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Lợi nhuận ròng</p>
                    <p className="text-2xl font-bold">24.3 tỷ VND</p>
                  </div>
                  <div className="stat-icon-container bg-primary/10">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RevenueReport;
