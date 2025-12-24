import { useState } from "react";
import { QrCode, UserCheck, UserMinus, Clock } from "lucide-react";
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

const mockCheckins = [
  { id: 1, customer: "Công ty TNHH ABC", time: "08:30", type: "in", warehouse: "Kho Bình Dương A1" },
  { id: 2, customer: "Công ty CP XYZ", time: "09:15", type: "out", warehouse: "Kho Long An B2" },
  { id: 3, customer: "Cửa hàng Minh Phát", time: "10:00", type: "in", warehouse: "Kho Bình Dương A1" },
  { id: 4, customer: "Công ty Logistics DEF", time: "11:30", type: "in", warehouse: "Kho Long An B2" },
];

const CheckInOut = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <StaffSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Nhân viên</span>
            <span>/</span>
            <span className="text-foreground font-medium">Check-in/Check-out</span>
          </div>

          <div>
            <h1 className="text-heading-xl">Check-in/Check-out</h1>
            <p className="text-body text-muted-foreground mt-1">Quét QR và ghi nhận ra/vào kho</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="flex flex-col items-center justify-center p-8">
              <div className="h-32 w-32 border-2 border-dashed border-muted-foreground/50 rounded-lg flex items-center justify-center mb-4">
                <QrCode className="h-16 w-16 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-center mb-4">Quét mã QR của khách hàng để check-in/check-out</p>
              <Button className="gap-2">
                <QrCode className="h-4 w-4" />
                Quét QR
              </Button>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-heading flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Thống kê hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 rounded-lg text-center">
                  <UserCheck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-600">8</p>
                  <p className="text-sm text-muted-foreground">Check-in</p>
                </div>
                <div className="p-4 bg-red-500/10 rounded-lg text-center">
                  <UserMinus className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-red-600">4</p>
                  <p className="text-sm text-muted-foreground">Check-out</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-heading">Lịch sử ra/vào hôm nay</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Kho</TableHead>
                    <TableHead>Loại</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCheckins.map((checkin) => (
                    <TableRow key={checkin.id}>
                      <TableCell className="font-medium">{checkin.time}</TableCell>
                      <TableCell>{checkin.customer}</TableCell>
                      <TableCell>{checkin.warehouse}</TableCell>
                      <TableCell>
                        {checkin.type === "in" ? (
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Check-in</Badge>
                        ) : (
                          <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">Check-out</Badge>
                        )}
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

export default CheckInOut;
