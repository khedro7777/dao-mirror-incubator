
import React from "react";
import ProposalCard from "@/components/cards/ProposalCard";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface HotContractsSectionProps {
  searchQuery: string;
}

const HotContractsSection: React.FC<HotContractsSectionProps> = ({ searchQuery }) => {
  const { direction } = useLanguage();
  
  // Sample data for hot contracts
  const hotContracts = [
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
      title: "Social Media Campaign",
      author: "MarketingPro",
      authorRole: "Marketing Agency",
      description: "Joint social media campaign for tech businesses. Looking for 3 more participants.",
      status: "Active",
      votes: { yes: 8, no: 1, abstain: 0 },
      endDate: "Jun 20, 2023",
      category: "Group Marketing",
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
      title: "Website Redesign Project",
      author: "DesignPro",
      authorRole: "Freelancer",
      description: "Professional UI/UX designer needed for complete website redesign. 3-week project.",
      status: "Pending",
      votes: { yes: 0, no: 0, abstain: 0 },
      endDate: "Jun 25, 2023",
      category: "Freelance",
    },
  ] as const;

  // Filter the contracts based on search query
  const filteredContracts = searchQuery 
    ? hotContracts.filter(contract => 
        contract.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contract.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : hotContracts;

  return (
    <section>
      <div className={cn("flex justify-between items-center mb-4", direction === "rtl" ? "flex-row-reverse" : "")}>
        <h2 className="text-2xl font-semibold text-white">
          {searchQuery ? "Search Results" : "Hot Contracts Now"}
        </h2>
        <a href="/explore" className="text-primary hover:text-primary/80 font-medium">
          View All
        </a>
      </div>
      {filteredContracts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredContracts.map((contract, index) => (
            <ProposalCard
              key={index}
              title={contract.title}
              author={contract.author}
              authorRole={contract.authorRole}
              description={contract.description}
              status={contract.status}
              votes={contract.votes}
              endDate={contract.endDate}
              category={contract.category}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <div className="bg-card/30 p-8 text-center rounded-lg border border-primary/20">
          <p className="text-gray-300">No contracts found matching your search criteria.</p>
        </div>
      ) : null}
    </section>
  );
};

export default HotContractsSection;
