
import React from "react";
import { cn } from "@/lib/utils";

type KycStatus = "Not Started" | "In Review" | "Verified";

interface KycStatusCardProps {
  status: KycStatus;
  className?: string;
}

const KycStatusCard = ({ status, className }: KycStatusCardProps) => {
  // Determine progress percentage based on status
  const getProgressPercentage = (status: KycStatus) => {
    switch (status) {
      case "Not Started":
        return 0;
      case "In Review":
        return 50;
      case "Verified":
        return 100;
      default:
        return 0;
    }
  };

  // Determine color based on status
  const getStatusColor = (status: KycStatus) => {
    switch (status) {
      case "Not Started":
        return "bg-gray-500";
      case "In Review":
        return "bg-yellow-500";
      case "Verified":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const progressPercentage = getProgressPercentage(status);
  const statusColor = getStatusColor(status);

  return (
    <div className={cn("bg-card rounded-lg p-6 border border-sidebar-border", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">KYC Verification Status</h3>
        <span className={cn("px-3 py-1 rounded-full text-xs font-medium", statusColor)}>
          {status}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="h-2 w-full bg-sidebar-accent rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full", statusColor)}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 text-center text-xs">
        <div className={cn("font-medium", status === "Not Started" ? "text-gray-300" : "text-gray-400")}>
          Not Started
        </div>
        <div className={cn("font-medium", status === "In Review" ? "text-yellow-500" : "text-gray-400")}>
          In Review
        </div>
        <div className={cn("font-medium", status === "Verified" ? "text-green-500" : "text-gray-400")}>
          Verified
        </div>
      </div>
      
      {status === "Not Started" && (
        <div className="mt-4">
          <a 
            href="/kyc/start" 
            className="inline-block w-full px-4 py-2 bg-primary hover:bg-primary/80 rounded text-white text-center text-sm font-medium transition-colors"
          >
            Start KYC Process
          </a>
        </div>
      )}
      
      {status === "In Review" && (
        <p className="mt-4 text-sm text-gray-400 text-center">
          We're reviewing your information. This usually takes 1-2 business days.
        </p>
      )}
    </div>
  );
};

export default KycStatusCard;
