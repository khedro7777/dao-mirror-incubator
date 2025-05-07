
import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import useMarketingContracts from "@/hooks/useMarketingContracts";
import MarketingFilters from "@/components/marketing/MarketingFilters";
import MarketingStatistics from "@/components/marketing/MarketingStatistics";
import MarketingContractCard from "@/components/marketing/MarketingContractCard";

/**
 * Group Marketing Page Component
 * 
 * This page displays all available marketing contracts with filtering options.
 * Supports searching, category filtering, and status filtering.
 */
const GroupMarketingPage = () => {
  const { t } = useTranslation();
  const {
    contracts,
    filteredContracts,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    filterMenuOpen,
    setFilterMenuOpen,
    selectedDateRange,
    setSelectedDateRange,
    categories,
    statuses,
    dateRanges,
  } = useMarketingContracts();

  return (
    <Layout>
      {/* ==== PAGE HEADER ==== */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Group Marketing</h1>
        <p className="text-gray-300">
          Collaborate with other businesses to share marketing costs and expand your reach
        </p>
      </div>

      {/* ==== SEARCH AND FILTER SECTION ==== */}
      <MarketingFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filterMenuOpen={filterMenuOpen}
        setFilterMenuOpen={setFilterMenuOpen}
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        categories={categories}
        statuses={statuses}
        dateRanges={dateRanges}
      />

      {/* ==== CONTRACTS STATISTICS SUMMARY ==== */}
      <MarketingStatistics contracts={contracts} />

      {/* ==== CONTRACTS GRID ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => (
            <MarketingContractCard key={contract.title} contract={contract} />
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-400">
            No contracts found matching your search criteria.
          </div>
        )}
      </div>

      {/* ==== CREATE NEW CONTRACT BUTTON (FIXED) ==== */}
      <div className="fixed bottom-6 right-6">
        <a
          href="/contracts/create"
          className="flex items-center justify-center h-14 w-14 rounded-full bg-primary hover:bg-primary/80 text-white shadow-lg transition-colors"
          aria-label="Create new contract"
        >
          <span className="text-2xl font-semibold">+</span>
        </a>
      </div>
    </Layout>
  );
};

export default GroupMarketingPage;
