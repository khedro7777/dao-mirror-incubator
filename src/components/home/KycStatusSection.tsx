
import React from "react";
import KycStatusCard from "@/components/cards/KycStatusCard";

const KycStatusSection: React.FC = () => {
  return (
    <section className="mb-8 w-full">
      <h2 className="text-xl font-semibold text-white mb-4 px-1">Account Verification</h2>
      <KycStatusCard status="Not Started" className="glass-card hover-lift" />
    </section>
  );
};

export default KycStatusSection;
