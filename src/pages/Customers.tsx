import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter,
  Users,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const customersData = [
  { id: "KH001", name: "Công ty TNHH ABC", contact: "Nguyễn Văn A", email: "contact@abc.vn", phone: "0901234567", contracts: 3, status: "Đang hợp tác" },
  { id: "KH002", name: "Công ty CP XYZ", contact: "Trần Thị B", email: "info@xyz.vn", phone: "0912345678", contracts: 2, status: "Đang hợp tác" },
  { id: "KH003", name: "Công ty TNHH DEF", contact: "Lê Văn C", email: "sales@def.vn", phone: "0923456789", contracts: 1, status: "Đang hợp tác" },
  { id: "KH004", name: "Công ty CP GHI", contact: "Phạm Thị D", email: "admin@ghi.vn", phone: "0934567890", contracts: 0, status: "Ngừng hợp tác" },
  { id: "KH005", name: "Công ty TNHH JKL", contact: "Hoàng Văn E", email: "business@jkl.vn", phone: "0945678901", contracts: 1, status: "Tiềm năng" },
];

const Customers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang hợp tác":
        return "default";
      case "Ngừng hợp tác":
        return "destructive";
      case "Tiềm năng":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Trang chủ</span>
            <span>/</span>
            <span className="text-foreground">Khách hàng</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Quản lý khách hàng</h1>
                <p className="text-sm text-muted-foreground">Quản lý thông tin khách hàng</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm khách hàng
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm khách hàng..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hợp tác</SelectItem>
                <SelectItem value="inactive">Ngừng hợp tác</SelectItem>
                <SelectItem value="potential">Tiềm năng</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Lọc
            </Button>
          </div>

          {/* Table */}
          <div className="border rounded-lg bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Số HĐ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customersData.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.contact}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {customer.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </TableCell>
                    <TableCell>{customer.contracts}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(customer.status)}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-muted-foreground">
                Hiển thị 1-5 trong tổng số 5 khách hàng
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Customers;
