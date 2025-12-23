import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const bestSellingProducts = [
  { 
    id: 1, 
    name: "Premium T-Shirts", 
    description: "Discount 10% + Sale 25",
    action: "Re-stock"
  },
];

const newlyArrivedStock = [
  { id: 1, sku: "SKU-300", name: "Headphone", qty: 200, price: "$4K" },
  { id: 2, sku: "SKU-300", name: "Bottle", qty: 240, price: "$6K" },
  { id: 3, sku: "SKU-300", name: "Hairdryer", qty: 500, price: "$12K" },
  { id: 4, sku: "SKU-300", name: "T-Shirt", qty: 100, price: "$3K" },
  { id: 5, sku: "SKU-300", name: "Sunglass", qty: 600, price: "$15K" },
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {/* Best Selling Products */}
      <Card className="rounded-2xl border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Best selling Products</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {bestSellingProducts.map((product) => (
            <div key={product.id} className="relative rounded-xl overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </div>
              <Button 
                size="sm" 
                className="absolute bottom-3 right-3 bg-primary text-primary-foreground rounded-lg text-xs"
              >
                {product.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Newly Arrived Stock */}
      <Card className="rounded-2xl border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Newly Arrived Stock</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground pb-2 border-b border-border">
              <span>Products</span>
              <span>Qty</span>
              <span>Price</span>
              <span></span>
            </div>
            {newlyArrivedStock.map((item) => (
              <div key={item.id} className="grid grid-cols-4 items-center text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">{item.sku}</p>
                  <p className="font-medium">{item.name}</p>
                </div>
                <span>{item.qty}</span>
                <span className="font-semibold">{item.price}</span>
                <span></span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
