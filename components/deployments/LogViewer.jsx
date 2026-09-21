"use client";

import { useEffect, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { toast } from "react-toastify";



// const mockLogs = [
//   "[INFO] Preparing deployment container...",
//   "[INFO] Cloning repository johndoe/my-portfolio...",
//   "[INFO] Found package.json, installing dependencies...",
//   "[INFO] > npm install",
//   "[INFO] added 120 packages, and audited 121 packages in 3s",
//   "[INFO] Running build command...",
//   "[INFO] > npm run build",
//   "[INFO] Next.js 14.x.x",
//   "[INFO] Creating an optimized production build...",
//   "[INFO] âœ“ Compiled successfully",
//   "[INFO] Uploading artifacts...",
//   "[SUCCESS] Deployment ready."
// ];

export function LogViewer({ status , depId, prevLogs}) {
  const [logs, setLogs] = useState(() => (
    Array.isArray(prevLogs) ? prevLogs : []
  ));
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef();


  const updateDeployment = async (status, logsArr, depId) => {
    try {
      const response = await fetch("/api/updateDeployment", {
        method: 'POST',
        body: JSON.stringify({
          logs: logsArr,
          status: status,
          depId: depId
        })
      })
      const data = response.json();
      console.log(data)
      if(response.ok){
        toast.success(`logs and state saved, status: ${status}`)
      }

    } catch (err) {
      console.log(error)
    }
  }


  // streaming logs
  useEffect(() => {

    const eventSource = new EventSource(
      "/api/emitLogs"
    );

    eventSource.onopen = () => {
      console.log("SSE connection opened");
    };

    eventSource.onmessage = (event) => {

      const data = JSON.parse(event.data);

      console.log(
        "Message received by browser:",
        data
      );

      if (data.type === "LOG") {
        setLogs((prevLogs) => {
          const nextLogs = [...prevLogs, data.message];
          
          const isStatusUpdate =
            data.message.includes("Queued") ||
            data.message.includes("Building") ||
            data.message.includes("Uploading") ||
            data.message.includes("Ready");

          if (isStatusUpdate) {
            // Pass the newly updated logs array, rather than the stale state value.
            updateDeployment(data.message, nextLogs, depId);
          }

          return nextLogs;
        });
      }
    };

    eventSource.onerror = (error) => {
      console.log("SSE error:", error);
    };

    return () => {
      console.log("Closing SSE");
      eventSource.close();
    };

  }, []);

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
    <div className="rounded-lg border border-border bg-[#000000] overflow-hidden flex flex-col h-100">
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

