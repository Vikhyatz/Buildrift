"use client";

import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";



const mockLogs = [
  "[INFO] Preparing deployment container...",
  "[INFO] Cloning repository johndoe/my-portfolio...",
  "[INFO] Found package.json, installing dependencies...",
  "[INFO] > npm install",
  "[INFO] added 120 packages, and audited 121 packages in 3s",
  "[INFO] Running build command...",
  "[INFO] > npm run build",
  "[INFO] Next.js 14.x.x",
  "[INFO] Creating an optimized production build...",
  "[INFO] âœ“ Compiled successfully",
  "[INFO] Uploading artifacts...",
  "[SUCCESS] Deployment ready."
];

export function LogViewer({status }) {
  const [logs, setLogs] = useState([]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef();

  // Simulate streaming logs
  useEffect(() => {
    if (status === "Queued") {
      setLogs(["[INFO] Waiting for runner..."]);
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < mockLogs.length) {
        setLogs((prev) => [...prev, mockLogs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500); // add a log every 500ms

    return () => clearInterval(interval);
  }, [status]);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const copyLogs = () => {
    navigator.clipboard.writeText(logs.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg border border-border bg-[#000000] overflow-hidden flex flex-col h-[400px]">
      <div className="flex items-center justify-between px-4 py-2 bg-secondary/30 border-b border-border/50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive" />
          <div className="w-3 h-3 rounded-full bg-warning" />
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="ml-2 text-xs font-mono text-muted-foreground">Build Logs</span>
        </div>
        <button 
          onClick={copyLogs}
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Copy logs"
        >
          {copied ? <FiCheck className="w-4 h-4 text-success" /> : <FiCopy className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs sm:text-sm leading-relaxed">
        {logs.map((log, i) => (
          
          <div key={i} className="mb-1">
            <span className="text-muted-foreground mr-3">{String(i + 1).padStart(3, "0")}</span>
            <span className={
              log?.includes("[ERROR]") ? "text-destructive" :
              log?.includes("[SUCCESS]") ? "text-success" :
              log?.includes("npm") ? "text-primary/80" :
              "text-foreground/90"
            }>
              {log}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}

