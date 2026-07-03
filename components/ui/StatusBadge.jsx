import * as React from "react"
import { cn } from "@/lib/utils"

const statusStyles = {
  Queued: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
  Building: { bg: "bg-warning/10", text: "text-warning", dot: "bg-warning animate-pulse" },
  Uploading: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary animate-pulse" },
  Ready: { bg: "bg-success/10", text: "text-success", dot: "bg-success" },
  Failed: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
}

export function StatusBadge({status, className, ...props }) {
  const styles = statusStyles[status]

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        styles.bg,
        styles.text,
        className
      )}
      {...props}
    >
      <div className={cn("mr-1.5 h-1.5 w-1.5 rounded-full", styles.dot)} />
      {status}
    </div>
  )
}

