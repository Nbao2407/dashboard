import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "China", value: "$19K", sales: "Sales" },
  { name: "United Kingdom", value: "40%", sales: "" },
];

export function RevenueByLocation() {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Revenue by Locations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {/* World Map Placeholder */}
          <div className="flex-1 relative h-24">
            <svg viewBox="0 0 100 60" className="w-full h-full opacity-20">
              <ellipse cx="50" cy="30" rx="45" ry="25" fill="currentColor" className="text-muted-foreground" />
            </svg>
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
          
          {/* Stats */}
          <div className="space-y-3">
            {locations.map((loc) => (
              <div key={loc.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div>
                  <p className="text-sm font-medium">{loc.name}</p>
                  <p className="text-xs text-muted-foreground">{loc.value} {loc.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <Button variant="outline" className="w-full mt-4 rounded-xl border-border">
          See All
        </Button>
      </CardContent>
    </Card>
  );
}
