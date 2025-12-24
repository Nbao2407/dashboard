import { useState } from "react";
import { Plus, Calendar, Wrench, CheckCircle, Clock } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StaffSidebar } from "@/components/dashboard/StaffSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockMaintenance = [
  { id: 1, warehouse: "Kho Bình Dương A1", task: "Bảo trì hệ thống PCCC", date: "2024-01-20", status: "completed" },
  { id: 2, warehouse: "Kho Long An B2", task: "Kiểm tra hệ thống điện", date: "2024-01-25", status: "scheduled" },
  { id: 3, warehouse: "Kho Bình Dương A1", task: "Bảo dưỡng cửa cuốn", date: "2024-02-01", status: "scheduled" },
  { id: 4, warehouse: "Kho Long An B2", task: "Vệ sinh kho", date: "2024-01-18", status: "completed" },
];

const Maintenance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Hoàn thành</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">Đã lên lịch</Badge>;
      case "in_progress":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Đang thực hiện</Badge>;
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
            <span className="text-foreground font-medium">Bảo trì kho</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-heading-xl">Bảo trì kho</h1>
              <p className="text-body text-muted-foreground mt-1">Lên lịch và theo dõi công việc bảo trì</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Lên lịch bảo trì
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Đã lên lịch</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-sm text-muted-foreground">Đang thực hiện</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">18</p>
                  <p className="text-sm text-muted-foreground">Hoàn thành</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading">Lịch sử bảo trì</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kho</TableHead>
                    <TableHead>Công việc</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMaintenance.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.warehouse}</TableCell>
                      <TableCell>{item.task}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Maintenance;
