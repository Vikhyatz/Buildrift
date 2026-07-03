"use client";

import { useEffect, useState } from "react";
import { FiGithub, FiUser, FiBell, FiMonitor, FiLogOut } from "react-icons/fi";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await api.getUser();
      setUser(data);
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 800);
  };

  if (loading) {
    return (
      <div className="max-w-3xl space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[200px_1fr] items-start">
        <nav className="flex flex-col space-y-1">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md bg-secondary text-foreground font-medium text-sm transition-colors">
            <FiUser className="w-4 h-4" />
            <span>Profile</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium text-sm transition-colors">
            <FiGithub className="w-4 h-4" />
            <span>Integrations</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium text-sm transition-colors">
            <FiMonitor className="w-4 h-4" />
            <span>Preferences</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 rounded-md text-muted-foreground hover:bg-secondary/50 hover:text-foreground font-medium text-sm transition-colors mt-4">
            <FiBell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
        </nav>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>This is how others will see you on the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center border border-border text-lg font-bold text-muted-foreground">
                  {user?.avatar}
                </div>
                <Button variant="outline" size="sm">Change Avatar</Button>
              </div>

              <div className="grid gap-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Display Name</label>
                  <Input defaultValue={user?.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" defaultValue={user?.email} />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">Please use a valid email address.</p>
              <Button onClick={handleSave} isLoading={saving}>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>Connect your GitHub account to import and deploy repositories.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                <div className="flex items-center space-x-4">
                  <FiGithub className="w-8 h-8" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-muted-foreground">
                      {user?.githubConnected ? "Connected" : "Not connected"}
                    </p>
                  </div>
                </div>
                <Button variant={user?.githubConnected ? "outline" : "default"}>
                  {user?.githubConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5 gap-4">
                <div>
                  <p className="font-medium text-destructive">Delete Account</p>
                  <p className="text-sm text-muted-foreground">Permanently remove your account and all projects.</p>
                </div>
                <Button variant="destructive" className="shrink-0">
                  <FiLogOut className="w-4 h-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

