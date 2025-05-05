
import React from "react";
import { Card } from "@/components/ui/card";
import { Scale, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArbitrationCardProps {
  id: string;
  title: string;
  parties: string[];
  status: "In Progress" | "Scheduled" | "Resolved" | "Cancelled";
  filed: string;
  category: string;
  description: string;
}

/**
 * ArbitrationCard Component
 * 
 * Displays information about an arbitration case in the system
 * Used in the arbitration center section and arbitration listing pages
 */
const ArbitrationCard = ({
  id,
  title,
  parties,
  status,
  filed,
  category,
  description
}: ArbitrationCardProps) => {
  // Function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-amber-900 text-amber-300";
      case "Scheduled":
        return "bg-blue-900 text-blue-300";
      case "Resolved":
        return "bg-green-900 text-green-300";
      case "Cancelled":
        return "bg-red-900 text-red-300";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <Card className="p-4 border-sidebar-border hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs text-gray-400">{id}</span>
        <Badge className={`${getStatusColor(status)}`}>
          {status}
        </Badge>
      </div>
      
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      
      <div className="flex items-center gap-2 mb-2 text-sm">
        <Users className="h-4 w-4 text-gray-400" />
        <span className="text-gray-300">
          {parties.join(" vs. ")}
        </span>
      </div>
      
      <div className="flex items-center gap-2 mb-3 text-sm">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="text-gray-400">Filed: {filed}</span>
      </div>
      
      <p className="text-sm text-gray-300 mb-3">{description}</p>
      
      <div className="flex justify-between mt-2">
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>
        <a 
          href={`/arbitration/${id}`} 
          className="text-xs text-primary hover:text-primary/80"
        >
          View Details
        </a>
      </div>
    </Card>
  );
};

export default ArbitrationCard;
