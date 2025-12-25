import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, Building, Lock, Camera } from "lucide-react";
import { toast } from "sonner";

const CustomerProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSave = () => {
    toast.success("Đã cập nhật thông tin thành công!");
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
            <span className="text-foreground">Hồ sơ cá nhân</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
              <p className="text-sm text-muted-foreground">Quản lý thông tin tài khoản của bạn</p>
            </div>
          </div>

          <Tabs defaultValue="info" className="space-y-6">
            <TabsList>
              <TabsTrigger value="info">Thông tin cá nhân</TabsTrigger>
              <TabsTrigger value="company">Thông tin công ty</TabsTrigger>
              <TabsTrigger value="security">Bảo mật</TabsTrigger>
            </TabsList>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-xl">NV</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" className="gap-2">
                      <Camera className="h-4 w-4" />
                      Đổi ảnh đại diện
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Họ và tên</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="fullName" defaultValue="Nguyễn Văn A" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="email" defaultValue="nguyenvana@email.com" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="phone" defaultValue="0901234567" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Địa chỉ</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="address" defaultValue="123 Nguyễn Huệ, Q1, TP.HCM" className="pl-9" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin công ty</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Tên công ty</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="companyName" defaultValue="Công ty TNHH ABC" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxCode">Mã số thuế</Label>
                      <Input id="taxCode" defaultValue="0123456789" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="companyAddress">Địa chỉ công ty</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="companyAddress" defaultValue="456 Lê Lợi, Q1, TP.HCM" className="pl-9" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSave}>Lưu thay đổi</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Đổi mật khẩu</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-w-md space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="currentPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Mật khẩu mới</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="newPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" type="password" className="pl-9" />
                      </div>
                    </div>
                  </div>

                  <Button onClick={() => toast.success("Đã đổi mật khẩu thành công!")}>
                    Đổi mật khẩu
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default CustomerProfile;
