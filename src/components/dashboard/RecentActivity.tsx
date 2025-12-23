import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Truck, AlertTriangle, CheckCircle, ArrowDownToLine } from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    type: "inbound",
    title: "Shipment Received",
    description: "500 units of Electronic Components A arrived",
    time: "10 minutes ago",
    icon: ArrowDownToLine,
    color: "text-success",
  },
  {
    id: 2,
    type: "outbound",
    title: "Order Dispatched",
    description: "Order #12847 shipped to Customer XYZ",
    time: "25 minutes ago",
    icon: Truck,
    color: "text-info",
  },
  {
    id: 3,
    type: "alert",
    title: "Low Stock Alert",
    description: "Raw Material Steel below threshold",
    time: "1 hour ago",
    icon: AlertTriangle,
    color: "text-warning",
  },
  {
    id: 4,
    type: "inventory",
    title: "Stock Updated",
    description: "Inventory count completed for Zone C",
    time: "2 hours ago",
    icon: Package,
    color: "text-primary",
  },
  {
    id: 5,
    type: "complete",
    title: "Order Fulfilled",
    description: "Order #12843 marked as complete",
    time: "3 hours ago",
    icon: CheckCircle,
    color: "text-success",
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={cn("p-2 rounded-lg bg-muted", activity.color)}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
