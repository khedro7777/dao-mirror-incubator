
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import WelcomeHeader from "@/components/home/WelcomeHeader";
import SearchSection from "@/components/home/SearchSection";
import KycStatusSection from "@/components/home/KycStatusSection";
import RoleCardsSection from "@/components/home/RoleCardsSection";
import GatewayCardsSection from "@/components/home/GatewayCardsSection";
import ArbitrationSection from "@/components/home/ArbitrationSection";
import HotContractsSection from "@/components/home/HotContractsSection";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Layout>
      <div className="space-y-8 page-container">
        {/* Welcome Header */}
        <WelcomeHeader />

        {/* Search Section */}
        <SearchSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Two-column layout for KYC Status and Role Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 content-section">
            {/* KYC Status Section */}
            <KycStatusSection />
          </div>
          
          <div className="lg:col-span-2 content-section">
            {/* Role Cards Section */}
            <RoleCardsSection />
          </div>
        </div>

        {/* Gateway Cards Section */}
        <div className="content-section">
          <GatewayCardsSection />
        </div>

        {/* Two-column layout for Arbitration and Hot Contracts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Arbitration Center Section */}
          <div className="content-section">
            <ArbitrationSection />
          </div>

          {/* Hot Contracts Section */}
          <div className="content-section">
            <HotContractsSection searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
