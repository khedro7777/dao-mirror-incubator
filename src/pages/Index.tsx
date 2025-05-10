
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
      {/* Welcome Header */}
      <WelcomeHeader />

      {/* Search Section */}
      <SearchSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* KYC Status Section */}
      <KycStatusSection />

      {/* Role Cards Section */}
      <RoleCardsSection />

      {/* Gateway Cards Section */}
      <GatewayCardsSection />

      {/* Arbitration Center Section */}
      <ArbitrationSection />

      {/* Hot Contracts Section */}
      <HotContractsSection searchQuery={searchQuery} />
    </Layout>
  );
};

export default Index;
