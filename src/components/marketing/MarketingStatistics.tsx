
import React from "react";
import { Card } from "@/components/ui/card";
import { Megaphone } from "lucide-react";
import { MarketingContract } from "@/types/marketing";

interface MarketingStatisticsProps {
  contracts: MarketingContract[];
}

const MarketingStatistics = ({ contracts }: MarketingStatisticsProps) => {
  const activeContracts = contracts.filter(c => c.status === 'Active').length;
  const pendingContracts = contracts.filter(c => c.status === 'Pending').length;
  const closedContracts = contracts.filter(c => c.status === 'Closed').length || 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4 border-primary/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Contracts</p>
            <p className="text-2xl font-bold text-white">{contracts.length}</p>
          </div>
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
            <Megaphone className="h-5 w-5 text-primary" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-green-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Active Contracts</p>
            <p className="text-2xl font-bold text-white">{activeContracts}</p>
          </div>
          <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <Megaphone className="h-5 w-5 text-green-500" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-amber-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Pending Contracts</p>
            <p className="text-2xl font-bold text-white">{pendingContracts}</p>
          </div>
          <div className="h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center">
            <Megaphone className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      </Card>
      
      <Card className="p-4 border-blue-500/30">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Closed Contracts</p>
            <p className="text-2xl font-bold text-white">{closedContracts}</p>
          </div>
          <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
            <Megaphone className="h-5 w-5 text-blue-500" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MarketingStatistics;
