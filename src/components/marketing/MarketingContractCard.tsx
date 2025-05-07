
import React from "react";
import ProposalCard from "@/components/cards/ProposalCard";
import { MarketingContract } from "@/types/marketing";

interface MarketingContractCardProps {
  contract: MarketingContract;
}

const MarketingContractCard = ({ contract }: MarketingContractCardProps) => {
  return (
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
  );
};

export default MarketingContractCard;
