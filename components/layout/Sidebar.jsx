"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiBox, FiActivity, FiSettings, FiGrid } from "react-icons/fi";
import { cn } from "@/lib/utils";

import { IoIosLogOut } from "react-icons/io";
import { signOut } from "next-auth/react";

import { useSession } from "next-auth/react";

const navItems = [
  { name: "Dashboard", href: "/", icon: FiHome },
  { name: "Deployments", href: "/deployments", icon: FiBox },
  { name: "Projects", href: "/projects", icon: FiGrid },
  { name: "Activity", href: "/activity", icon: FiActivity },
  { name: "Settings", href: "/settings", icon: FiSettings },
];

export default function Sidebar() {

  
  
  const pathname = usePathname();
  const {data: session, status} = useSession();
  
  if(status == "loading") return "loading..."

  return (
    <aside className="w-64 border-r border-border bg-card flex-shrink-0 h-screen sticky top-0 flex flex-col hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
          <svg
            className="w-5 h-5 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="font-bold text-lg tracking-tight">Buildrift</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // Adjust active state matching because some routes are subroutes
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 group relative",
                isActive
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 flex-shrink-0 h-5 w-5 transition-colors duration-200",
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}
                aria-hidden="true"
              />
              {item.name}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-md" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold border border-border">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">{session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1)}</span>
          </div>
          <button onClick={signOut} className="ml-4 p-2 rounded-xl border-1 border-solid border-white">
            <IoIosLogOut />
          </button>
        </div>
      </div>
    </aside>
  );
}

