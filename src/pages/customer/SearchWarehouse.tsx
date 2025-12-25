import { useState } from "react";
import { CustomerSidebar } from "@/components/dashboard/CustomerSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, MapPin, Ruler, DollarSign, Filter, Grid, List, Star } from "lucide-react";

const warehouses = [
  {
    id: 1,
    name: "Kho A1 - Quận 7",
    location: "123 Nguyễn Văn Linh, Quận 7",
    area: 500,
    price: 50000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400",
    status: "Còn trống",
    features: ["Bảo vệ 24/7", "Camera", "Điều hòa"],
  },
  {
    id: 2,
    name: "Kho B2 - Quận 9",
    location: "456 Đỗ Xuân Hợp, Quận 9",
    area: 800,
    price: 65000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=400",
    status: "Còn trống",
    features: ["Bảo vệ 24/7", "Camera", "Xe nâng"],
  },
  {
    id: 3,
    name: "Kho C3 - Thủ Đức",
    location: "789 Võ Văn Ngân, Thủ Đức",
    area: 1200,
    price: 80000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400",
    status: "Còn trống",
    features: ["Bảo vệ 24/7", "Camera", "Điều hòa", "Xe nâng"],
  },
  {
    id: 4,
    name: "Kho D4 - Bình Tân",
    location: "321 Lê Văn Quới, Bình Tân",
    area: 600,
    price: 45000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400",
    status: "Đã thuê",
    features: ["Bảo vệ 24/7", "Camera"],
  },
];

const SearchWarehouse = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100000]);

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
            <span className="text-foreground">Tìm kiếm kho</span>
          </div>

          {/* Page Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tìm kiếm kho</h1>
              <p className="text-sm text-muted-foreground">Tìm kho phù hợp với nhu cầu của bạn</p>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative lg:col-span-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Tìm kiếm theo tên, địa chỉ..." className="pl-9" />
                </div>
                <Select>
                  <SelectTrigger>
                    <MapPin className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Khu vực" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q7">Quận 7</SelectItem>
                    <SelectItem value="q9">Quận 9</SelectItem>
                    <SelectItem value="td">Thủ Đức</SelectItem>
                    <SelectItem value="bt">Bình Tân</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <Ruler className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Diện tích" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Dưới 500m²</SelectItem>
                    <SelectItem value="medium">500 - 1000m²</SelectItem>
                    <SelectItem value="large">Trên 1000m²</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="gap-2">
                  <Filter className="h-4 w-4" />
                  Lọc
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Khoảng giá (đ/m²/tháng)
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                  </span>
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={100000}
                  step={5000}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Tìm thấy <span className="font-medium text-foreground">{warehouses.length}</span> kho
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id} className={viewMode === "list" ? "flex overflow-hidden" : ""}>
                <div className={viewMode === "list" ? "w-48 shrink-0" : ""}>
                  <img
                    src={warehouse.image}
                    alt={warehouse.name}
                    className={`object-cover ${viewMode === "list" ? "h-full w-full" : "h-48 w-full rounded-t-lg"}`}
                  />
                </div>
                <div className="flex-1">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{warehouse.name}</h3>
                      <Badge variant={warehouse.status === "Còn trống" ? "default" : "secondary"}>
                        {warehouse.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="h-3 w-3" />
                      {warehouse.location}
                    </p>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <Ruler className="h-3 w-3" />
                        {warehouse.area}m²
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {warehouse.rating}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {warehouse.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {warehouse.price.toLocaleString()}đ
                      <span className="text-sm font-normal text-muted-foreground">/m²/tháng</span>
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" disabled={warehouse.status !== "Còn trống"}>
                      {warehouse.status === "Còn trống" ? "Đặt thuê ngay" : "Đã được thuê"}
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchWarehouse;
