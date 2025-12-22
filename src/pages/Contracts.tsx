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
  FileText,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const contractsData = [
  { id: "HD001", customer: "Công ty TNHH ABC", warehouse: "Kho Hà Nội", startDate: "01/01/2024", endDate: "31/12/2024", value: "500,000,000 ₫", status: "Đang hiệu lực" },
  { id: "HD002", customer: "Công ty CP XYZ", warehouse: "Kho Đà Nẵng", startDate: "15/02/2024", endDate: "14/02/2025", value: "750,000,000 ₫", status: "Đang hiệu lực" },
  { id: "HD003", customer: "Công ty TNHH DEF", warehouse: "Kho TP.HCM", startDate: "01/03/2024", endDate: "28/02/2025", value: "1,200,000,000 ₫", status: "Đang hiệu lực" },
  { id: "HD004", customer: "Công ty CP GHI", warehouse: "Kho Hải Phòng", startDate: "01/06/2023", endDate: "31/05/2024", value: "300,000,000 ₫", status: "Hết hạn" },
  { id: "HD005", customer: "Công ty TNHH JKL", warehouse: "Kho Cần Thơ", startDate: "01/04/2024", endDate: "31/03/2025", value: "450,000,000 ₫", status: "Chờ ký" },
];

const Contracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang hiệu lực":
        return "default";
      case "Hết hạn":
        return "destructive";
      case "Chờ ký":
        return "secondary";
      default:
        return "outline";
    }
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
            <span className="text-foreground">Hợp đồng</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Quản lý hợp đồng</h1>
                <p className="text-sm text-muted-foreground">Quản lý tất cả hợp đồng thuê kho</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm hợp đồng
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm hợp đồng..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang hiệu lực</SelectItem>
                <SelectItem value="expired">Hết hạn</SelectItem>
                <SelectItem value="pending">Chờ ký</SelectItem>
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
                  <TableHead>Mã HĐ</TableHead>
                  <TableHead>Khách hàng</TableHead>
                  <TableHead>Kho</TableHead>
                  <TableHead>Ngày bắt đầu</TableHead>
                  <TableHead>Ngày kết thúc</TableHead>
                  <TableHead>Giá trị</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractsData.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.customer}</TableCell>
                    <TableCell>{contract.warehouse}</TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell>{contract.value}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(contract.status)}>
                        {contract.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t">
              <p className="text-sm text-muted-foreground">
                Hiển thị 1-5 trong tổng số 5 hợp đồng
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

export default Contracts;
