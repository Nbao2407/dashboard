import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", inbound: 4000, outbound: 2400 },
  { month: "Feb", inbound: 3000, outbound: 1398 },
  { month: "Mar", inbound: 2000, outbound: 3800 },
  { month: "Apr", inbound: 2780, outbound: 3908 },
  { month: "May", inbound: 1890, outbound: 4800 },
  { month: "Jun", inbound: 2390, outbound: 3800 },
  { month: "Jul", inbound: 3490, outbound: 4300 },
];

export function WarehouseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Warehouse Flow</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 77%, 26%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 77%, 26%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" className="text-xs fill-muted-foreground" />
            <YAxis className="text-xs fill-muted-foreground" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "8px",
              }} 
            />
            <Area
              type="monotone"
              dataKey="inbound"
              stroke="hsl(173, 77%, 26%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInbound)"
              name="Inbound"
            />
            <Area
              type="monotone"
              dataKey="outbound"
              stroke="hsl(199, 89%, 48%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOutbound)"
              name="Outbound"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Inbound</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-info" />
            <span className="text-sm text-muted-foreground">Outbound</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
