
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface MarketingFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filterMenuOpen: boolean;
  setFilterMenuOpen: (open: boolean) => void;
  selectedDateRange: string;
  setSelectedDateRange: (range: string) => void;
  categories: string[];
  statuses: string[];
  dateRanges: string[];
}

const MarketingFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  filterMenuOpen,
  setFilterMenuOpen,
  selectedDateRange,
  setSelectedDateRange,
  categories,
  statuses,
  dateRanges,
}: MarketingFiltersProps) => {
  const { t } = useTranslation();

  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
        {/* Search Input */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search marketing contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-sidebar rounded-lg border border-sidebar-border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        {/* Advanced Filter Toggle */}
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setFilterMenuOpen(!filterMenuOpen)}
        >
          <Filter className="h-4 w-4" />
          Advanced Filters
          <ChevronDown className={`h-4 w-4 transform transition-transform ${filterMenuOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {/* Advanced Filter Options */}
      {filterMenuOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 border-t border-sidebar-border pt-4">
          {/* Category Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Status Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {/* Date Range Filter */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-400 mb-1">Date Range</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {dateRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default MarketingFilters;
