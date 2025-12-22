import { useState } from "react";
import { Filter, FileSpreadsheet, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const warehouseData = [
  { id: "WH001", name: "Kho Hà Nội", region: "Miền Bắc", type: "Kho chính", status: "Hoạt động", capacity: "85%" },
  { id: "WH002", name: "Kho TP.HCM", region: "Miền Nam", type: "Kho chính", status: "Hoạt động", capacity: "72%" },
  { id: "WH003", name: "Kho Đà Nẵng", region: "Miền Trung", type: "Kho phụ", status: "Hoạt động", capacity: "45%" },
  { id: "WH004", name: "Kho Cần Thơ", region: "Miền Nam", type: "Kho phụ", status: "Bảo trì", capacity: "0%" },
  { id: "WH005", name: "Kho Hải Phòng", region: "Miền Bắc", type: "Kho phụ", status: "Hoạt động", capacity: "68%" },
];

const statusStyles: Record<string, string> = {
  "Hoạt động": "bg-success/10 text-success border-success/20",
  "Bảo trì": "bg-warning/10 text-warning border-warning/20",
  "Ngừng hoạt động": "bg-destructive/10 text-destructive border-destructive/20",
};

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <DashboardSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">Trang chủ</span>
            <span>›</span>
            <span className="text-foreground font-medium">Danh sách kho</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Quản lý kho</h1>
              <p className="text-muted-foreground mt-1">
                Quản lý và theo dõi {warehouseData.length} kho hàng trên toàn hệ thống
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Xuất Excel
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary-dark">
                <Plus className="h-4 w-4" />
                Thêm kho mới
              </Button>
            </div>
          </div>

          {/* Filter Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Bộ lọc:</span>
                </div>
                
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Khu vực: Tất cả" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Khu vực: Tất cả</SelectItem>
                    <SelectItem value="north">Miền Bắc</SelectItem>
                    <SelectItem value="central">Miền Trung</SelectItem>
                    <SelectItem value="south">Miền Nam</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Loại kho: Tất cả" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Loại kho: Tất cả</SelectItem>
                    <SelectItem value="main">Kho chính</SelectItem>
                    <SelectItem value="sub">Kho phụ</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Trạng thái: Tất cả" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Trạng thái: Tất cả</SelectItem>
                    <SelectItem value="active">Hoạt động</SelectItem>
                    <SelectItem value="maintenance">Bảo trì</SelectItem>
                    <SelectItem value="inactive">Ngừng hoạt động</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Data Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">Mã kho</TableHead>
                    <TableHead className="font-semibold">Tên kho</TableHead>
                    <TableHead className="font-semibold">Khu vực</TableHead>
                    <TableHead className="font-semibold">Loại kho</TableHead>
                    <TableHead className="font-semibold">Trạng thái</TableHead>
                    <TableHead className="font-semibold text-right">Sức chứa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warehouseData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/30 cursor-pointer">
                      <TableCell className="font-mono text-sm font-medium text-primary">{item.id}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-muted-foreground">{item.region}</TableCell>
                      <TableCell className="text-muted-foreground">{item.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={statusStyles[item.status]}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">{item.capacity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Hiển thị <span className="font-medium text-foreground">1-{warehouseData.length}</span> của <span className="font-medium text-foreground">{warehouseData.length}</span> kho
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
