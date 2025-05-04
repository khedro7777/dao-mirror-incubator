
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProposalCard from "@/components/cards/ProposalCard";
import { Search, ChevronDown } from "lucide-react";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);

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

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Explore Contracts</h1>
        <p className="text-gray-300">
          Discover and participate in active contracts across all categories
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
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
          
          {/* Filter Controls */}
          <div className="flex gap-4 w-full md:w-auto">
            {/* Category Filter */}
            <div className="relative w-1/2 md:w-auto">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="relative w-1/2 md:w-auto">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contracts Grid */}
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

      {/* Create New Contract Button (Fixed) */}
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
