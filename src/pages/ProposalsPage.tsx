
import React from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { useProposals } from "@/hooks/useProposals";
import ProposalFilters from "@/components/proposals/ProposalFilters";
import ProposalsList from "@/components/proposals/ProposalsList";

const ProposalsPage = () => {
  const { t } = useTranslation();
  const { 
    searchQuery, 
    setSearchQuery,
    statusFilter, 
    setStatusFilter,
    categoryFilter, 
    setCategoryFilter,
    filteredProposals,
    canSubmitProposal,
    hasUserVoteAccess
  } = useProposals();

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">{t('proposals')}</h1>
        <p className="text-gray-300">
          {t('proposalsDescription')}
        </p>
      </div>

      <div className="space-y-6">
        <ProposalFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          canSubmitProposal={canSubmitProposal}
        />

        <ProposalsList 
          proposals={filteredProposals}
          hasUserVoteAccess={hasUserVoteAccess}
        />
      </div>
    </Layout>
  );
};

export default ProposalsPage;
