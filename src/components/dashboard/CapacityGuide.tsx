import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CapacityGuide() {
  return (
    <Card className="rounded-2xl border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Capacity Guide</CardTitle>
          <span className="text-xs text-muted-foreground">Monitor Warehouse Space Efficiency</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          {/* Donut Chart */}
          <div className="relative w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="12"
              />
              {/* Warning zone (cyan) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(199, 89%, 48%)"
                strokeWidth="12"
                strokeDasharray="201.06"
                strokeDashoffset="36.19"
              />
              {/* Main zone (teal) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(173, 77%, 35%)"
                strokeWidth="12"
                strokeDasharray="164.87"
                strokeDashoffset="0"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-xl font-bold">82%</span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span className="text-xs">Products are In Warning Zone</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-accent" />
              <span className="text-xs">Products are In Rack Zone</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dead Stocks</p>
            <p className="text-xl font-bold">25 Items</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-destructive bg-destructive/10 px-2 py-0.5 rounded-full font-medium">
              -10%
            </span>
            <p className="text-xs text-muted-foreground mt-1">Since Last month</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
