import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FiGithub, FiClock, FiMoreVertical } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";



export function DeploymentCard({deployment }) {
  return (
    <Card className="hover:border-muted-foreground/30 transition-colors group">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-3">
              <Link href={`/deployments/${deployment.id}`} className="font-medium text-lg hover:underline decoration-primary underline-offset-4">
                {deployment.projectName}
              </Link>
              <StatusBadge status={deployment.status} />
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground space-x-3 mt-2">
              <div className="flex items-center space-x-1 hover:text-foreground transition-colors cursor-pointer">
                <FiGithub className="w-4 h-4" />
                <span>{deployment.branch}</span>
              </div>
              <span>â€¢</span>
              <div className="flex items-center space-x-1 hover:text-foreground transition-colors cursor-pointer font-mono text-xs">
                <span>{deployment.commitSha.substring(0, 7)}</span>
              </div>
            </div>
          </div>
          
          <button className="text-muted-foreground hover:bg-secondary p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100">
            <FiMoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center text-xs text-muted-foreground space-x-4">
          <div className="flex items-center space-x-1.5">
            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center border border-border text-[10px] font-bold">
              {deployment.creator.avatar}
            </div>
            <span>{deployment.creator.name}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{formatDistanceToNow(new Date(deployment.createdAt), { addSuffix: true })}</span>
          </div>
          {deployment.duration && (
            <div className="flex items-center space-x-1">
              <span>{deployment.duration}s</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

