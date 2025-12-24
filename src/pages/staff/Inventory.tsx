import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Package } from "lucide-react";
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

const mockInventory = [
  { id: 1, sku: "SP001", name: "Thùng carton 60x40x40", warehouse: "Kho Bình Dương A1", quantity: 500, status: "ok" },
  { id: 2, sku: "SP002", name: "Pallet gỗ tiêu chuẩn", warehouse: "Kho Long An B2", quantity: 120, status: "ok" },
  { id: 3, sku: "SP003", name: "Màng co PE", warehouse: "Kho Bình Dương A1", quantity: 25, status: "low" },
  { id: 4, sku: "SP004", name: "Thùng nhựa xếp chồng", warehouse: "Kho Long An B2", quantity: 0, status: "out" },
];

const Inventory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Đủ hàng</Badge>;
      case "low":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Sắp hết</Badge>;
      case "out":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Hết hàng</Badge>;
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
            <span className="text-foreground font-medium">Kiểm kê hàng hóa</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Kiểm kê hàng hóa</h1>
            <p className="text-muted-foreground mt-1">Kiểm tra và báo cáo tình trạng hàng tồn</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Đủ hàng</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Sắp hết</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Package className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Hết hàng</p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <CardTitle>Danh sách hàng hóa</CardTitle>
                <div className="flex gap-2">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm sản phẩm..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">Báo cáo sự cố</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã SKU</TableHead>
                    <TableHead>Tên sản phẩm</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.sku}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.warehouse}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
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

export default Inventory;
