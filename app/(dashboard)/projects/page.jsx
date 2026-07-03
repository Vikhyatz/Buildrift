"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await api.getProjects();
      setProjects(data);
      setLoading(false);
    }
    load();
  }, []);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
        <Link href="/deployments/new">
          <Button className="w-full sm:w-auto">
            <FiPlus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </Link>
      </div>

      <div className="max-w-md">
        <Input 
          type="search" 
          placeholder="Search projects..." 
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
      ) : filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
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

