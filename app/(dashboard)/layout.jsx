'use client'
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

import { useSession } from "next-auth/react";
import PageLoader from "@/components/ui/Loader";

export default function DashboardLayout({children,
}) {

  const {data: session, status} = useSession();
  
  if(status == "loading") return <PageLoader />
  console.log("hello there", session)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar name={session.user.name}/>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

