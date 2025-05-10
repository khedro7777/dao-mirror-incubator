
import React from "react";
import ArbitrationCard from "@/components/cards/ArbitrationCard";
import { Card } from "@/components/ui/card";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const ArbitrationSection: React.FC = () => {
  const { direction } = useLanguage();
  
  // Sample arbitration cases
  const arbitrationCases = [
    {
      id: "ARB-2023-001",
      title: "Payment Dispute - Software Development",
      parties: ["TechCorp", "CodeDevelopers LLC"],
      status: "In Progress" as const,
      filed: "May 10, 2023",
      category: "Payment",
      description: "Dispute regarding milestone payments for software development project."
    },
    {
      id: "ARB-2023-002",
      title: "Contract Terms Violation",
      parties: ["GlobalSupply Inc.", "LocalBuyers Group"],
      status: "Scheduled" as const,
      filed: "May 15, 2023",
      category: "Contract Terms",
      description: "Alleged violation of agreed terms in group buying contract."
    }
  ];

  return (
    <section className="mb-6">
      <div className={cn("flex justify-between items-center mb-4", direction === "rtl" ? "flex-row-reverse" : "")}>
        <h2 className="text-2xl font-semibold text-white">Arbitration Center</h2>
        <a href="/arbitration" className="text-primary hover:text-primary/80 font-medium">
          View All Cases
        </a>
      </div>
      
      <Card className="p-6 mb-4 border-primary/30">
        <div className="flex items-center gap-3 mb-4">
          <Scale className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-white">Dispute Resolution Services</h3>
        </div>
        <p className="text-gray-300 mb-4">
          Our arbitration center offers fair and efficient resolution for contract disputes through our panel of expert arbitrators. All decisions are binding and enforced through smart contracts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {arbitrationCases.map((item) => (
            <ArbitrationCard
              key={item.id}
              id={item.id}
              title={item.title}
              parties={item.parties}
              status={item.status}
              filed={item.filed}
              category={item.category}
              description={item.description}
            />
          ))}
        </div>
      </Card>
    </section>
  );
};

export default ArbitrationSection;
