import { useState } from "react";
import { Search, Eye, Check } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StaffSidebar } from "@/components/dashboard/StaffSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const mockBookings = [
  { id: "DT-001", customer: "Công ty TNHH ABC", warehouse: "Kho Bình Dương A1", startDate: "2024-01-15", status: "pending_handover" },
  { id: "DT-002", customer: "Công ty CP XYZ", warehouse: "Kho Long An B2", startDate: "2024-02-01", status: "active" },
  { id: "DT-003", customer: "Cửa hàng Minh Phát", warehouse: "Kho Bình Dương A1", startDate: "2024-03-01", status: "pending_handover" },
];

const StaffBookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_handover":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Chờ bàn giao</Badge>;
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Đang thuê</Badge>;
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
            <span className="text-foreground font-medium">Quản lý Đơn thuê</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Quản lý Đơn thuê</h1>
            <p className="text-muted-foreground mt-1">Xử lý và bàn giao đơn thuê kho</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <CardTitle>Danh sách Đơn thuê</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm đơn thuê..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Ngày bắt đầu</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.customer}</TableCell>
                      <TableCell>{booking.warehouse}</TableCell>
                      <TableCell>{booking.startDate}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          {booking.status === "pending_handover" && (
                            <Button variant="ghost" size="icon" className="text-green-600"><Check className="h-4 w-4" /></Button>
                          )}
                        </div>
                      </TableCell>
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

export default StaffBookings;
