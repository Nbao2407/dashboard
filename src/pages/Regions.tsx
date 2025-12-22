import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Search,
  Globe,
  Package,
  TrendingUp,
  MapPin
} from "lucide-react";

const regionsData = [
  { 
    id: 1, 
    name: "Miền Bắc", 
    warehouses: 8, 
    totalCapacity: "45,000 m²", 
    utilization: 78,
    provinces: ["Hà Nội", "Hải Phòng", "Bắc Ninh", "Hưng Yên"],
    status: "Hoạt động"
  },
  { 
    id: 2, 
    name: "Miền Trung", 
    warehouses: 5, 
    totalCapacity: "28,000 m²", 
    utilization: 62,
    provinces: ["Đà Nẵng", "Huế", "Quảng Nam", "Nghệ An"],
    status: "Hoạt động"
  },
  { 
    id: 3, 
    name: "Miền Nam", 
    warehouses: 12, 
    totalCapacity: "72,000 m²", 
    utilization: 85,
    provinces: ["TP.HCM", "Bình Dương", "Đồng Nai", "Long An"],
    status: "Hoạt động"
  },
  { 
    id: 4, 
    name: "Tây Nguyên", 
    warehouses: 3, 
    totalCapacity: "15,000 m²", 
    utilization: 45,
    provinces: ["Đắk Lắk", "Gia Lai", "Lâm Đồng"],
    status: "Đang mở rộng"
  },
  { 
    id: 5, 
    name: "Đồng bằng sông Cửu Long", 
    warehouses: 6, 
    totalCapacity: "35,000 m²", 
    utilization: 55,
    provinces: ["Cần Thơ", "An Giang", "Kiên Giang", "Vĩnh Long"],
    status: "Hoạt động"
  },
];

const Regions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return "text-red-500";
    if (utilization >= 60) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Trang chủ</span>
            <span>/</span>
            <span>Khu vực</span>
            <span>/</span>
            <span className="text-foreground">Vùng địa lý</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Vùng địa lý</h1>
                <p className="text-sm text-muted-foreground">Quản lý các vùng địa lý và kho hàng</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Thêm vùng mới
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm vùng..." className="pl-9" />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-muted-foreground">Vùng địa lý</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">34</p>
                    <p className="text-sm text-muted-foreground">Tổng số kho</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">195,000 m²</p>
                    <p className="text-sm text-muted-foreground">Tổng diện tích</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">68%</p>
                    <p className="text-sm text-muted-foreground">Trung bình sử dụng</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regionsData.map((region) => (
              <Card key={region.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{region.name}</CardTitle>
                    <Badge variant={region.status === "Hoạt động" ? "default" : "secondary"}>
                      {region.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Số kho</p>
                      <p className="font-semibold">{region.warehouses}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Diện tích</p>
                      <p className="font-semibold">{region.totalCapacity}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Công suất sử dụng</span>
                      <span className={`font-semibold ${getUtilizationColor(region.utilization)}`}>
                        {region.utilization}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${
                          region.utilization >= 80 ? 'bg-red-500' : 
                          region.utilization >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${region.utilization}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Tỉnh/Thành phố</p>
                    <div className="flex flex-wrap gap-1">
                      {region.provinces.map((province) => (
                        <Badge key={province} variant="outline" className="text-xs">
                          {province}
                        </Badge>
                      ))}
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

export default Regions;
