
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, Filter } from "lucide-react";

interface ArbitrationSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  statuses: string[];
}

/**
 * Search and filter component for arbitration cases
 */
const ArbitrationSearch: React.FC<ArbitrationSearchProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  statuses
}) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  return (
    <Card className="p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-sidebar border-sidebar-border text-white"
          />
        </div>
        
        <div className="w-full md:w-1/4 relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <Button variant="outline" onClick={() => setFilterMenuOpen(!filterMenuOpen)} className="w-full md:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>
      
      {filterMenuOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-sidebar-border">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Date Filed</label>
            <Input type="date" className="bg-sidebar border-sidebar-border text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2">
              <option>All Categories</option>
              <option>Payment</option>
              <option>Deliverables</option>
              <option>Contract Terms</option>
              <option>IP Rights</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="w-full">Apply Filters</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ArbitrationSearch;
