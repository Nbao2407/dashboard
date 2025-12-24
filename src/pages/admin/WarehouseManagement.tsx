import { useState } from "react";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
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

const mockWarehouses = [
  { id: 1, name: "Kho Bình Dương A1", address: "KCN VSIP, Bình Dương", capacity: 5000, used: 3200, status: "active" },
  { id: 2, name: "Kho Long An B2", address: "KCN Long Hậu, Long An", capacity: 8000, used: 7500, status: "active" },
  { id: 3, name: "Kho Đồng Nai C3", address: "KCN Nhơn Trạch, Đồng Nai", capacity: 3000, used: 0, status: "maintenance" },
  { id: 4, name: "Kho TP.HCM D4", address: "Quận 7, TP.HCM", capacity: 2000, used: 1800, status: "active" },
];

const WarehouseManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Quản lý Kho</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Quản lý Kho</h1>
              <p className="text-muted-foreground mt-1">Danh sách và quản lý tất cả kho hàng</p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm kho mới
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <CardTitle>Danh sách Kho</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm kho..."
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
                    <TableHead>Tên kho</TableHead>
                    <TableHead>Địa chỉ</TableHead>
                    <TableHead>Sức chứa</TableHead>
                    <TableHead>Đã sử dụng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockWarehouses.map((wh) => (
                    <TableRow key={wh.id}>
                      <TableCell className="font-medium">{wh.name}</TableCell>
                      <TableCell>{wh.address}</TableCell>
                      <TableCell>{wh.capacity.toLocaleString()} m²</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(wh.used / wh.capacity) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.round((wh.used / wh.capacity) * 100)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(wh.status)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
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

export default WarehouseManagement;
