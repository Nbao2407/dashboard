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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Receipt, Search, Download, CreditCard, Eye, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const invoicesData = [
  {
    id: "INV001",
    contract: "HD001",
    warehouse: "Kho A1 - Quận 7",
    amount: "25,000,000đ",
    dueDate: "15/01/2025",
    status: "Chưa thanh toán",
    period: "01/2025",
  },
  {
    id: "INV002",
    contract: "HD002",
    warehouse: "Kho B2 - Quận 9",
    amount: "52,000,000đ",
    dueDate: "01/02/2025",
    status: "Chưa thanh toán",
    period: "01/2025",
  },
  {
    id: "INV003",
    contract: "HD001",
    warehouse: "Kho A1 - Quận 7",
    amount: "25,000,000đ",
    dueDate: "15/12/2024",
    status: "Đã thanh toán",
    period: "12/2024",
    paidDate: "10/12/2024",
  },
  {
    id: "INV004",
    contract: "HD003",
    warehouse: "Kho C3 - Thủ Đức",
    amount: "96,000,000đ",
    dueDate: "01/11/2024",
    status: "Đã thanh toán",
    period: "11/2024",
    paidDate: "28/10/2024",
  },
];

const Invoices = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoicesData[0] | null>(null);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Đã thanh toán": return "default";
      case "Chưa thanh toán": return "destructive";
      case "Quá hạn": return "destructive";
      default: return "outline";
    }
  };

  const handlePayment = () => {
    toast.success("Thanh toán thành công!");
    setPaymentDialogOpen(false);
  };

  const handleDownload = (id: string) => {
    toast.success(`Đang tải hóa đơn ${id}...`);
  };

  const unpaidTotal = invoicesData
    .filter(inv => inv.status === "Chưa thanh toán")
    .reduce((sum, inv) => sum + parseInt(inv.amount.replace(/[^\d]/g, '')), 0);

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
            <span className="text-foreground">Hóa đơn & Thanh toán</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Receipt className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hóa đơn & Thanh toán</h1>
              <p className="text-sm text-muted-foreground">Quản lý hóa đơn và thanh toán</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Tổng hóa đơn</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-500">2</p>
                <p className="text-sm text-muted-foreground">Chưa thanh toán</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-green-500">2</p>
                <p className="text-sm text-muted-foreground">Đã thanh toán</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 dark:bg-red-950/20 border-red-200">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-red-500">
                  {unpaidTotal.toLocaleString()}đ
                </p>
                <p className="text-sm text-red-600">Cần thanh toán</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Tìm kiếm hóa đơn..." className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="unpaid">Chưa thanh toán</SelectItem>
                <SelectItem value="paid">Đã thanh toán</SelectItem>
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
                    <TableHead>Kỳ</TableHead>
                    <TableHead>Số tiền</TableHead>
                    <TableHead>Hạn thanh toán</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoicesData.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <p>{invoice.warehouse}</p>
                          <p className="text-xs text-muted-foreground">{invoice.contract}</p>
                        </div>
                      </TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDownload(invoice.id)}>
                            <Download className="h-4 w-4" />
                          </Button>
                          {invoice.status === "Chưa thanh toán" && (
                            <Dialog open={paymentDialogOpen && selectedInvoice?.id === invoice.id} onOpenChange={(open) => {
                              setPaymentDialogOpen(open);
                              if (open) setSelectedInvoice(invoice);
                            }}>
                              <DialogTrigger asChild>
                                <Button variant="default" size="sm" className="gap-1">
                                  <CreditCard className="h-3 w-3" />
                                  Thanh toán
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Thanh toán hóa đơn {invoice.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="p-4 bg-muted rounded-lg">
                                    <div className="flex justify-between mb-2">
                                      <span className="text-muted-foreground">Kho</span>
                                      <span className="font-medium">{invoice.warehouse}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                      <span className="text-muted-foreground">Kỳ thanh toán</span>
                                      <span>{invoice.period}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                      <span>Số tiền</span>
                                      <span className="text-primary">{invoice.amount}</span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-2">
                                    <p className="font-medium">Phương thức thanh toán</p>
                                    <div className="grid grid-cols-2 gap-2">
                                      <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                                        <CreditCard className="h-5 w-5" />
                                        <span className="text-xs">Thẻ tín dụng</span>
                                      </Button>
                                      <Button variant="outline" className="h-auto py-3 flex-col gap-1">
                                        <Receipt className="h-5 w-5" />
                                        <span className="text-xs">Chuyển khoản</span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                                    Hủy
                                  </Button>
                                  <Button onClick={handlePayment} className="gap-2">
                                    <CheckCircle className="h-4 w-4" />
                                    Xác nhận thanh toán
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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

export default Invoices;
