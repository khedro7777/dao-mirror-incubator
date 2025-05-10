
import React from "react";
import KycStatusCard from "@/components/cards/KycStatusCard";

const KycStatusSection: React.FC = () => {
  return (
    <section className="mb-6">
      <KycStatusCard status="Not Started" />
    </section>
  );
};

export default KycStatusSection;
