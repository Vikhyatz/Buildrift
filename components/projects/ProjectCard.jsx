import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FiGithub, FiExternalLink, FiSettings } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";



export function ProjectCard({project }) {
  return (
    <Card className="hover:border-primary/50 transition-all duration-200 group flex flex-col h-full">
      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
              {/* Fallback framework icon */}
              <span className="font-bold text-sm">{project.name.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <Link href={`/projects/${project.id}`} className="font-semibold text-lg hover:underline decoration-primary underline-offset-4 line-clamp-1">
                {project.name}
              </Link>
              <div className="flex items-center text-xs text-muted-foreground mt-0.5 space-x-1 hover:text-foreground transition-colors cursor-pointer">
                <FiGithub className="w-3.5 h-3.5" />
                <span>{project.repository}</span>
              </div>
            </div>
          </div>
          
          <button className="text-muted-foreground hover:bg-secondary p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100">
            <FiSettings className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-auto pt-6 flex items-center justify-between">
          <div className="flex flex-col space-y-1.5">
            <div className="text-xs text-muted-foreground flex items-center space-x-2">
              <span className="font-medium">{project.framework}</span>
              <span>â€¢</span>
              <span>{formatDistanceToNow(new Date(project.lastDeploymentAt), { addSuffix: true })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <StatusBadge status={project.lastDeploymentStatus} />
              {project.lastDeploymentStatus === "Ready" && (
                <a 
                  href={`https://${project.url}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  <span className="truncate max-w-[120px]">{project.url}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

