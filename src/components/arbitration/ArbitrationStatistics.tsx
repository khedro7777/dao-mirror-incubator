
import React from "react";
import { Card } from "@/components/ui/card";
import { Scale, Calendar, Shield } from "lucide-react";

interface ArbitrationStatisticsProps {
  totalCases: number;
  activeCount: number;
  scheduledCount: number;
  resolvedCount: number;
}

/**
 * Statistics panel for the Arbitration Center
 * Displays counts of total, active, scheduled and resolved cases
 */
const ArbitrationStatistics: React.FC<ArbitrationStatisticsProps> = ({
  totalCases,
  activeCount,
  scheduledCount,
  resolvedCount
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4 border-primary/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Cases</p>
            <p className="text-2xl font-bold text-white">{totalCases}</p>
          </div>
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Scale className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-amber-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">In Progress</p>
            <p className="text-2xl font-bold text-white">{activeCount}</p>
          </div>
          <div className="h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Scale className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-blue-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Scheduled</p>
            <p className="text-2xl font-bold text-white">{scheduledCount}</p>
          </div>
          <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Calendar className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-green-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Resolved</p>
            <p className="text-2xl font-bold text-white">{resolvedCount}</p>
          </div>
          <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <Shield className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ArbitrationStatistics;
