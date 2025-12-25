import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Maximize, DollarSign, Filter, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data
const warehouseList = [
  {
    id: "1",
    name: "Kho Tân Thuận",
    location: "Quận 7, TP.HCM",
    area: 500,
    price: 80000,
    type: "Kho thường",
    available: true,
    features: ["Bảo vệ 24/7", "PCCC", "Bãi đậu xe"],
  },
  {
    id: "2",
    name: "Kho Cát Lái",
    location: "Quận 2, TP.HCM",
    area: 1000,
    price: 95000,
    type: "Kho lạnh",
    available: true,
    features: ["Kiểm soát nhiệt độ", "PCCC", "Gần cảng"],
  },
  {
    id: "3",
    name: "Kho Long Biên",
    location: "Long Biên, Hà Nội",
    area: 800,
    price: 70000,
    type: "Kho thường",
    available: true,
    features: ["Bảo vệ 24/7", "Loading dock", "Gần sân bay"],
  },
  {
    id: "4",
    name: "Kho Bình Dương",
    location: "Dĩ An, Bình Dương",
    area: 2000,
    price: 55000,
    type: "Kho thường",
    available: false,
    features: ["Diện tích lớn", "PCCC", "KCN"],
  },
  {
    id: "5",
    name: "Kho Đà Nẵng",
    location: "Liên Chiểu, Đà Nẵng",
    area: 600,
    price: 65000,
    type: "Kho ngoại quan",
    available: true,
    features: ["Thủ tục XNK", "Gần cảng", "Bảo vệ 24/7"],
  },
  {
    id: "6",
    name: "Kho Thủ Đức",
    location: "TP. Thủ Đức, TP.HCM",
    area: 1200,
    price: 85000,
    type: "Kho lạnh",
    available: true,
    features: ["Kiểm soát nhiệt độ", "Loading dock", "PCCC"],
  },
];

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredWarehouses = warehouseList.filter((wh) => {
    const matchSearch = wh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       wh.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLocation = locationFilter === "all" || wh.location.includes(locationFilter);
    const matchType = typeFilter === "all" || wh.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-display-sm">Danh sách kho cho thuê</h1>
            <p className="text-body text-muted-foreground">
              Tìm kiếm và so sánh các kho phù hợp với nhu cầu của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b bg-background sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm theo tên hoặc vị trí..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Khu vực" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả khu vực</SelectItem>
                <SelectItem value="TP.HCM">TP.HCM</SelectItem>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                <SelectItem value="Bình Dương">Bình Dương</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Loại kho" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại</SelectItem>
                <SelectItem value="Kho thường">Kho thường</SelectItem>
                <SelectItem value="Kho lạnh">Kho lạnh</SelectItem>
                <SelectItem value="Kho ngoại quan">Kho ngoại quan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <p className="text-body text-muted-foreground">
              Tìm thấy <span className="font-medium text-foreground">{filteredWarehouses.length}</span> kho
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWarehouses.map((warehouse) => (
              <Card key={warehouse.id} className="card-interactive overflow-hidden">
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <Warehouse className="h-12 w-12 text-primary/30" />
                </div>
                <CardContent className="pt-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-heading-sm">{warehouse.name}</h3>
                    <Badge variant={warehouse.available ? "default" : "secondary"}>
                      {warehouse.available ? "Còn trống" : "Đã thuê"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-body-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 shrink-0" />
                      <span>{warehouse.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-4 w-4 shrink-0" />
                      <span>{warehouse.area.toLocaleString()} m²</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 shrink-0" />
                      <span>{warehouse.price.toLocaleString()}đ/m²/tháng</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline">{warehouse.type}</Badge>
                    {warehouse.features.slice(0, 2).map((f) => (
                      <Badge key={f} variant="secondary" className="text-xs">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button asChild className="w-full" disabled={!warehouse.available}>
                    <Link to={`/warehouses/${warehouse.id}`}>
                      {warehouse.available ? "Xem chi tiết" : "Liên hệ"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredWarehouses.length === 0 && (
            <div className="text-center py-12">
              <Warehouse className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-body text-muted-foreground">Không tìm thấy kho phù hợp</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchTerm("");
                setLocationFilter("all");
                setTypeFilter("all");
              }}>
                Xóa bộ lọc
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Warehouses;
