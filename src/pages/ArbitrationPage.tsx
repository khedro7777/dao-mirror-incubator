
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, FileText, BookOpen, Shield } from "lucide-react";
import { arbitrationCases, ArbitrationCase } from "@/utils/arbitrationData";

// Import the new components
import ArbitrationStatistics from "@/components/arbitration/ArbitrationStatistics";
import ArbitrationSearch from "@/components/arbitration/ArbitrationSearch";
import ArbitrationCasesList from "@/components/arbitration/ArbitrationCasesList";
import ArbitrationRules from "@/components/arbitration/ArbitrationRules";
import FileArbitrationCase from "@/components/arbitration/FileArbitrationCase";

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
  
  // Counts for statistics
  const totalCases = arbitrationCases.length;
  const activeCount = arbitrationCases.filter(c => c.status === "In Progress").length;
  const scheduledCount = arbitrationCases.filter(c => c.status === "Scheduled").length;
  const resolvedCount = arbitrationCases.filter(c => c.status === "Resolved").length;

  // Get unique statuses for filtering
  const statuses = ["All", "In Progress", "Scheduled", "Resolved", "Cancelled"];
  
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
          {/* Cases Statistics Component */}
          <ArbitrationStatistics
            totalCases={totalCases}
            activeCount={activeCount}
            scheduledCount={scheduledCount}
            resolvedCount={resolvedCount}
          />
          
          {/* Search and Filters Component */}
          <ArbitrationSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            statuses={statuses}
          />
          
          {/* Cases Grid Component */}
          <ArbitrationCasesList filteredCases={filteredCases} />
        </TabsContent>
        
        {/* ==== RULES TAB CONTENT ==== */}
        <TabsContent value="rules">
          <ArbitrationRules />
        </TabsContent>
        
        {/* ==== FILE A CASE TAB CONTENT ==== */}
        <TabsContent value="file">
          <FileArbitrationCase />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ArbitrationPage;
