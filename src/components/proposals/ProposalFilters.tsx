
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigate } from "react-router-dom";

interface ProposalFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  canSubmitProposal: boolean;
}

const ProposalFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  canSubmitProposal
}: ProposalFiltersProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="w-full md:w-1/3">
        <Input 
          placeholder={t('searchProposals')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-sidebar border-sidebar-border text-white"
        />
      </div>
      <div className="w-full md:w-1/6">
        <Select 
          value={statusFilter} 
          onValueChange={(value) => setStatusFilter(value)}
        >
          <SelectTrigger className="bg-sidebar border-sidebar-border text-white">
            <SelectValue placeholder={t('filterByStatus')} />
          </SelectTrigger>
          <SelectContent className="bg-sidebar border-sidebar-border">
            <SelectItem value="All">{t('allStatus')}</SelectItem>
            <SelectItem value="Active">{t('active')}</SelectItem>
            <SelectItem value="Closed">{t('closed')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-1/6">
        <Select 
          value={categoryFilter} 
          onValueChange={(value) => setCategoryFilter(value)}
        >
          <SelectTrigger className="bg-sidebar border-sidebar-border text-white">
            <SelectValue placeholder={t('filterByCategory')} />
          </SelectTrigger>
          <SelectContent className="bg-sidebar border-sidebar-border">
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            <SelectItem value="group-buying">{t('groupBuying')}</SelectItem>
            <SelectItem value="funding">{t('funding')}</SelectItem>
            <SelectItem value="freelance">{t('freelance')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-1/3 flex justify-end">
        {canSubmitProposal && (
          <Button onClick={() => navigate('/proposals/create')}>
            + {t('newProposal')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProposalFilters;
