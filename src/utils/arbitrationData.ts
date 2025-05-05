
/**
 * Sample data for arbitration cases
 */

export type ArbitrationStatus = "In Progress" | "Scheduled" | "Resolved" | "Cancelled";

export interface ArbitrationCase {
  id: string;
  title: string;
  parties: string[];
  status: ArbitrationStatus;
  filed: string;
  category: string;
  description: string;
}

// Sample arbitration cases
export const arbitrationCases: ArbitrationCase[] = [
  {
    id: "ARB-2023-001",
    title: "Payment Dispute - Software Development",
    parties: ["TechCorp", "CodeDevelopers LLC"],
    status: "In Progress",
    filed: "May 10, 2023",
    category: "Payment",
    description: "Dispute regarding milestone payments for software development project."
  },
  {
    id: "ARB-2023-002",
    title: "Contract Terms Violation",
    parties: ["GlobalSupply Inc.", "LocalBuyers Group"],
    status: "Scheduled",
    filed: "May 15, 2023",
    category: "Contract Terms",
    description: "Alleged violation of agreed terms in group buying contract."
  },
  {
    id: "ARB-2023-003",
    title: "Quality of Deliverables Dispute",
    parties: ["MarketingFirm Co.", "DesignAgency LLC"],
    status: "In Progress",
    filed: "May 5, 2023",
    category: "Deliverables",
    description: "Dispute over quality of marketing materials delivered for campaign."
  },
  {
    id: "ARB-2023-004",
    title: "Intellectual Property Claim",
    parties: ["Innovate Solutions", "TechStartup Inc."],
    status: "Resolved",
    filed: "April 20, 2023",
    category: "IP Rights",
    description: "Settlement of IP ownership in jointly developed technology."
  },
  {
    id: "ARB-2023-005",
    title: "Late Delivery Penalty Dispute",
    parties: ["Logistics Partners", "Global Retail Chain"],
    status: "Scheduled",
    filed: "May 18, 2023",
    category: "Delivery Terms",
    description: "Dispute over late delivery penalties in supply chain contract."
  },
  {
    id: "ARB-2023-006",
    title: "Contract Cancellation Fees",
    parties: ["FashionBrands Group", "TextileSupplier Co."],
    status: "Cancelled",
    filed: "April 25, 2023",
    category: "Cancellation",
    description: "Dispute over contract cancellation fees for textile order."
  }
];
