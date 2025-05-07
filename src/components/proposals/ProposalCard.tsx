
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { formatTimeAgo } from "@/utils/dateUtils";

interface ProposalCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
  status: string;
  contractId: string;
  category: string;
  price: number | null;
  currency: string | null;
  hasUserVoteAccess: boolean;
}

const ProposalCard = ({
  id,
  title,
  description,
  createdAt,
  createdBy,
  status,
  contractId,
  category,
  price,
  currency,
  hasUserVoteAccess,
}: ProposalCardProps) => {
  const { t } = useTranslation();

  // Helper to render price with currency
  const formatPrice = (price: number | null, currency: string | null) => {
    if (price === null || currency === null) return '';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    });
    
    return formatter.format(price);
  };

  // Helper to determine category display name
  const getCategoryDisplayName = (category: string) => {
    return category === "group-buying" 
      ? t('groupBuying')
      : category === "funding" 
      ? t('funding')
      : t('freelance');
  };

  // Helper to determine category style
  const getCategoryStyle = (category: string) => {
    return category === "group-buying" 
      ? "bg-blue-900 text-blue-300" 
      : category === "funding" 
      ? "bg-purple-900 text-purple-300"
      : "bg-orange-900 text-orange-300";
  };

  return (
    <Card key={id} className="p-6">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            status === "Active" ? "bg-green-900 text-green-300" : "bg-gray-700 text-gray-300"
          }`}>
            {status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryStyle(category)}`}>
            {getCategoryDisplayName(category)}
          </span>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      
      {price && (
        <div className="mb-4 flex items-center">
          <span className="text-primary font-semibold text-lg">
            {formatPrice(price, currency)}
          </span>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          {t('createdBy')} {createdBy} • {formatTimeAgo(createdAt)}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            {t('details')}
          </Button>
          {status === "Active" && hasUserVoteAccess && (
            <Button size="sm" asChild>
              <a href={`/contracts/${contractId}`}>{t('vote')}</a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProposalCard;
