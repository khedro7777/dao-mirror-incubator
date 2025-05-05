
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
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
import { votingService } from "@/services/votingService";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type ProposalStatus = "Active" | "Closed" | "All";
type ProposalCategory = "group-buying" | "funding" | "freelance" | "all";

const ProposalsPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProposalStatus>("All");
  const [categoryFilter, setCategoryFilter] = useState<ProposalCategory>("all");
  
  // Check if user can submit proposals
  const canSubmitProposal = () => {
    if (!user || !user.roles) return false;
    return votingService.canUserSubmitProposal(user.roles[0]);
  };
  
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
  
  // Filter proposals that are relevant to the user's role
  const getRelevantProposals = () => {
    if (!user || !user.roles) return [];
    return votingService.getRelevantProposalsForUser(proposals, user.roles[0]);
  };
  
  // Apply filters (search, status, category)
  const filteredProposals = getRelevantProposals().filter(proposal => {
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
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} ${diffDays > 1 ? t('days') : t('day')} ${t('ago')}`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours > 1 ? t('hours') : t('hour')} ${t('ago')}`;
    } else if (diffMins > 0) {
      return `${diffMins} ${diffMins > 1 ? t('minutes') : t('minute')} ${t('ago')}`;
    } else {
      return t('justNow');
    }
  };
  
  // Helper to render price with currency
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null || currency === null) return '';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    return formatter.format(price);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{t('proposals')}</h1>
        <p className="text-gray-300">
          {t('proposalsDescription')}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/3">
            <Input 
              placeholder={t('searchProposals')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-sidebar border-sidebar-border text-white"
            />
          </div>
          <div className="w-full md:w-1/6">
            <Select 
              value={statusFilter} 
              onValueChange={(value) => setStatusFilter(value as ProposalStatus)}
            >
              <SelectTrigger className="bg-sidebar border-sidebar-border text-white">
                <SelectValue placeholder={t('filterByStatus')} />
              </SelectTrigger>
              <SelectContent className="bg-sidebar border-sidebar-border">
                <SelectItem value="All">{t('allStatus')}</SelectItem>
                <SelectItem value="Active">{t('active')}</SelectItem>
                <SelectItem value="Closed">{t('closed')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/6">
            <Select 
              value={categoryFilter} 
              onValueChange={(value) => setCategoryFilter(value as ProposalCategory)}
            >
              <SelectTrigger className="bg-sidebar border-sidebar-border text-white">
                <SelectValue placeholder={t('filterByCategory')} />
              </SelectTrigger>
              <SelectContent className="bg-sidebar border-sidebar-border">
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                <SelectItem value="group-buying">{t('groupBuying')}</SelectItem>
                <SelectItem value="funding">{t('funding')}</SelectItem>
                <SelectItem value="freelance">{t('freelance')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full md:w-1/3 flex justify-end">
            {canSubmitProposal() && (
              <Button onClick={() => navigate('/proposals/create')}>
                + {t('newProposal')}
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {filteredProposals.length > 0 ? (
            filteredProposals.map(proposal => (
              <Card key={proposal.id} className="p-6">
                <div className="flex justify-between mb-2">
                  <h2 className="text-xl font-semibold text-white">{proposal.title}</h2>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      proposal.status === "Active" ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-300"
                    }`}>
                      {proposal.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      proposal.category === "group-buying" 
                        ? "bg-blue-900 text-blue-300" 
                        : proposal.category === "funding" 
                        ? "bg-purple-900 text-purple-300"
                        : "bg-orange-900 text-orange-300"
                    }`}>
                      {proposal.category === "group-buying" 
                        ? t('groupBuying')
                        : proposal.category === "funding" 
                        ? t('funding')
                        : t('freelance')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{proposal.description}</p>
                
                {proposal.price && (
                  <div className="mb-4 flex items-center">
                    <span className="text-primary font-semibold text-lg">
                      {formatPrice(proposal.price, proposal.currency)}
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {t('createdBy')} {proposal.createdBy} • {formatTimeAgo(proposal.createdAt)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {t('details')}
                    </Button>
                    {proposal.status === "Active" && user?.roles?.includes('supplier') && (
                      <Button size="sm" asChild>
                        <a href={`/contracts/${proposal.contractId}`}>{t('vote')}</a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">{t('noProposalsFound')}</p>
              <Button variant="outline" className="mt-4" onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
                setCategoryFilter("all");
              }}>
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProposalsPage;
