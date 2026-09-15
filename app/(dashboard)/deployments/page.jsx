"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { useSession } from "next-auth/react";

export default function ProjectsPage() {

    const { data: session, status } = useSession();

    console.log(session)

    const [deployments, setDeployments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadData() {
            const response = await fetch(`/api/fetchDeployment/?id=${session.user.id}`)
            const data = await response.json();
            setDeployments(data.deployments);
            setLoading(false);
        }
        if (session) {
            loadData();
        }
    }, [session]);

    const filteredDeployment = deployments.filter(p =>
        p.projectName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Deployments</h1>
                <Link href="/deployments/new">
                    <Button className="w-full sm:w-auto">
                        <FiPlus className="w-4 h-4 mr-2" />
                        Add New Deployments
                    </Button>
                </Link>
            </div>

            <div className="max-w-md">
                <Input
                    type="search"
                    placeholder="Search deployments..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                    ))}
                </div>
            ) : filteredDeployment.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDeployment.map(deployment => (
                        <ProjectCard key={deployment._id} project={deployment} name={session.user.name} />
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center border border-border border-dashed rounded-xl bg-card">
                    <p className="text-muted-foreground">No projects found.</p>
                </div>
            )}
        </div>
    );
}

