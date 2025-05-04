
import React from "react";
import { cn } from "@/lib/utils";

interface ProposalCardProps {
  title: string;
  author: string;
  authorRole: "Supplier" | "Investor" | "Freelancer";
  description: string;
  status: "Active" | "Pending" | "Closed";
  votes?: {
    yes: number;
    no: number;
    abstain: number;
  };
  endDate?: string;
  category: string;
  className?: string;
}

const ProposalCard = ({
  title,
  author,
  authorRole,
  description,
  status,
  votes,
  endDate,
  category,
  className,
}: ProposalCardProps) => {
  // Calculate progress percentage if votes exist
  const totalVotes = votes ? votes.yes + votes.no + votes.abstain : 0;
  const yesPercentage = votes && totalVotes > 0 ? (votes.yes / totalVotes) * 100 : 0;
  
  // Determine status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  // Determine role color
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "supplier":
        return "bg-blue-600";
      case "investor":
        return "bg-purple-600";
      case "freelancer":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className={cn("proposal-card", className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-sidebar-accent text-gray-300">
            {category}
          </span>
          <span className={cn("ml-2 text-xs font-medium px-2 py-1 rounded-full", getStatusColor(status))}>
            {status}
          </span>
        </div>
        {endDate && (
          <span className="text-xs text-gray-400">Ends {endDate}</span>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs">
            {author.substring(0, 2).toUpperCase()}
          </div>
          <span className="ml-2 text-sm text-gray-300">{author}</span>
        </div>
        <span className={cn("ml-2 text-xs font-medium px-2 py-1 rounded-full", getRoleColor(authorRole))}>
          {authorRole}
        </span>
      </div>
      
      <p className="text-sm text-gray-300 mb-4 line-clamp-2">{description}</p>
      
      {votes && (
        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Yes: {votes.yes}</span>
            <span>No: {votes.no}</span>
            <span>Abstain: {votes.abstain}</span>
          </div>
          <div className="h-2 w-full bg-sidebar-accent rounded overflow-hidden">
            <div
              className="h-full bg-primary rounded"
              style={{ width: `${yesPercentage}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="mt-4">
        <a 
          href="#" 
          className="inline-block px-4 py-2 bg-primary hover:bg-primary/80 rounded text-white text-sm font-medium transition-colors"
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProposalCard;
