import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import { FileText, Search, Download, Eye } from "lucide-react";
import { toast } from "sonner";

const contractsData = [
  {
    id: "HD001",
    warehouse: "Kho A1 - Quận 7",
    startDate: "01/01/2025",
    endDate: "01/07/2025",
    value: "150,000,000đ",
    status: "Đang hiệu lực",
    signedDate: "28/12/2024",
  },
  {
    id: "HD002",
    warehouse: "Kho B2 - Quận 9",
    startDate: "15/01/2025",
    endDate: "15/07/2025",
    value: "312,000,000đ",
    status: "Chờ ký",
    signedDate: "-",
  },
  {
    id: "HD003",
    warehouse: "Kho C3 - Thủ Đức",
    startDate: "01/06/2024",
    endDate: "01/12/2024",
    value: "576,000,000đ",
    status: "Đã kết thúc",
    signedDate: "25/05/2024",
  },
];

const MyContracts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang hiệu lực": return "default";
      case "Chờ ký": return "secondary";
      case "Đã kết thúc": return "outline";
      default: return "outline";
    }
  };

  const handleDownload = (id: string) => {
    toast.success(`Đang tải hợp đồng ${id}...`);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-foreground">Hợp đồng của tôi</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hợp đồng của tôi</h1>
              <p className="text-sm text-muted-foreground">Quản lý các hợp đồng thuê kho</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-muted-foreground">Tổng hợp đồng</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-sm text-muted-foreground">Đang hiệu lực</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-500">1</p>
                <p className="text-sm text-muted-foreground">Chờ ký</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
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
                <SelectItem value="pending">Chờ ký</SelectItem>
                <SelectItem value="expired">Đã kết thúc</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã HĐ</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Thời hạn</TableHead>
                    <TableHead>Giá trị</TableHead>
                    <TableHead>Ngày ký</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contractsData.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell className="font-medium">{contract.id}</TableCell>
                      <TableCell>{contract.warehouse}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{contract.startDate}</p>
                          <p className="text-muted-foreground">đến {contract.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{contract.value}</TableCell>
                      <TableCell>{contract.signedDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(contract.status)}>
                          {contract.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(contract.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
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

export default MyContracts;
