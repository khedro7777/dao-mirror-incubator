
import { useState, useMemo } from "react";
import { MarketingContract } from "@/types/marketing";

const useMarketingContracts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("All Time");

  // Sample data for marketing contracts
  const contracts: MarketingContract[] = [
    {
      title: "Social Media Campaign",
      author: "MarketingPro",
      authorRole: "Marketing Agency",
      description: "Joint marketing campaign across social media platforms. Looking for 5 more businesses to share costs and expand reach.",
      status: "Active",
      votes: { yes: 14, no: 2, abstain: 1 },
      endDate: "Jun 18, 2023",
      category: "Group Marketing",
    },
    {
      title: "Email Marketing Bundle",
      author: "EmailAgency",
      authorRole: "Marketing Agency",
      description: "Group contract for comprehensive email marketing services including design, content, and analytics.",
      status: "Active",
      votes: { yes: 10, no: 1, abstain: 0 },
      endDate: "Jun 20, 2023",
      category: "Group Marketing",
    },
    {
      title: "Trade Show Participation",
      author: "ExpoGroup",
      authorRole: "Marketing Agency",
      description: "Joint participation in upcoming industry trade show to share booth costs and increase visibility.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jul 10, 2023",
      category: "Group Marketing",
    },
    {
      title: "Content Marketing Partnership",
      author: "ContentCreators",
      authorRole: "Marketing Agency",
      description: "Collaborative content marketing initiative to create and distribute industry-specific content.",
      status: "Active",
      votes: { yes: 8, no: 1, abstain: 0 },
      endDate: "Jun 25, 2023",
      category: "Group Marketing",
    },
    {
      title: "Digital Advertising Coalition",
      author: "AdSpecialists",
      authorRole: "Marketing Agency",
      description: "Group contract for digital advertising across multiple platforms to increase ROI and reach.",
      status: "Active",
      votes: { yes: 12, no: 2, abstain: 1 },
      endDate: "Jun 30, 2023",
      category: "Group Marketing",
    },
    {
      title: "Video Production Partnership",
      author: "VideoStudio",
      authorRole: "Marketing Agency",
      description: "Collaborative video production project to share costs and create high-quality marketing videos.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jul 5, 2023",
      category: "Group Marketing",
    },
  ];

  // Filter the contracts based on search term and filters
  const filteredContracts = useMemo(() => {
    return contracts.filter((contract) => {
      const matchesSearch = 
        contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === "All" || contract.category === categoryFilter;
      
      const matchesStatus = 
        statusFilter === "All" || contract.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter, contracts]);

  // Get unique categories and statuses for filters
  const categories = useMemo(() => ["All", ...new Set(contracts.map((c) => c.category))], [contracts]);
  const statuses = useMemo(() => ["All", ...new Set(contracts.map((c) => c.status))], [contracts]);
  const dateRanges = ["All Time", "This Week", "This Month", "Last 30 Days"];

  return {
    contracts,
    filteredContracts,
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
  };
};

export default useMarketingContracts;
