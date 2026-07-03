"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiGithub, FiPlus, FiTrash2, FiBox } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/services/api";

export default function NewDeploymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);
  
  const [formData, setFormData] = useState({
    repository: "",
    projectName: "",
    branch: "main",
    buildCommand: "npm run build",
    outputDir: ".next",
  });

  const handleAddEnv = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const handleRemoveEnv = (index) => {
    setEnvVars(envVars.filter((_, i) => i !== index));
  };

  const handleEnvChange = (index, field, value) => {
    const newVars = [...envVars];
    newVars[index][field] = value;
    setEnvVars(newVars);
  };

  const handleDeploy = async (e) => {
    e.preventDefault();
    if (!formData.repository || !formData.projectName) return;
    
    setLoading(true);
    try {
      const deployment = await api.createDeployment(formData);
      router.push(`/deployments/${deployment.id}`);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Deploy a new Project</h1>
        <p className="text-muted-foreground mt-1">Import your existing repository or create a new one.</p>
      </div>

      <form onSubmit={handleDeploy} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FiGithub className="w-5 h-5" />
              <span>Import Git Repository</span>
            </CardTitle>
            <CardDescription>Select a repository from your GitHub account or enter a public URL.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Repository URL</label>
              <Input 
                placeholder="https://github.com/username/repo" 
                value={formData.repository}
                onChange={e => setFormData({...formData, repository: e.target.value})}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Project Name</label>
                <Input 
                  placeholder="my-awesome-app" 
                  value={formData.projectName}
                  onChange={e => setFormData({...formData, projectName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Branch</label>
                <Input 
                  placeholder="main" 
                  value={formData.branch}
                  onChange={e => setFormData({...formData, branch: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FiBox className="w-5 h-5" />
              <span>Build and Output Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Build Command</label>
              <Input 
                placeholder="npm run build" 
                value={formData.buildCommand}
                onChange={e => setFormData({...formData, buildCommand: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Directory</label>
              <Input 
                placeholder=".next" 
                value={formData.outputDir}
                onChange={e => setFormData({...formData, outputDir: e.target.value})}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Add environment variables for your build and runtime.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {envVars.map((env, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Input 
                  placeholder="KEY" 
                  className="font-mono text-sm"
                  value={env.key}
                  onChange={e => handleEnvChange(index, "key", e.target.value)}
                />
                <Input 
                  placeholder="VALUE" 
                  className="font-mono text-sm"
                  value={env.value}
                  onChange={e => handleEnvChange(index, "value", e.target.value)}
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="shrink-0"
                  onClick={() => handleRemoveEnv(index)}
                  disabled={envVars.length === 1 && !env.key && !env.value}
                >
                  <FiTrash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={handleAddEnv} className="mt-2">
              <FiPlus className="w-4 h-4 mr-2" />
              Add Environment Variable
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-3 border-t border-border pt-6">
            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading}>
              Deploy
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

