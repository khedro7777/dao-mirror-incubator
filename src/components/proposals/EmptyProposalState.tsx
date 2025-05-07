
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface EmptyProposalStateProps {
  onClearFilters: () => void;
}

const EmptyProposalState = ({ onClearFilters }: EmptyProposalStateProps) => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-12">
      <p className="text-gray-400">{t('noProposalsFound')}</p>
      <Button variant="outline" className="mt-4" onClick={onClearFilters}>
        {t('clearFilters')}
      </Button>
    </div>
  );
};

export default EmptyProposalState;
