import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { HeadphonesIcon, Plus, MessageSquare, Clock, CheckCircle, Search } from "lucide-react";
import { toast } from "sonner";

const ticketsData = [
  {
    id: "TK001",
    subject: "Yêu cầu sửa chữa hệ thống điện",
    warehouse: "Kho A1 - Quận 7",
    category: "Bảo trì",
    status: "Đang xử lý",
    createdAt: "20/12/2024",
    lastUpdate: "22/12/2024",
  },
  {
    id: "TK002",
    subject: "Hỏi về thủ tục gia hạn hợp đồng",
    warehouse: "Kho A1 - Quận 7",
    category: "Hợp đồng",
    status: "Đã phản hồi",
    createdAt: "18/12/2024",
    lastUpdate: "19/12/2024",
  },
  {
    id: "TK003",
    subject: "Báo cáo mất điện",
    warehouse: "Kho B2 - Quận 9",
    category: "Khẩn cấp",
    status: "Đã giải quyết",
    createdAt: "15/12/2024",
    lastUpdate: "15/12/2024",
  },
];

const Support = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đang xử lý": return "secondary";
      case "Đã phản hồi": return "default";
      case "Đã giải quyết": return "outline";
      default: return "outline";
    }
  };

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case "Khẩn cấp": return "destructive";
      case "Bảo trì": return "secondary";
      case "Hợp đồng": return "outline";
      default: return "outline";
    }
  };

  const handleSubmit = () => {
    toast.success("Đã gửi yêu cầu hỗ trợ thành công!");
    setCreateDialogOpen(false);
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
            <span className="text-foreground">Yêu cầu hỗ trợ</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HeadphonesIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Yêu cầu hỗ trợ</h1>
                <p className="text-sm text-muted-foreground">Gửi và theo dõi các yêu cầu hỗ trợ</p>
              </div>
            </div>
            <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Tạo yêu cầu mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Tạo yêu cầu hỗ trợ mới</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Kho liên quan</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn kho" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kho-a1">Kho A1 - Quận 7</SelectItem>
                        <SelectItem value="kho-b2">Kho B2 - Quận 9</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Danh mục</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maintenance">Bảo trì</SelectItem>
                        <SelectItem value="contract">Hợp đồng</SelectItem>
                        <SelectItem value="payment">Thanh toán</SelectItem>
                        <SelectItem value="urgent">Khẩn cấp</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Tiêu đề</Label>
                    <Input id="subject" placeholder="Nhập tiêu đề yêu cầu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả chi tiết</Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết vấn đề của bạn..."
                      rows={4}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button onClick={handleSubmit}>Gửi yêu cầu</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-2">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Đang xử lý</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Đã phản hồi</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Đã giải quyết</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm yêu cầu..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="responded">Đã phản hồi</SelectItem>
                <SelectItem value="resolved">Đã giải quyết</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {ticketsData.map((ticket) => (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-muted-foreground">{ticket.id}</span>
                        <Badge variant={getCategoryVariant(ticket.category)}>
                          {ticket.category}
                        </Badge>
                        <Badge variant={getStatusVariant(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </div>
                      <h3 className="font-semibold mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">{ticket.warehouse}</p>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      <p>Tạo: {ticket.createdAt}</p>
                      <p>Cập nhật: {ticket.lastUpdate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
