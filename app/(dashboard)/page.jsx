"use client";

import { useEffect, useState } from "react";
import { FiBox, FiActivity, FiXCircle, FiCheckCircle } from "react-icons/fi";
import { StatsCard } from "@/components/ui/StatsCard";
import { DeploymentCard } from "@/components/deployments/DeploymentCard";
import { api } from "@/services/api";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";

import { useSession } from "next-auth/react";

export default function DashboardPage() {

  const { data: session, status } = useSession();

  console.log(session)

  
  
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      const data = await api.getDeployments();
      setDeployments(data);
      setLoading(false);
    }
    loadData();
  }, []);


  if (status == "loading") return "Loading..."

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <Link href="/deployments/new">
          <Button>New Deployment</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Deployments"
          value={deployments.length}
          icon={FiBox}
          trend={{ value: 12, label: "from last month", isPositive: true }}
        />
        <StatsCard
          title="Active Deployments"
          value={deployments.filter(d => d.status === "Building" || d.status === "Uploading" || d.status === "Queued").length}
          icon={FiActivity}
        />
        <StatsCard
          title="Failed Deployments"
          value={deployments.filter(d => d.status === "Failed").length}
          icon={FiXCircle}
          trend={{ value: 2, label: "from last week", isPositive: false }}
        />
        <StatsCard
          title="Successful Deployments"
          value={deployments.filter(d => d.status === "Ready").length}
          icon={FiCheckCircle}
          trend={{ value: 8, label: "from last week", isPositive: true }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Deployments</h2>
          <Link href="/deployments" className="text-sm text-primary hover:underline underline-offset-4">
            View all
          </Link>
        </div>
        
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : deployments.length > 0 ? (
          <div className="grid gap-4">
            {deployments.slice(0, 5).map(dep => (
              <DeploymentCard key={dep.id} deployment={dep} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border border-border border-dashed rounded-xl bg-card">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4">
              <FiBox className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No deployments yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-6 text-center max-w-sm">
              Connect your GitHub repository and deploy your first application to get started.
            </p>
            <Link href="/deployments/new">
              <Button>Deploy Application</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

