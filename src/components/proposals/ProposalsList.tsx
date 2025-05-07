
import React from "react";
import ProposalCard from "./ProposalCard";
import EmptyProposalState from "./EmptyProposalState";

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
  onClearFilters?: () => void;
}

const ProposalsList = ({ 
  proposals, 
  hasUserVoteAccess,
  onClearFilters = () => {
    // Default handler if none provided
    window.location.href = '/proposals';
  }
}: ProposalsListProps) => {
  if (proposals.length === 0) {
    return <EmptyProposalState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      {proposals.map(proposal => (
        <ProposalCard
          key={proposal.id}
          id={proposal.id}
          title={proposal.title}
          description={proposal.description}
          createdAt={proposal.createdAt}
          createdBy={proposal.createdBy}
          status={proposal.status}
          contractId={proposal.contractId}
          category={proposal.category}
          price={proposal.price}
          currency={proposal.currency}
          hasUserVoteAccess={hasUserVoteAccess}
        />
      ))}
    </div>
  );
};

export default ProposalsList;
