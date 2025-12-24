import { useState, useMemo } from "react";
import { Plus, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
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
import { AdvancedFilters, FilterConfig, FilterValues } from "@/components/admin/AdvancedFilters";
import { DataExport, ExportColumn } from "@/components/admin/DataExport";
import { Pagination } from "@/components/admin/Pagination";

const mockWarehouses = [
  { id: "1", name: "Kho Bình Dương A1", address: "KCN VSIP, Bình Dương", province: "binh_duong", capacity: 5000, used: 3200, status: "active", createdAt: "2024-01-15" },
  { id: "2", name: "Kho Long An B2", address: "KCN Long Hậu, Long An", province: "long_an", capacity: 8000, used: 7500, status: "active", createdAt: "2024-02-01" },
  { id: "3", name: "Kho Đồng Nai C3", address: "KCN Nhơn Trạch, Đồng Nai", province: "dong_nai", capacity: 3000, used: 0, status: "maintenance", createdAt: "2024-03-10" },
  { id: "4", name: "Kho TP.HCM D4", address: "Quận 7, TP.HCM", province: "tphcm", capacity: 2000, used: 1800, status: "active", createdAt: "2024-04-05" },
  { id: "5", name: "Kho Bình Dương A2", address: "KCN Mỹ Phước, Bình Dương", province: "binh_duong", capacity: 6000, used: 4500, status: "active", createdAt: "2024-05-20" },
  { id: "6", name: "Kho Long An B3", address: "KCN Đức Hòa, Long An", province: "long_an", capacity: 4000, used: 3800, status: "full", createdAt: "2024-06-15" },
  { id: "7", name: "Kho TP.HCM D5", address: "Quận 2, TP.HCM", province: "tphcm", capacity: 2500, used: 0, status: "inactive", createdAt: "2024-07-01" },
  { id: "8", name: "Kho Bình Phước E1", address: "KCN Bình Phước", province: "binh_phuoc", capacity: 7000, used: 2100, status: "active", createdAt: "2024-08-10" },
];

const filterConfig: FilterConfig[] = [
  {
    id: "search",
    label: "Tìm kiếm",
    type: "search",
    placeholder: "Tên kho, địa chỉ...",
  },
  {
    id: "province",
    label: "Tỉnh/Thành phố",
    type: "select",
    options: [
      { value: "tphcm", label: "TP. Hồ Chí Minh" },
      { value: "binh_duong", label: "Bình Dương" },
      { value: "dong_nai", label: "Đồng Nai" },
      { value: "long_an", label: "Long An" },
      { value: "binh_phuoc", label: "Bình Phước" },
    ],
  },
  {
    id: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "active", label: "Hoạt động" },
      { value: "maintenance", label: "Bảo trì" },
      { value: "inactive", label: "Ngừng hoạt động" },
      { value: "full", label: "Đầy" },
    ],
  },
  {
    id: "dateRange",
    label: "Ngày tạo",
    type: "dateRange",
    placeholder: "Chọn khoảng thời gian",
  },
];

const exportColumns: ExportColumn[] = [
  { key: "name", label: "Tên kho" },
  { key: "address", label: "Địa chỉ" },
  { key: "capacity", label: "Sức chứa (m²)" },
  { key: "used", label: "Đã sử dụng (m²)" },
  { 
    key: "status", 
    label: "Trạng thái",
    format: (value) => {
      const statusMap: Record<string, string> = {
        active: "Hoạt động",
        maintenance: "Bảo trì",
        inactive: "Ngừng hoạt động",
        full: "Đầy",
      };
      return statusMap[value as string] || String(value);
    }
  },
  { key: "createdAt", label: "Ngày tạo" },
];

const WarehouseManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      maintenance: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
      inactive: "bg-muted text-muted-foreground",
      full: "bg-blue-500/10 text-blue-600 hover:bg-blue-500/20",
    };
    const labels: Record<string, string> = {
      active: "Hoạt động",
      maintenance: "Bảo trì",
      inactive: "Ngừng hoạt động",
      full: "Đầy",
    };
    return <Badge className={styles[status] || ""}>{labels[status] || status}</Badge>;
  };

  const filteredWarehouses = useMemo(() => {
    return mockWarehouses.filter((wh) => {
      // Search filter
      const search = (filterValues.search as string)?.toLowerCase();
      if (search && !wh.name.toLowerCase().includes(search) && !wh.address.toLowerCase().includes(search)) {
        return false;
      }

      // Province filter
      const province = filterValues.province as string;
      if (province && province !== "all" && wh.province !== province) {
        return false;
      }

      // Status filter
      const status = filterValues.status as string;
      if (status && status !== "all" && wh.status !== status) {
        return false;
      }

      // Date range filter
      const dateRange = filterValues.dateRange as { from?: Date; to?: Date };
      if (dateRange?.from || dateRange?.to) {
        const createdDate = new Date(wh.createdAt);
        if (dateRange.from && createdDate < dateRange.from) return false;
        if (dateRange.to && createdDate > dateRange.to) return false;
      }

      return true;
    });
  }, [filterValues]);

  const paginatedWarehouses = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredWarehouses.slice(start, start + pageSize);
  }, [filteredWarehouses, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredWarehouses.length / pageSize);

  const handleReset = () => {
    setFilterValues({});
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
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
            <div className="flex gap-2">
              <DataExport 
                data={filteredWarehouses} 
                columns={exportColumns} 
                filename="danh_sach_kho" 
              />
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Thêm kho mới
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Danh sách Kho ({filteredWarehouses.length})</CardTitle>
                </div>
                <AdvancedFilters
                  config={filterConfig}
                  values={filterValues}
                  onChange={(values) => {
                    setFilterValues(values);
                    setCurrentPage(1);
                  }}
                  onReset={handleReset}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên kho</TableHead>
                      <TableHead>Địa chỉ</TableHead>
                      <TableHead>Sức chứa</TableHead>
                      <TableHead>Sử dụng</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedWarehouses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          Không tìm thấy kho nào phù hợp với điều kiện lọc
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedWarehouses.map((wh) => (
                        <TableRow key={wh.id}>
                          <TableCell className="font-medium">{wh.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {wh.address}
                            </div>
                          </TableCell>
                          <TableCell>{wh.capacity.toLocaleString()} m²</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary rounded-full transition-all"
                                  style={{ width: `${(wh.used / wh.capacity) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground min-w-[40px]">
                                {Math.round((wh.used / wh.capacity) * 100)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(wh.status)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredWarehouses.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredWarehouses.length}
                  onPageChange={setCurrentPage}
                  onPageSizeChange={handlePageSizeChange}
                />
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default WarehouseManagement;
