import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarCheck, Search, Eye, X, RefreshCw, MapPin, Calendar, Ruler } from "lucide-react";
import { toast } from "sonner";

const bookingsData = [
  {
    id: "DT001",
    warehouse: "Kho A1 - Quận 7",
    location: "123 Nguyễn Văn Linh, Quận 7",
    area: 500,
    startDate: "01/01/2025",
    endDate: "01/07/2025",
    totalPrice: "150,000,000đ",
    status: "Đang thuê",
  },
  {
    id: "DT002",
    warehouse: "Kho B2 - Quận 9",
    location: "456 Đỗ Xuân Hợp, Quận 9",
    area: 800,
    startDate: "15/01/2025",
    endDate: "15/07/2025",
    totalPrice: "312,000,000đ",
    status: "Chờ duyệt",
  },
  {
    id: "DT003",
    warehouse: "Kho C3 - Thủ Đức",
    location: "789 Võ Văn Ngân, Thủ Đức",
    area: 1200,
    startDate: "01/06/2024",
    endDate: "01/12/2024",
    totalPrice: "576,000,000đ",
    status: "Hoàn thành",
  },
  {
    id: "DT004",
    warehouse: "Kho D4 - Bình Tân",
    location: "321 Lê Văn Quới, Bình Tân",
    area: 600,
    startDate: "01/03/2024",
    endDate: "01/06/2024",
    totalPrice: "81,000,000đ",
    status: "Đã hủy",
  },
];

const MyBookings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof bookingsData[0] | null>(null);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang thuê": return "default";
      case "Chờ duyệt": return "secondary";
      case "Hoàn thành": return "outline";
      case "Đã hủy": return "destructive";
      default: return "outline";
    }
  };

  const handleCancel = (id: string) => {
    toast.success(`Đã hủy đơn thuê ${id}`);
  };

  const handleExtend = (id: string) => {
    toast.success(`Đã gửi yêu cầu gia hạn cho đơn ${id}`);
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
            <span className="text-foreground">Đơn thuê của tôi</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <CalendarCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Đơn thuê của tôi</h1>
              <p className="text-sm text-muted-foreground">Quản lý các đơn thuê kho của bạn</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Tổng đơn</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-sm text-muted-foreground">Đang thuê</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-500">1</p>
                <p className="text-sm text-muted-foreground">Chờ duyệt</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-gray-500">2</p>
                <p className="text-sm text-muted-foreground">Đã kết thúc</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm đơn thuê..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="active">Đang thuê</SelectItem>
                <SelectItem value="pending">Chờ duyệt</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã đơn</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Diện tích</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Tổng tiền</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingsData.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>{booking.warehouse}</TableCell>
                      <TableCell>{booking.area}m²</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{booking.startDate}</p>
                          <p className="text-muted-foreground">đến {booking.endDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>{booking.totalPrice}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(booking)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Chi tiết đơn thuê {booking.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                                  <MapPin className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <p className="font-medium">{booking.warehouse}</p>
                                    <p className="text-sm text-muted-foreground">{booking.location}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Ruler className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.area}m²</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>{booking.startDate} - {booking.endDate}</span>
                                  </div>
                                </div>
                                <div className="p-3 bg-primary/10 rounded-lg">
                                  <p className="text-sm text-muted-foreground">Tổng tiền</p>
                                  <p className="text-xl font-bold text-primary">{booking.totalPrice}</p>
                                </div>
                                <Badge variant={getStatusVariant(booking.status)} className="w-fit">
                                  {booking.status}
                                </Badge>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {booking.status === "Đang thuê" && (
                            <Button variant="ghost" size="icon" onClick={() => handleExtend(booking.id)}>
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          {booking.status === "Chờ duyệt" && (
                            <Button variant="ghost" size="icon" onClick={() => handleCancel(booking.id)}>
                              <X className="h-4 w-4" />
                            </Button>
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

export default MyBookings;
