
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Scale, 
  Search, 
  Calendar, 
  ChevronDown, 
  FileText, 
  Shield, 
  BookOpen,
  Filter
} from "lucide-react";
import ArbitrationCard from "@/components/cards/ArbitrationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Arbitration Center Page
 * 
 * This page displays the arbitration center interface with:
 * - Active arbitration cases
 * - Rules and procedures
 * - File a new case form
 */
const ArbitrationPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Sample arbitration cases
  const arbitrationCases = [
    {
      id: "ARB-2023-001",
      title: "Payment Dispute - Software Development",
      parties: ["TechCorp", "CodeDevelopers LLC"],
      status: "In Progress" as const,
      filed: "May 10, 2023",
      category: "Payment",
      description: "Dispute regarding milestone payments for software development project."
    },
    {
      id: "ARB-2023-002",
      title: "Contract Terms Violation",
      parties: ["GlobalSupply Inc.", "LocalBuyers Group"],
      status: "Scheduled" as const,
      filed: "May 15, 2023",
      category: "Contract Terms",
      description: "Alleged violation of agreed terms in group buying contract."
    },
    {
      id: "ARB-2023-003",
      title: "Quality of Deliverables Dispute",
      parties: ["MarketingFirm Co.", "DesignAgency LLC"],
      status: "In Progress" as const,
      filed: "May 5, 2023",
      category: "Deliverables",
      description: "Dispute over quality of marketing materials delivered for campaign."
    },
    {
      id: "ARB-2023-004",
      title: "Intellectual Property Claim",
      parties: ["Innovate Solutions", "TechStartup Inc."],
      status: "Resolved" as const,
      filed: "April 20, 2023",
      category: "IP Rights",
      description: "Settlement of IP ownership in jointly developed technology."
    },
    {
      id: "ARB-2023-005",
      title: "Late Delivery Penalty Dispute",
      parties: ["Logistics Partners", "Global Retail Chain"],
      status: "Scheduled" as const,
      filed: "May 18, 2023",
      category: "Delivery Terms",
      description: "Dispute over late delivery penalties in supply chain contract."
    },
    {
      id: "ARB-2023-006",
      title: "Contract Cancellation Fees",
      parties: ["FashionBrands Group", "TextileSupplier Co."],
      status: "Cancelled" as const,
      filed: "April 25, 2023",
      category: "Cancellation",
      description: "Dispute over contract cancellation fees for textile order."
    }
  ];
  
  // Filter cases by search query and status
  const filteredCases = arbitrationCases.filter(c => {
    const matchesSearch = 
      searchQuery === "" || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get unique statuses for filtering
  const statuses = ["All", "In Progress", "Scheduled", "Resolved", "Cancelled"];
  
  // Counts for statistics
  const totalCases = arbitrationCases.length;
  const activeCount = arbitrationCases.filter(c => c.status === "In Progress").length;
  const scheduledCount = arbitrationCases.filter(c => c.status === "Scheduled").length;
  const resolvedCount = arbitrationCases.filter(c => c.status === "Resolved").length;

  return (
    <Layout>
      {/* ==== PAGE HEADER ==== */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          <Scale className="inline-block mr-2 h-8 w-8 text-primary" />
          Arbitration Center
        </h1>
        <p className="text-gray-300">
          Transparent and fair resolution for all contract disputes
        </p>
      </div>
      
      {/* ==== TABS NAVIGATION ==== */}
      <Tabs defaultValue="cases" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="cases" className="data-[state=active]:bg-primary">
            <FileText className="h-4 w-4 mr-2" />
            Cases
          </TabsTrigger>
          <TabsTrigger value="rules" className="data-[state=active]:bg-primary">
            <BookOpen className="h-4 w-4 mr-2" />
            Rules & Procedures
          </TabsTrigger>
          <TabsTrigger value="file" className="data-[state=active]:bg-primary">
            <Shield className="h-4 w-4 mr-2" />
            File a Case
          </TabsTrigger>
        </TabsList>
        
        {/* ==== CASES TAB CONTENT ==== */}
        <TabsContent value="cases">
          {/* Cases Statistics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-primary/30">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Cases</p>
                  <p className="text-2xl font-bold text-white">{totalCases}</p>
                </div>
                <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Scale className="h-5 w-5 text-primary" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-amber-500/30">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Progress</p>
                  <p className="text-2xl font-bold text-white">{activeCount}</p>
                </div>
                <div className="h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <Scale className="h-5 w-5 text-amber-500" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-blue-500/30">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Scheduled</p>
                  <p className="text-2xl font-bold text-white">{scheduledCount}</p>
                </div>
                <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </Card>
            
            <Card className="p-4 border-green-500/30">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Resolved</p>
                  <p className="text-2xl font-bold text-white">{resolvedCount}</p>
                </div>
                <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </Card>
          </div>
          
          {/* Search and Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="w-full md:w-1/2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  placeholder="Search cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-sidebar border-sidebar-border text-white"
                />
              </div>
              
              <div className="w-full md:w-1/4 relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <Button variant="outline" onClick={() => setFilterMenuOpen(!filterMenuOpen)} className="w-full md:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
            
            {filterMenuOpen && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-sidebar-border">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date Filed</label>
                  <Input type="date" className="bg-sidebar border-sidebar-border text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                  <select className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2">
                    <option>All Categories</option>
                    <option>Payment</option>
                    <option>Deliverables</option>
                    <option>Contract Terms</option>
                    <option>IP Rights</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            )}
          </Card>
          
          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCases.length > 0 ? (
              filteredCases.map((item) => (
                <ArbitrationCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  parties={item.parties}
                  status={item.status}
                  filed={item.filed}
                  category={item.category}
                  description={item.description}
                />
              ))
            ) : (
              <div className="col-span-3 py-10 text-center text-gray-400">
                No arbitration cases found matching your criteria.
              </div>
            )}
          </div>
        </TabsContent>
        
        {/* ==== RULES TAB CONTENT ==== */}
        <TabsContent value="rules">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Arbitration Rules and Procedures</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">1. General Principles</h3>
                <p className="text-gray-300">
                  All arbitration proceedings conducted through the Mirror DAO Arbitration Center adhere to principles of fairness, transparency, and efficiency. Cases are reviewed by qualified arbitrators with expertise in the relevant field.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">2. Filing a Case</h3>
                <p className="text-gray-300 mb-2">
                  Any party to a contract executed through Mirror DAO may file for arbitration if they believe the terms of the contract have been violated. To file a case:
                </p>
                <ul className="list-disc pl-5 text-gray-300">
                  <li>Navigate to the "File a Case" tab</li>
                  <li>Complete the required information</li>
                  <li>Submit any relevant supporting documentation</li>
                  <li>Pay the filing fee (refundable if your case is successful)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">3. Case Review Process</h3>
                <p className="text-gray-300 mb-2">
                  Once filed, cases follow this process:
                </p>
                <ol className="list-decimal pl-5 text-gray-300">
                  <li>Initial review (1-2 business days)</li>
                  <li>Notification to the other party (respondent)</li>
                  <li>Response period (5 business days)</li>
                  <li>Arbitrator assignment</li>
                  <li>Evidence collection and review</li>
                  <li>Decision issuance</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">4. Decisions and Enforcement</h3>
                <p className="text-gray-300">
                  All arbitration decisions are binding and final. Mirror DAO's smart contract infrastructure automatically enforces arbitration decisions, including refunds, payment releases, or other remedies as determined by the arbitrator.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">5. Fees</h3>
                <p className="text-gray-300">
                  Filing Fee: 2% of disputed amount (minimum $50, maximum $500)<br />
                  Winning party's filing fee is refunded from the losing party
                </p>
              </div>
            </div>
            
            <Button className="mt-6">
              <FileText className="h-4 w-4 mr-2" />
              Download Full Rulebook
            </Button>
          </Card>
        </TabsContent>
        
        {/* ==== FILE A CASE TAB CONTENT ==== */}
        <TabsContent value="file">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">File a New Arbitration Case</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Contract Reference ID
                  </label>
                  <Input placeholder="Enter contract ID" className="bg-sidebar border-sidebar-border text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Case Title
                  </label>
                  <Input placeholder="Brief description of the dispute" className="bg-sidebar border-sidebar-border text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Dispute Category
                  </label>
                  <select className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2">
                    <option value="">Select category</option>
                    <option value="payment">Payment Dispute</option>
                    <option value="terms">Contract Terms Violation</option>
                    <option value="deliverables">Quality of Deliverables</option>
                    <option value="ip">Intellectual Property</option>
                    <option value="delivery">Delivery Timeline</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Dispute Description
                  </label>
                  <textarea 
                    className="w-full bg-sidebar rounded-lg border border-sidebar-border text-white px-4 py-2 min-h-[120px]"
                    placeholder="Describe the nature of the dispute in detail..."
                  ></textarea>
                </div>
              </div>
              
              {/* Party & Evidence Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Respondent Name
                  </label>
                  <Input placeholder="Name of the other party" className="bg-sidebar border-sidebar-border text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Disputed Amount
                  </label>
                  <div className="flex">
                    <select className="bg-sidebar rounded-l-lg border border-r-0 border-sidebar-border text-white px-2 py-2 w-20">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="rounded-l-none bg-sidebar border-sidebar-border text-white" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Supporting Evidence
                  </label>
                  <div className="border-2 border-dashed border-sidebar-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-400 mb-2">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-xs text-gray-500">
                      Accepts PDF, DOC, JPG, PNG (max 10MB each)
                    </p>
                    <input type="file" className="hidden" />
                    <Button variant="outline" className="mt-4">Browse Files</Button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="h-4 w-4 text-primary bg-sidebar border-sidebar-border rounded focus:ring-primary" 
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                    I agree to the arbitration rules and acknowledge that the decision will be binding
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline">Save Draft</Button>
              <Button>Submit Case</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ArbitrationPage;
