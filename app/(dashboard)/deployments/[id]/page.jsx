"use client";

import { use, useEffect, useState } from "react";
import { FiGithub, FiExternalLink, FiClock, FiGitBranch, FiGitCommit } from "react-icons/fi";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DeploymentTimeline } from "@/components/deployments/DeploymentTimeline";
import { LogViewer } from "@/components/deployments/LogViewer";
import { Skeleton } from "@/components/ui/Skeleton";
import { formatDistanceToNow } from "date-fns";

export default function DeploymentDetailsPage(props) {
  const params = use(props.params);
  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await api.getDeployment(params.id);
      setDeployment(data);
      setLoading(false);
      
      // If deployment is active, poll for updates
      if (data && (data.status === "Queued" || data.status === "Building" || data.status === "Uploading")) {
        const interval = setInterval(async () => {
          const updated = await api.getDeployment(params.id);
          if (updated) {
            setDeployment(updated);
            if (updated.status === "Ready" || updated.status === "Failed") {
              clearInterval(interval);
            }
          }
        }, 3000);
        return () => clearInterval(interval);
      }
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="py-12 text-center border border-border border-dashed rounded-xl bg-card">
        <p className="text-muted-foreground">Deployment not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold tracking-tight">{deployment.projectName}</h1>
          <StatusBadge status={deployment.status} />
        </div>
        {deployment.url && deployment.status === "Ready" && (
          <a
            href={`https://${deployment.url}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 text-sm font-medium text-primary hover:underline underline-offset-4 bg-primary/10 px-4 py-2 rounded-md transition-colors"
          >
            <span>Visit Application</span>
            <FiExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Repository</span>
              <div className="flex items-center space-x-2 text-sm font-medium">
                <FiGithub className="w-4 h-4" />
                <span>johndoe/{deployment.projectName}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Commit</span>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2 text-sm font-medium">
                  <FiGitBranch className="w-4 h-4" />
                  <span>{deployment.branch}</span>
                  <span className="text-muted-foreground">•</span>
                  <FiGitCommit className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono text-xs">{deployment.commitSha.substring(0, 7)}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-1 truncate">{deployment.commitMessage}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Created</span>
              <div className="flex items-center space-x-2 text-sm font-medium">
                <FiClock className="w-4 h-4 text-muted-foreground" />
                <span>{formatDistanceToNow(new Date(deployment.createdAt), { addSuffix: true })}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Deployment ID</span>
              <div className="flex items-center text-sm font-medium font-mono text-muted-foreground">
                {deployment.id}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-8">
          <CardTitle className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <DeploymentTimeline status={deployment.status} />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground px-1">Build Logs</h3>
        <LogViewer status={deployment.status} />
      </div>
    </div>
  );
}
