import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: "Jan", profit: 40000, invest: 30000 },
  { month: "Feb", profit: 35000, invest: 25000 },
  { month: "Mar", profit: 45000, invest: 35000 },
  { month: "Apr", profit: 50000, invest: 40000 },
  { month: "May", profit: 55000, invest: 42000 },
  { month: "Jun", profit: 80000, invest: 60000 },
  { month: "Jul", profit: 90000, invest: 115500 },
  { month: "Aug", profit: 85000, invest: 70000 },
  { month: "Sep", profit: 75000, invest: 65000 },
];

export function WarehouseChart() {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-2xl font-bold">$16500</span>
            <span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full font-medium">
              +15% Compared to last month
            </span>
          </div>
        </div>
        <Select defaultValue="monthly">
          <SelectTrigger className="w-28 h-8 text-xs rounded-lg bg-muted border-0">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[hsl(75,85%,55%)]" />
            <span className="text-sm text-muted-foreground">Profit</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-foreground" />
            <span className="text-sm text-muted-foreground">Invest</span>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(75, 85%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(75, 85%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorInvest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 20%, 15%)" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(220, 20%, 15%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground" 
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs fill-muted-foreground"
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "hsl(var(--card))", 
                borderColor: "hsl(var(--border))",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
            />
            <Area
              type="monotone"
              dataKey="profit"
              stroke="hsl(75, 85%, 55%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorProfit)"
              name="Profit"
            />
            <Area
              type="monotone"
              dataKey="invest"
              stroke="hsl(220, 20%, 15%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorInvest)"
              name="Invest"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
