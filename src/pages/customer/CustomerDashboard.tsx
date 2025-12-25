import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Warehouse, 
  FileText, 
  Receipt, 
  CalendarCheck,
  ArrowRight,
  Clock
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { title: "Kho đang thuê", value: "2", icon: Warehouse, color: "text-blue-500" },
  { title: "Đơn thuê", value: "5", icon: CalendarCheck, color: "text-green-500" },
  { title: "Hợp đồng", value: "3", icon: FileText, color: "text-purple-500" },
  { title: "Hóa đơn chờ", value: "1", icon: Receipt, color: "text-orange-500" },
];

const recentBookings = [
  { id: "DT001", warehouse: "Kho A1 - Quận 7", status: "Đang thuê", date: "01/01/2025" },
  { id: "DT002", warehouse: "Kho B2 - Quận 9", status: "Chờ duyệt", date: "20/12/2024" },
  { id: "DT003", warehouse: "Kho C3 - Thủ Đức", status: "Hoàn thành", date: "15/11/2024" },
];

const upcomingPayments = [
  { id: "HD001", amount: "15,000,000đ", dueDate: "15/01/2025", status: "Chưa thanh toán" },
  { id: "HD002", amount: "8,500,000đ", dueDate: "01/02/2025", status: "Chưa thanh toán" },
];

const CustomerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang thuê": return "default";
      case "Chờ duyệt": return "secondary";
      case "Hoàn thành": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <CustomerSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 lg:ml-64">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Welcome */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Xin chào, Nguyễn Văn A!</h1>
            <p className="text-muted-foreground">Chào mừng bạn quay trở lại</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Đơn thuê gần đây</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/customer/bookings">
                    Xem tất cả <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{booking.warehouse}</p>
                        <p className="text-sm text-muted-foreground">{booking.id} • {booking.date}</p>
                      </div>
                      <Badge variant={getStatusVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Payments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Hóa đơn sắp đến hạn</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/customer/invoices">
                    Xem tất cả <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.amount}</p>
                          <p className="text-sm text-muted-foreground">Hạn: {payment.dueDate}</p>
                        </div>
                      </div>
                      <Button size="sm">Thanh toán</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/customer/search">
                    <Warehouse className="h-5 w-5" />
                    <span>Tìm kho mới</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/customer/bookings">
                    <CalendarCheck className="h-5 w-5" />
                    <span>Xem đơn thuê</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/customer/contracts">
                    <FileText className="h-5 w-5" />
                    <span>Xem hợp đồng</span>
                  </Link>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                  <Link to="/customer/support">
                    <Receipt className="h-5 w-5" />
                    <span>Yêu cầu hỗ trợ</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboard;
