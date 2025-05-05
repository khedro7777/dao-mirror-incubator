
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProposalCard from "@/components/cards/ProposalCard";
import { Search, ChevronDown, Filter, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Explore Page Component
 * 
 * This page displays all available contracts with filtering options.
 * Supports searching, category filtering, and status filtering.
 */
const Explore = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("All Time");

  // Sample data for contracts/proposals
  const contracts = [
    {
      title: "Office Supplies Group Purchase",
      author: "TechCorp",
      authorRole: "Supplier",
      description: "Joint purchase of office supplies for Q3 2023. Looking for 5 more participants to reach volume discount.",
      status: "Active",
      votes: { yes: 12, no: 2, abstain: 1 },
      endDate: "Jun 15, 2023",
      category: "Group Buying",
    },
    {
      title: "Marketing Services Bundle",
      author: "MarketPro",
      authorRole: "Supplier",
      description: "Group purchase for digital marketing services including SEO, PPC, and social media management.",
      status: "Active",
      votes: { yes: 8, no: 1, abstain: 2 },
      endDate: "Jun 18, 2023",
      category: "Group Buying",
    },
    {
      title: "Mobile App Development",
      author: "StartupX",
      authorRole: "Investor",
      description: "Seeking funding for final development phase of our innovative mobile application.",
      status: "Active",
      votes: { yes: 8, no: 3, abstain: 0 },
      endDate: "Jun 20, 2023",
      category: "Funding",
    },
    {
      title: "Sustainable Packaging Initiative",
      author: "EcoPackage",
      authorRole: "Supplier",
      description: "Looking for businesses to join our sustainable packaging initiative for bulk ordering.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jul 5, 2023",
      category: "Group Buying",
    },
    {
      title: "Website Redesign Project",
      author: "DesignPro",
      authorRole: "Freelancer",
      description: "Professional UI/UX designer needed for complete website redesign. 3-week project.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jun 25, 2023",
      category: "Freelance",
    },
    {
      title: "E-commerce Platform Funding",
      author: "ShopTech",
      authorRole: "Investor",
      description: "Seeking investment for an innovative e-commerce platform focused on sustainable products.",
      status: "Active",
      votes: { yes: 15, no: 5, abstain: 2 },
      endDate: "Jun 30, 2023",
      category: "Funding",
    },
    {
      title: "Content Writing Services",
      author: "ContentCreator",
      authorRole: "Freelancer",
      description: "Professional content writer available for blog posts, articles, and website content.",
      status: "Active",
      votes: { yes: 6, no: 0, abstain: 1 },
      endDate: "Jun 22, 2023",
      category: "Freelance",
    },
    {
      title: "Hardware Procurement Deal",
      author: "TechSupplier",
      authorRole: "Supplier",
      description: "Bulk purchase of computer hardware for small businesses. Join to get wholesale prices.",
      status: "Closed",
      votes: { yes: 20, no: 2, abstain: 0 },
      endDate: "Jun 1, 2023",
      category: "Group Buying",
    },
    // Added more sample contracts
    {
      title: "Solar Panels Collective Purchase",
      author: "GreenEnergy",
      authorRole: "Supplier",
      description: "Group purchase of solar panels for businesses looking to reduce energy costs and carbon footprint.",
      status: "Active",
      votes: { yes: 18, no: 0, abstain: 1 },
      endDate: "Jul 10, 2023",
      category: "Group Buying",
    },
    {
      title: "AI Research Funding",
      author: "TechInnovate",
      authorRole: "Investor",
      description: "Seeking funding partners for groundbreaking AI research project with commercial applications.",
      status: "Active",
      votes: { yes: 10, no: 2, abstain: 0 },
      endDate: "Jul 3, 2023",
      category: "Funding",
    },
    {
      title: "Mobile App UI/UX Design",
      author: "DesignStudio",
      authorRole: "Freelancer",
      description: "Expert UI/UX designer available for mobile application projects. Specialized in fintech and health apps.",
      status: "Active",
      votes: { yes: 5, no: 0, abstain: 0 },
      endDate: "Jun 28, 2023",
      category: "Freelance",
    },
  ] as const;

  // Filter the contracts based on search term and filters
  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === "All" || contract.category === categoryFilter;
    
    const matchesStatus = 
      statusFilter === "All" || contract.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories and statuses for filters
  const categories = ["All", ...new Set(contracts.map((c) => c.category))];
  const statuses = ["All", ...new Set(contracts.map((c) => c.status))];
  const dateRanges = ["All Time", "This Week", "This Month", "Last 30 Days"];

  return (
    <Layout>
      {/* ==== PAGE HEADER ==== */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Contracts</h1>
        <p className="text-gray-300">
          Discover and participate in active contracts across all categories
        </p>
      </div>

      {/* ==== SEARCH AND FILTER SECTION ==== */}
      <Card className="p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
          {/* Search Input */}
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search contracts..."
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

      {/* ==== CONTRACTS STATISTICS SUMMARY ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 border-primary/30">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Contracts</p>
              <p className="text-2xl font-bold text-white">{contracts.length}</p>
            </div>
            <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-green-500/30">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Contracts</p>
              <p className="text-2xl font-bold text-white">{contracts.filter(c => c.status === 'Active').length}</p>
            </div>
            <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-amber-500/30">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending Contracts</p>
              <p className="text-2xl font-bold text-white">{contracts.filter(c => c.status === 'Pending').length}</p>
            </div>
            <div className="h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-blue-500/30">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Closed Contracts</p>
              <p className="text-2xl font-bold text-white">{contracts.filter(c => c.status === 'Closed').length}</p>
            </div>
            <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* ==== CONTRACTS GRID ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <ProposalCard
              key={contract.title}
              title={contract.title}
              author={contract.author}
              authorRole={contract.authorRole}
              description={contract.description}
              status={contract.status}
              votes={contract.votes}
              endDate={contract.endDate}
              category={contract.category}
            />
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-400">
            No contracts found matching your search criteria.
          </div>
        )}
      </div>

      {/* ==== CREATE NEW CONTRACT BUTTON (FIXED) ==== */}
      <div className="fixed bottom-6 right-6">
        <a
          href="/contracts/create"
          className="flex items-center justify-center h-14 w-14 rounded-full bg-primary hover:bg-primary/80 text-white shadow-lg transition-colors"
          aria-label="Create new contract"
        >
          <span className="text-2xl font-semibold">+</span>
        </a>
      </div>
    </Layout>
  );
};

export default Explore;
