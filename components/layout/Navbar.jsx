"use client";

import { FiSearch, FiBell } from "react-icons/fi";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex-1 max-w-lg">
        <div 
          className={cn(
            "relative flex items-center w-full rounded-md border bg-background/50 px-3 py-1.5 transition-colors duration-200",
            isSearchFocused ? "border-primary ring-1 ring-primary/20" : "border-border hover:border-muted-foreground/30"
          )}
        >
          <FiSearch className="w-4 h-4 text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search projects, deployments..."
            className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground text-foreground"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          <div className="hidden sm:flex items-center space-x-1">
            <kbd className="inline-flex items-center rounded border border-border px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">âŒ˜</span>K
            </kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-4">
        <button className="relative p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <FiBell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card" />
        </button>
        <div className="w-px h-6 bg-border" />
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Help
        </button>
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          Docs
        </button>
      </div>
    </header>
  );
}

