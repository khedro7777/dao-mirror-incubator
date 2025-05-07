
export type MarketingContractStatus = "Active" | "Pending" | "Closed";
export type MarketingAuthorRole = "Marketing Agency" | "Supplier" | "Investor" | "Freelancer";

export interface MarketingContract {
  title: string;
  author: string;
  authorRole: MarketingAuthorRole;
  description: string;
  status: MarketingContractStatus;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  endDate: string;
  category: string;
}

export interface FilterParams {
  searchTerm: string;
  categoryFilter: string;
  statusFilter: string;
  selectedDateRange: string;
}
