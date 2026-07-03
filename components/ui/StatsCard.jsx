import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export function StatsCard({ title, value, icon: Icon, trend, className }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center text-xs">
            <span
              className={cn(
                "font-medium mr-2",
                trend.isPositive ? "text-success" : trend.isPositive === false ? "text-destructive" : "text-muted-foreground"
              )}
            >
              {trend.isPositive ? "+" : trend.isPositive === false ? "-" : ""}{Math.abs(trend.value)}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

