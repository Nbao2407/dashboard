import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import MapboxMap from "@/components/map/MapboxMap";

const warehouseLocations = [
  { id: 1, name: "Kho Hà Nội", lat: 21.0285, lng: 105.8542, capacity: 85, status: "Hoạt động" },
  { id: 2, name: "Kho Đà Nẵng", lat: 16.0544, lng: 108.2022, capacity: 60, status: "Hoạt động" },
  { id: 3, name: "Kho TP.HCM", lat: 10.8231, lng: 106.6297, capacity: 92, status: "Hoạt động" },
  { id: 4, name: "Kho Hải Phòng", lat: 20.8449, lng: 106.6881, capacity: 45, status: "Bảo trì" },
  { id: 5, name: "Kho Cần Thơ", lat: 10.0452, lng: 105.7469, capacity: 30, status: "Hoạt động" },
];

const WarehouseMap = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    return status === "Hoạt động" ? "bg-green-500" : "bg-yellow-500";
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
            <span className="text-foreground">Bản đồ kho</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Bản đồ kho</h1>
                <p className="text-sm text-muted-foreground">Xem vị trí các kho trên bản đồ Việt Nam</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Area */}
            <div className="lg:col-span-3">
              <MapboxMap 
                warehouses={warehouseLocations}
                onWarehouseSelect={setSelectedWarehouse}
                selectedWarehouse={selectedWarehouse}
              />
              
              {/* Selected Warehouse Info */}
              {selectedWarehouse && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    {(() => {
                      const warehouse = warehouseLocations.find(w => w.id === selectedWarehouse);
                      if (!warehouse) return null;
                      return (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{warehouse.name}</h3>
                            <Badge variant={warehouse.status === "Hoạt động" ? "default" : "secondary"}>
                              {warehouse.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Công suất: {warehouse.capacity}%</span>
                            <span>Tọa độ: {warehouse.lat.toFixed(4)}, {warehouse.lng.toFixed(4)}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${warehouse.capacity}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Warehouse List */}
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    Danh sách kho
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {warehouseLocations.map((warehouse) => (
                    <button
                      key={warehouse.id}
                      className={`w-full p-3 rounded-lg border text-left transition-all ${
                        selectedWarehouse === warehouse.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedWarehouse(warehouse.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{warehouse.name}</span>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(warehouse.status)}`} />
                      </div>
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-primary h-1.5 rounded-full"
                          style={{ width: `${warehouse.capacity}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{warehouse.capacity}% công suất</p>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WarehouseMap;
