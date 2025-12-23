import { LucideIcon, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "teal" | "cyan" | "green" | "orange" | "red";
  showProgress?: boolean;
  progressValue?: number;
}

const variantStyles = {
  teal: {
    card: "bg-[hsl(173,77%,95%)] border-[hsl(173,60%,85%)]",
    icon: "bg-[hsl(173,77%,85%)] text-[hsl(173,77%,25%)]",
    trend: "text-[hsl(173,77%,30%)] bg-[hsl(173,77%,90%)]",
  },
  cyan: {
    card: "bg-[hsl(199,89%,95%)] border-[hsl(199,70%,85%)]",
    icon: "bg-[hsl(199,89%,85%)] text-[hsl(199,89%,35%)]",
    trend: "text-[hsl(199,89%,40%)] bg-[hsl(199,89%,90%)]",
  },
  green: {
    card: "bg-[hsl(160,84%,95%)] border-[hsl(160,70%,85%)]",
    icon: "bg-[hsl(160,84%,85%)] text-[hsl(160,84%,30%)]",
    trend: "text-[hsl(160,84%,35%)] bg-[hsl(160,84%,90%)]",
  },
  orange: {
    card: "bg-[hsl(38,92%,95%)] border-[hsl(38,80%,85%)]",
    icon: "bg-[hsl(38,92%,80%)] text-[hsl(38,92%,30%)]",
    trend: "text-[hsl(38,92%,35%)] bg-[hsl(38,92%,88%)]",
  },
  red: {
    card: "bg-[hsl(0,84%,95%)] border-[hsl(0,70%,85%)]",
    icon: "bg-[hsl(0,84%,85%)] text-[hsl(0,84%,40%)]",
    trend: "text-[hsl(0,84%,45%)] bg-[hsl(0,84%,90%)]",
  },
};

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  variant = "green",
  showProgress = false,
  progressValue = 0
}: StatCardProps) {
  const styles = variantStyles[variant];
  
  return (
    <Card className={cn("border transition-all hover:shadow-lg rounded-2xl", styles.card)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-3 rounded-xl", styles.icon)}>
            <Icon className="h-5 w-5" />
          </div>
          <button className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
        
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <p className="text-2xl font-bold tracking-tight text-foreground mb-2">{value}</p>
        
        {showProgress && (
          <div className="mb-2">
            <Progress 
              value={progressValue} 
              className="h-2 bg-black/10"
            />
          </div>
        )}
        
        {trend && (
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              styles.trend
            )}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">Since Last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
