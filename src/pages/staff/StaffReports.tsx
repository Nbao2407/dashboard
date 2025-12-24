import { useState } from "react";
import { Plus, FileText, AlertTriangle, Download } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StaffSidebar } from "@/components/dashboard/StaffSidebar";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockDailyReports = [
  { id: 1, date: "2024-01-20", warehouse: "Kho Bình Dương A1", checkins: 12, checkouts: 8, issues: 0 },
  { id: 2, date: "2024-01-19", warehouse: "Kho Bình Dương A1", checkins: 15, checkouts: 10, issues: 1 },
  { id: 3, date: "2024-01-18", warehouse: "Kho Long An B2", checkins: 8, checkouts: 6, issues: 0 },
];

const mockIncidentReports = [
  { id: 1, date: "2024-01-19", warehouse: "Kho Bình Dương A1", description: "Hỏng đèn khu vực A3", status: "resolved" },
  { id: 2, date: "2024-01-15", warehouse: "Kho Long An B2", description: "Rò rỉ nước nhẹ góc kho", status: "pending" },
];

const StaffReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Đã xử lý</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Chờ xử lý</Badge>;
      default:
        return <Badge variant="secondary">Không xác định</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Nhân viên</span>
            <span>/</span>
            <span className="text-foreground font-medium">Báo cáo</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-heading-xl">Báo cáo</h1>
              <p className="text-body text-muted-foreground mt-1">Báo cáo hàng ngày và sự cố</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Xuất báo cáo
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Tạo báo cáo
              </Button>
            </div>
          </div>

          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily" className="gap-2">
                <FileText className="h-4 w-4" />
                Báo cáo hàng ngày
              </TabsTrigger>
              <TabsTrigger value="incident" className="gap-2">
                <AlertTriangle className="h-4 w-4" />
                Báo cáo sự cố
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading">Báo cáo hàng ngày</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Kho</TableHead>
                        <TableHead>Check-in</TableHead>
                        <TableHead>Check-out</TableHead>
                        <TableHead>Sự cố</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockDailyReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.date}</TableCell>
                          <TableCell>{report.warehouse}</TableCell>
                          <TableCell>{report.checkins}</TableCell>
                          <TableCell>{report.checkouts}</TableCell>
                          <TableCell>
                            {report.issues > 0 ? (
                              <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">{report.issues}</Badge>
                            ) : (
                              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">0</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="incident" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-heading">Báo cáo sự cố</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Kho</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockIncidentReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.date}</TableCell>
                          <TableCell>{report.warehouse}</TableCell>
                          <TableCell>{report.description}</TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StaffReports;
