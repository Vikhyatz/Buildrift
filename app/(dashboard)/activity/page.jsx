"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import { FiCheckCircle, FiXCircle, FiPlusCircle, FiSettings } from "react-icons/fi";
import { api } from "@/services/api";
import { Card, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

const activityIcons = {
  deployment_success: { icon: FiCheckCircle, color: "text-success", bg: "bg-success/10", border: "border-success/20" },
  deployment_failed: { icon: FiXCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
  project_created: { icon: FiPlusCircle, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  settings_updated: { icon: FiSettings, color: "text-muted-foreground", bg: "bg-secondary", border: "border-border" },
};

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getActivity();
      setActivities(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Activity</h1>
        <p className="text-muted-foreground mt-1">Review the history of events across all your projects.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : activities.length > 0 ? (
            <div className="relative border-l border-border ml-4 space-y-8 pb-4">
              {activities.map((activity, idx) => {
                const style = activityIcons[activity.type] || activityIcons.settings_updated;
                const Icon = style.icon;

                return (
                  <div key={activity.id} className="relative pl-8">
                    {/* Timeline dot */}
                    <div className={cn(
                      "absolute -left-[17px] top-1 w-8 h-8 rounded-full border-2 bg-card flex items-center justify-center",
                      style.border
                    )}>
                      <Icon className={cn("w-4 h-4", style.color)} />
                    </div>

                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-tight">
                        {activity.description}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <span>{formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}</span>
                        <span>â€¢</span>
                        <span>{format(new Date(activity.timestamp), "MMM d, yyyy h:mm a")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No recent activity.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

