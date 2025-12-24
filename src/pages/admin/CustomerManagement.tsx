import { useState } from "react";
import { Search, Eye, Lock, Unlock, History } from "lucide-react";
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

const mockCustomers = [
  { id: 1, name: "Công ty TNHH ABC", email: "contact@abc.vn", phone: "0901234567", totalContracts: 3, status: "active" },
  { id: 2, name: "Công ty CP XYZ", email: "info@xyz.com", phone: "0909876543", totalContracts: 5, status: "active" },
  { id: 3, name: "Cửa hàng Minh Phát", email: "minhphat@gmail.com", phone: "0912345678", totalContracts: 1, status: "blocked" },
  { id: 4, name: "Công ty Logistics DEF", email: "def@logistics.vn", phone: "0987654321", totalContracts: 8, status: "active" },
];

const CustomerManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Hoạt động</Badge>;
      case "blocked":
        return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Đã khóa</Badge>;
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
            <span className="text-foreground font-medium">Quản lý Khách hàng</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Quản lý Khách hàng</h1>
            <p className="text-muted-foreground mt-1">Danh sách và thông tin khách hàng</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <CardTitle>Danh sách Khách hàng</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
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
                    <TableHead>Tên khách hàng</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Số điện thoại</TableHead>
                    <TableHead>Số hợp đồng</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.totalContracts}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon"><History className="h-4 w-4" /></Button>
                          {customer.status === "active" ? (
                            <Button variant="ghost" size="icon" className="text-destructive"><Lock className="h-4 w-4" /></Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="text-green-600"><Unlock className="h-4 w-4" /></Button>
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

export default CustomerManagement;
