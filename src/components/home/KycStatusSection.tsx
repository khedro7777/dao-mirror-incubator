
import React from "react";
import KycStatusCard from "@/components/cards/KycStatusCard";

const KycStatusSection: React.FC = () => {
  return (
    <section className="mb-8 w-full">
      <div className="section-header">
        <h2 className="section-title">Account Verification</h2>
      </div>
      <KycStatusCard status="Not Started" className="card-modern hover-lift" />
    </section>
  );
};

export default KycStatusSection;
