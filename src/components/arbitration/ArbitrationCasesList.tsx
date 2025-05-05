
import React from "react";
import ArbitrationCard from "@/components/cards/ArbitrationCard";

interface ArbitrationCase {
  id: string;
  title: string;
  parties: string[];
  status: "In Progress" | "Scheduled" | "Resolved" | "Cancelled";
  filed: string;
  category: string;
  description: string;
}

interface ArbitrationCasesListProps {
  filteredCases: ArbitrationCase[];
}

/**
 * Grid display of arbitration cases
 */
const ArbitrationCasesList: React.FC<ArbitrationCasesListProps> = ({ 
  filteredCases 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCases.length > 0 ? (
        filteredCases.map((item) => (
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
        ))
      ) : (
        <div className="col-span-3 py-10 text-center text-gray-400">
          No arbitration cases found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ArbitrationCasesList;
