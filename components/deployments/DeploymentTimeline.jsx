"use client";

import { cn } from "@/lib/utils";
import { FiCheck, FiX, FiLoader } from "react-icons/fi";
import { motion } from "framer-motion";



const steps = ["Queued", "Building", "Uploading", "Ready"];

export function DeploymentTimeline({status }) {
  
  const getStepStatus = (step, currentStatus) => {
    if (currentStatus === "Failed") {
      if (step === "Queued" || step === "Building") return "failed";
      return "pending";
    }

    const currentIndex = steps.indexOf(currentStatus);
    const stepIndex = steps.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "pending";
  };

  return (
    <div className="w-full">
      <div className="relative flex justify-between">
        {/* Connecting line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-border -z-10" />
        
        {/* Animated progress line */}
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary -z-10"
          initial={{ width: "0%" }}
          animate={{ 
            width: status === "Failed" ? "50%" : 
                   status === "Ready" ? "100%" : 
                   `${(steps.indexOf(status) / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const stepStatus = getStepStatus(step, status);
          
          return (
            <div key={step} className="flex flex-col items-center bg-card px-2">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-300",
                  stepStatus === "completed" ? "bg-primary border-primary text-primary-foreground" :
                  stepStatus === "current" ? "bg-background border-primary text-primary" :
                  stepStatus === "failed" ? "bg-destructive border-destructive text-destructive-foreground" :
                  "bg-background border-border text-muted-foreground"
                )}
              >
                {stepStatus === "completed" ? <FiCheck className="w-4 h-4" /> :
                 stepStatus === "failed" ? <FiX className="w-4 h-4" /> :
                 stepStatus === "current" ? <FiLoader className="w-4 h-4 animate-spin" /> :
                 <div className="w-2 h-2 rounded-full bg-border" />}
              </div>
              <span className={cn(
                "mt-2 text-xs font-medium",
                stepStatus === "current" || stepStatus === "completed" ? "text-foreground" : "text-muted-foreground"
              )}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

