import { useState, useMemo } from "react";
import { Check, X, Eye, FileText, DollarSign } from "lucide-react";
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

const mockBookings = [
  { id: "DT-001", customer: "Công ty TNHH ABC", customerId: "c1", warehouse: "Kho Bình Dương A1", warehouseId: "w1", startDate: "2024-01-15", endDate: "2024-12-15", price: 50000000, status: "pending", createdAt: "2024-01-10" },
  { id: "DT-002", customer: "Công ty CP XYZ", customerId: "c2", warehouse: "Kho Long An B2", warehouseId: "w2", startDate: "2024-02-01", endDate: "2025-02-01", price: 80000000, status: "active", createdAt: "2024-01-25" },
  { id: "DT-003", customer: "Cửa hàng Minh Phát", customerId: "c3", warehouse: "Kho TP.HCM D4", warehouseId: "w4", startDate: "2024-03-01", endDate: "2024-09-01", price: 25000000, status: "pending", createdAt: "2024-02-20" },
  { id: "DT-004", customer: "Công ty Logistics DEF", customerId: "c4", warehouse: "Kho Đồng Nai C3", warehouseId: "w3", startDate: "2024-01-01", endDate: "2024-06-30", price: 35000000, status: "rejected", createdAt: "2023-12-15" },
  { id: "DT-005", customer: "Công ty TNHH GHI", customerId: "c5", warehouse: "Kho Bình Dương A1", warehouseId: "w1", startDate: "2024-04-01", endDate: "2024-10-01", price: 45000000, status: "active", createdAt: "2024-03-15" },
  { id: "DT-006", customer: "Công ty CP JKL", customerId: "c6", warehouse: "Kho Long An B2", warehouseId: "w2", startDate: "2024-05-01", endDate: "2025-05-01", price: 90000000, status: "expired", createdAt: "2024-04-10" },
  { id: "DT-007", customer: "Công ty MNO", customerId: "c7", warehouse: "Kho TP.HCM D4", warehouseId: "w4", startDate: "2024-06-01", endDate: "2024-12-01", price: 30000000, status: "pending", createdAt: "2024-05-20" },
  { id: "DT-008", customer: "Công ty PQR", customerId: "c8", warehouse: "Kho Bình Dương A2", warehouseId: "w5", startDate: "2024-07-01", endDate: "2025-01-01", price: 55000000, status: "active", createdAt: "2024-06-15" },
];

const filterConfig: FilterConfig[] = [
  {
    id: "search",
    label: "Tìm kiếm",
    type: "search",
    placeholder: "Mã đơn, khách hàng...",
  },
  {
    id: "warehouse",
    label: "Kho",
    type: "select",
    options: [
      { value: "w1", label: "Kho Bình Dương A1" },
      { value: "w2", label: "Kho Long An B2" },
      { value: "w3", label: "Kho Đồng Nai C3" },
      { value: "w4", label: "Kho TP.HCM D4" },
      { value: "w5", label: "Kho Bình Dương A2" },
    ],
  },
  {
    id: "status",
    label: "Trạng thái",
    type: "select",
    options: [
      { value: "pending", label: "Chờ duyệt" },
      { value: "active", label: "Đang thuê" },
      { value: "expired", label: "Hết hạn" },
      { value: "rejected", label: "Từ chối" },
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
  { key: "id", label: "Mã đơn" },
  { key: "customer", label: "Khách hàng" },
  { key: "warehouse", label: "Kho" },
  { key: "startDate", label: "Ngày bắt đầu" },
  { key: "endDate", label: "Ngày kết thúc" },
  { 
    key: "price", 
    label: "Giá thuê (VND/tháng)",
    format: (value) => Number(value).toLocaleString("vi-VN")
  },
  { 
    key: "status", 
    label: "Trạng thái",
    format: (value) => {
      const statusMap: Record<string, string> = {
        pending: "Chờ duyệt",
        active: "Đang thuê",
        expired: "Hết hạn",
        rejected: "Từ chối",
      };
      return statusMap[value as string] || String(value);
    }
  },
];

const BookingManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20",
      active: "bg-green-500/10 text-green-600 hover:bg-green-500/20",
      expired: "bg-muted text-muted-foreground",
      rejected: "bg-red-500/10 text-red-600 hover:bg-red-500/20",
    };
    const labels: Record<string, string> = {
      pending: "Chờ duyệt",
      active: "Đang thuê",
      expired: "Hết hạn",
      rejected: "Từ chối",
    };
    return <Badge className={styles[status] || ""}>{labels[status] || status}</Badge>;
  };

  const filteredBookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      // Search filter
      const search = (filterValues.search as string)?.toLowerCase();
      if (search && !booking.id.toLowerCase().includes(search) && !booking.customer.toLowerCase().includes(search)) {
        return false;
      }

      // Warehouse filter
      const warehouse = filterValues.warehouse as string;
      if (warehouse && warehouse !== "all" && booking.warehouseId !== warehouse) {
        return false;
      }

      // Status filter
      const status = filterValues.status as string;
      if (status && status !== "all" && booking.status !== status) {
        return false;
      }

      // Date range filter
      const dateRange = filterValues.dateRange as { from?: Date; to?: Date };
      if (dateRange?.from || dateRange?.to) {
        const createdDate = new Date(booking.createdAt);
        if (dateRange.from && createdDate < dateRange.from) return false;
        if (dateRange.to && createdDate > dateRange.to) return false;
      }

      return true;
    });
  }, [filterValues]);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBookings.slice(start, start + pageSize);
  }, [filteredBookings, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredBookings.length / pageSize);

  const handleReset = () => {
    setFilterValues({});
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  // Stats
  const stats = useMemo(() => {
    return {
      pending: mockBookings.filter(b => b.status === "pending").length,
      active: mockBookings.filter(b => b.status === "active").length,
      totalRevenue: mockBookings
        .filter(b => b.status === "active")
        .reduce((sum, b) => sum + b.price, 0),
    };
  }, []);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Quản lý Đơn thuê</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-heading-xl">Quản lý Đơn thuê</h1>
              <p className="text-body text-muted-foreground mt-1">Duyệt và quản lý các đơn thuê kho</p>
            </div>
            <DataExport 
              data={filteredBookings} 
              columns={exportColumns} 
              filename="danh_sach_don_thue" 
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-yellow-500/5 border-yellow-500/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chờ duyệt</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-green-500/5 border-green-500/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Đang thuê</p>
                  <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Doanh thu/tháng</p>
                  <p className="text-2xl font-bold text-primary">{(stats.totalRevenue / 1000000).toFixed(0)}M</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-heading">Danh sách Đơn thuê ({filteredBookings.length})</CardTitle>
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
                      <TableHead>Mã đơn</TableHead>
                      <TableHead>Khách hàng</TableHead>
                      <TableHead>Kho</TableHead>
                      <TableHead>Thời gian</TableHead>
                      <TableHead>Giá thuê</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead className="text-right">Thao tác</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedBookings.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          Không tìm thấy đơn thuê nào phù hợp với điều kiện lọc
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium font-mono">{booking.id}</TableCell>
                          <TableCell>{booking.customer}</TableCell>
                          <TableCell>{booking.warehouse}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{booking.startDate}</div>
                              <div className="text-muted-foreground">đến {booking.endDate}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {(booking.price / 1000000).toFixed(0)}M/tháng
                          </TableCell>
                          <TableCell>{getStatusBadge(booking.status)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              {booking.status === "pending" && (
                                <>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredBookings.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  totalItems={filteredBookings.length}
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

export default BookingManagement;
