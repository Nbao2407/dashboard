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
  variant?: "green" | "yellow" | "blue" | "orange" | "red";
  showProgress?: boolean;
  progressValue?: number;
}

const variantStyles = {
  green: {
    card: "bg-[hsl(142,76%,95%)] border-[hsl(142,60%,85%)]",
    icon: "bg-[hsl(142,76%,85%)] text-[hsl(142,76%,30%)]",
    trend: "text-[hsl(142,76%,36%)] bg-[hsl(142,76%,90%)]",
  },
  yellow: {
    card: "bg-[hsl(45,93%,95%)] border-[hsl(45,80%,85%)]",
    icon: "bg-[hsl(45,93%,80%)] text-[hsl(45,93%,30%)]",
    trend: "text-[hsl(45,93%,35%)] bg-[hsl(45,93%,88%)]",
  },
  blue: {
    card: "bg-[hsl(199,89%,95%)] border-[hsl(199,70%,85%)]",
    icon: "bg-[hsl(199,89%,85%)] text-[hsl(199,89%,35%)]",
    trend: "text-[hsl(199,89%,40%)] bg-[hsl(199,89%,90%)]",
  },
  orange: {
    card: "bg-[hsl(25,95%,95%)] border-[hsl(25,80%,85%)]",
    icon: "bg-[hsl(25,95%,85%)] text-[hsl(25,95%,35%)]",
    trend: "text-[hsl(25,95%,40%)] bg-[hsl(25,95%,90%)]",
  },
  red: {
    card: "bg-[hsl(0,72%,95%)] border-[hsl(0,60%,85%)]",
    icon: "bg-[hsl(0,72%,85%)] text-[hsl(0,72%,40%)]",
    trend: "text-[hsl(0,72%,45%)] bg-[hsl(0,72%,90%)]",
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
