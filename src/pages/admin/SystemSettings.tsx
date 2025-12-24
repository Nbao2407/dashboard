import { useState } from "react";
import { Save, Bell, Shield, Database, Globe } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { AdminSidebar } from "@/components/dashboard/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SystemSettings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-6 space-y-6 overflow-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Dashboard Admin</span>
            <span>/</span>
            <span className="text-foreground font-medium">Cài đặt Hệ thống</span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Cài đặt Hệ thống</h1>
            <p className="text-muted-foreground mt-1">Cấu hình và tùy chỉnh hệ thống</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <CardTitle>Thông tin chung</CardTitle>
                </div>
                <CardDescription>Cài đặt thông tin cơ bản của hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Tên công ty</Label>
                  <Input id="company-name" defaultValue="GenHub Logistics" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email liên hệ</Label>
                  <Input id="email" type="email" defaultValue="contact@genhub.vn" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" defaultValue="1900-xxxx" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle>Thông báo</CardTitle>
                </div>
                <CardDescription>Cài đặt thông báo hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo đơn thuê mới</p>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi có đơn thuê mới</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo thanh toán</p>
                    <p className="text-sm text-muted-foreground">Nhận thông báo khi có thanh toán</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Thông báo bảo trì</p>
                    <p className="text-sm text-muted-foreground">Nhận thông báo lịch bảo trì kho</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Bảo mật</CardTitle>
                </div>
                <CardDescription>Cài đặt bảo mật hệ thống</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Xác thực 2 lớp</p>
                    <p className="text-sm text-muted-foreground">Bắt buộc xác thực 2 lớp cho admin</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ghi log hoạt động</p>
                    <p className="text-sm text-muted-foreground">Ghi lại tất cả hoạt động hệ thống</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Lưu cài đặt
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemSettings;
