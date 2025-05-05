
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { votingService } from "@/services/votingService";

interface ProposalItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
  status: string;
  contractId: string;
  category: string;
  price: number | null;
  currency: string | null;
}

export const useProposals = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Mock proposals data - in production, this would be fetched from API
  const proposals = [
    {
      id: "1",
      title: "Allocate budget for marketing campaign",
      description: "Proposal to allocate $50,000 for Q2 marketing campaign focusing on digital channels.",
      createdAt: "2024-05-01T08:30:00Z",
      createdBy: "Marketing Team",
      status: "Active",
      contractId: "c1",
      category: "funding",
      price: 50000,
      currency: "USD"
    },
    {
      id: "2",
      title: "Expand product line with new offerings",
      description: "Adding three new product variants to our existing catalog by Q3 2024.",
      createdAt: "2024-04-29T14:15:00Z",
      createdBy: "Product Development",
      status: "Closed",
      contractId: "c2",
      category: "group-buying",
      price: 75000,
      currency: "USD"
    },
    {
      id: "3",
      title: "Set quarterly sales targets",
      description: "Setting sales targets for Q3 2024 with 15% increase over previous quarter.",
      createdAt: "2024-04-26T11:20:00Z", 
      createdBy: "Sales Department",
      status: "Closed",
      contractId: "c3",
      category: "funding",
      price: null,
      currency: null
    },
    {
      id: "4",
      title: "Hire additional software developers",
      description: "Proposal to add 3 senior developers to the team to accelerate product development.",
      createdAt: "2024-05-02T09:45:00Z",
      createdBy: "Engineering Team",
      status: "Active",
      contractId: "c4",
      category: "freelance",
      price: 30000,
      currency: "USD"
    }
  ];
  
  // Check if user can submit proposals
  const canSubmitProposal = () => {
    if (!user || !user.roles) return false;
    return votingService.canUserSubmitProposal(user.roles[0]);
  };
  
  // Filter proposals that are relevant to the user's role
  const getRelevantProposals = () => {
    if (!user || !user.roles) return [];
    return votingService.getRelevantProposalsForUser(proposals, user.roles[0]);
  };
  
  // Apply filters (search, status, category)
  const getFilteredProposals = () => {
    return getRelevantProposals().filter(proposal => {
      // Filter by search query
      const matchesQuery = searchQuery === "" || 
        proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by status
      const matchesStatus = statusFilter === "All" || proposal.status === statusFilter;
      
      // Filter by category
      const matchesCategory = categoryFilter === "all" || proposal.category === categoryFilter;
      
      return matchesQuery && matchesStatus && matchesCategory;
    });
  };

  // Check if user has voting access
  const hasUserVoteAccess = () => {
    return user?.roles?.includes('supplier') || false;
  };

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    filteredProposals: getFilteredProposals(),
    canSubmitProposal: canSubmitProposal(),
    hasUserVoteAccess: hasUserVoteAccess()
  };
};
