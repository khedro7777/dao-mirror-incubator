
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { formatTimeAgo } from "@/utils/dateUtils";

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

interface ProposalsListProps {
  proposals: ProposalItem[];
  hasUserVoteAccess: boolean;
}

const ProposalsList = ({ proposals, hasUserVoteAccess }: ProposalsListProps) => {
  const { t } = useTranslation();

  // Helper to render price with currency
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null || currency === null) return '';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    return formatter.format(price);
  };

  if (proposals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">{t('noProposalsFound')}</p>
        <Button variant="outline" className="mt-4" onClick={() => {
          // This is a placeholder. The actual reset functionality is handled in the parent component
          window.location.href = '/proposals';
        }}>
          {t('clearFilters')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {proposals.map(proposal => (
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
              {proposal.status === "Active" && hasUserVoteAccess && (
                <Button size="sm" asChild>
                  <a href={`/contracts/${proposal.contractId}`}>{t('vote')}</a>
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProposalsList;
