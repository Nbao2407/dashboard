import { Link } from "react-router-dom";
import { Package, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center">
              <Package className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold">GenHub</h1>
          <p className="text-muted-foreground text-lg">Hệ thống Quản lý Kho Hàng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Admin Dashboard</CardTitle>
                  <CardDescription>Quản lý toàn bộ hệ thống</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Quản lý Kho</li>
                <li>• Quản lý Đơn thuê</li>
                <li>• Quản lý Khách hàng & Nhân viên</li>
                <li>• Báo cáo Doanh thu</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/admin">Vào Dashboard Admin</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>Staff Dashboard</CardTitle>
                  <CardDescription>Dành cho nhân viên</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Quản lý Kho được giao</li>
                <li>• Check-in/Check-out</li>
                <li>• Kiểm kê hàng hóa</li>
                <li>• Bảo trì & Báo cáo</li>
              </ul>
              <Button asChild variant="outline" className="w-full">
                <Link to="/staff">Vào Dashboard Nhân viên</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
