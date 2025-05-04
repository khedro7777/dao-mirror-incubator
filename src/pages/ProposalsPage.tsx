
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { contracts } from "@/services";

type ProposalStatus = "Active" | "Closed" | "All";

const ProposalsPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProposalStatus>("All");
  
  // Mock proposals data
  const proposals = [
    {
      id: "1",
      title: "Allocate budget for marketing campaign",
      description: "Proposal to allocate $50,000 for Q2 marketing campaign focusing on digital channels.",
      createdAt: "2024-05-01T08:30:00Z",
      createdBy: "Marketing Team",
      status: "Active",
      contractId: "c1"
    },
    {
      id: "2",
      title: "Expand product line with new offerings",
      description: "Adding three new product variants to our existing catalog by Q3 2024.",
      createdAt: "2024-04-29T14:15:00Z",
      createdBy: "Product Development",
      status: "Closed",
      contractId: "c2"
    },
    {
      id: "3",
      title: "Set quarterly sales targets",
      description: "Setting sales targets for Q3 2024 with 15% increase over previous quarter.",
      createdAt: "2024-04-26T11:20:00Z", 
      createdBy: "Sales Department",
      status: "Closed",
      contractId: "c3"
    },
    {
      id: "4",
      title: "Hire additional software developers",
      description: "Proposal to add 3 senior developers to the team to accelerate product development.",
      createdAt: "2024-05-02T09:45:00Z",
      createdBy: "Engineering Team",
      status: "Active",
      contractId: "c4"
    }
  ];
  
  // Filter proposals based on search query and status
  const filteredProposals = proposals.filter(proposal => {
    const matchesQuery = searchQuery === "" || 
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      proposal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || proposal.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Proposals</h1>
        <p className="text-gray-300">
          View, create, and manage contract proposals
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/2">
            <Input 
              placeholder="Search proposals..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-sidebar border-sidebar-border text-white"
            />
          </div>
          <div className="w-full md:w-1/4">
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as ProposalStatus)}
            >
              <SelectTrigger className="bg-sidebar border-sidebar-border text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-sidebar border-sidebar-border">
                <SelectItem value="All">All status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/4 flex justify-end">
            <Button>+ New Proposal</Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredProposals.length > 0 ? (
            filteredProposals.map(proposal => (
              <Card key={proposal.id} className="p-6">
                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">{proposal.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    proposal.status === "Active" ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-300"
                  }`}>
                    {proposal.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{proposal.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Created by {proposal.createdBy} • {formatTimeAgo(proposal.createdAt)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Details</Button>
                    {proposal.status === "Active" && (
                      <Button size="sm" asChild>
                        <a href={`/contracts/${proposal.contractId}`}>Vote</a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No proposals found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProposalsPage;
