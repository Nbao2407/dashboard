import { useState } from "react";
import { Upload, Eye, Edit } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StaffSidebar } from "@/components/dashboard/StaffSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockAssignedWarehouses = [
  { id: 1, name: "Kho Bình Dương A1", address: "KCN VSIP, Bình Dương", capacity: 5000, used: 3200, status: "active" },
  { id: 2, name: "Kho Long An B2", address: "KCN Long Hậu, Long An", capacity: 8000, used: 7500, status: "active" },
];

const StaffWarehouse = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Hoạt động</Badge>;
      case "maintenance":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Bảo trì</Badge>;
      default:
        return <Badge variant="secondary">Không xác định</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Nhân viên</span>
            <span>/</span>
            <span className="text-foreground font-medium">Kho được giao</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Kho được giao</h1>
            <p className="text-muted-foreground mt-1">Thông tin và quản lý kho bạn được phân công</p>
          </div>

          <div className="grid gap-6">
            {mockAssignedWarehouses.map((wh) => (
              <Card key={wh.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{wh.name}</CardTitle>
                    {getStatusBadge(wh.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Địa chỉ</p>
                      <p className="font-medium">{wh.address}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Sức chứa</p>
                      <p className="font-medium">{wh.capacity.toLocaleString()} m²</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Đang sử dụng</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(wh.used / wh.capacity) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{Math.round((wh.used / wh.capacity) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Xem chi tiết
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Cập nhật trạng thái
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload hình ảnh
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffWarehouse;
