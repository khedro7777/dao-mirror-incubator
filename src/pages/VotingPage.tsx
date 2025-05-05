import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter,
  VoteIcon,
  BarChart,
  ChevronDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/**
 * Voting Page
 * 
 * This page displays active proposals and allows users to vote on them.
 */
const VotingPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Sample proposals data
  const proposals = [
    {
      id: "PROP-2023-001",
      title: "Approve Marketing Budget Increase",
      category: "Marketing",
      status: "Active",
      startDate: "2023-05-01",
      endDate: "2023-05-15",
      description: "Proposal to increase the marketing budget by 20% to boost user acquisition.",
      votesFor: 75,
      votesAgainst: 25,
      totalVotes: 100,
      quorum: 50,
      voted: false
    },
    {
      id: "PROP-2023-002",
      title: "Implement New Feature: User Profiles",
      category: "Development",
      status: "Pending",
      startDate: "2023-05-20",
      endDate: "2023-06-05",
      description: "Proposal to develop and implement user profiles to enhance user experience.",
      votesFor: 60,
      votesAgainst: 40,
      totalVotes: 100,
      quorum: 50,
      voted: true
    },
    {
      id: "PROP-2023-003",
      title: "Partnership with Data Analytics Firm",
      category: "Partnerships",
      status: "Closed",
      startDate: "2023-04-10",
      endDate: "2023-04-25",
      description: "Proposal to form a strategic partnership with a leading data analytics firm.",
      votesFor: 90,
      votesAgainst: 10,
      totalVotes: 100,
      quorum: 50,
      voted: false
    },
    {
      id: "PROP-2023-004",
      title: "Update Security Protocols",
      category: "Security",
      status: "Active",
      startDate: "2023-05-05",
      endDate: "2023-05-20",
      description: "Proposal to update and enhance the platform's security protocols.",
      votesFor: 80,
      votesAgainst: 20,
      totalVotes: 100,
      quorum: 50,
      voted: false
    },
    {
      id: "PROP-2023-005",
      title: "Revise Content Moderation Policy",
      category: "Policy",
      status: "Pending",
      startDate: "2023-05-25",
      endDate: "2023-06-10",
      description: "Proposal to revise the content moderation policy to improve community standards.",
      votesFor: 55,
      votesAgainst: 45,
      totalVotes: 100,
      quorum: 50,
      voted: true
    },
    {
      id: "PROP-2023-006",
      title: "Launch Mobile App",
      category: "Development",
      status: "Closed",
      startDate: "2023-04-15",
      endDate: "2023-04-30",
      description: "Proposal to develop and launch a mobile app for iOS and Android platforms.",
      votesFor: 95,
      votesAgainst: 5,
      totalVotes: 100,
      quorum: 50,
      voted: false
    }
  ];
  
  // Filter proposals by search query, category, and status
  const filteredProposals = proposals.filter(p => {
    const matchesSearch = 
      searchQuery === "" || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || p.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Get unique categories for filtering
  const categories = ["All", ...new Set(proposals.map(p => p.category))];
  
  // Get unique statuses for filtering
  const statuses = ["All", ...new Set(proposals.map(p => p.status))];
  
  // Function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to calculate time remaining
  const getTimeRemaining = (endTime: string) => {
    const total = Date.parse(endTime) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
      days,
      hours,
      minutes,
      seconds,
      total
    };
  };
  
  // State to hold the time remaining
  const [timeRemaining, setTimeRemaining] = useState<any>(null);
  
  // State to hold the end time
  const [endTime, setEndTime] = useState<string | null>(null);
  
  // Effect to set the end time and update the time remaining every second
  useEffect(() => {
    // Find the active proposal with the earliest end date
    const activeProposals = proposals.filter(p => p.status === "Active");
    if (activeProposals.length > 0) {
      const earliestEndDate = activeProposals.reduce((prev, curr) => {
        return (Date.parse(curr.endDate) < Date.parse(prev.endDate)) ? curr : prev;
      }).endDate;
      
      setEndTime(earliestEndDate);
      
      // Update the time remaining every second
      const intervalId = setInterval(() => {
        if (endTime) {
          setTimeRemaining(getTimeRemaining(endTime));
        }
      }, 1000);
      
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    } else {
      setEndTime(null);
      setTimeRemaining(null);
    }
  }, [proposals]);
  
  // Function to render the time remaining
  const renderTimeRemaining = () => {
    if (!timeRemaining) {
      return <p className="text-sm text-gray-400">No active proposals</p>;
    }
    
    if (timeRemaining.total <= 0) {
      return <p className="text-sm text-gray-400">Voting has ended</p>;
    }
    
    return (
      <p className="text-sm text-gray-400">
        {timeRemaining.days > 0 && (
          <>
            {timeRemaining.days} {timeRemaining.days === 1 ? t("votingDay") : t("votingDays")}, 
          </>
        )}
        {timeRemaining.hours > 0 && (
          <>
            {timeRemaining.hours} {timeRemaining.hours === 1 ? t("votingHour") : t("votingHours")}, 
          </>
        )}
        {timeRemaining.minutes > 0 && (
          <>
            {timeRemaining.minutes} {timeRemaining.minutes === 1 ? t("votingMinute") : t("votingMinutes")}
          </>
        )}
      </p>
    );
  };

  return (
    <Layout>
      {/* ==== PAGE HEADER ==== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Voting</h1>
        <p className="text-gray-300 mb-6">Participate in DAO governance by voting on active proposals</p>
        
        {endTime && <p className="text-sm text-gray-400">Ends: {formatDate(endTime)}</p>}
        {renderTimeRemaining()}
      </div>
      
      {/* ==== SEARCH AND FILTERS ==== */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              placeholder="Search proposals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-sidebar border-sidebar-border text-white"
            />
          </div>
          
          <div className="w-full md:w-1/4 relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="appearance-none w-full bg-sidebar rounded-lg border border-sidebar-border text-white pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
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
              <label className="block text-sm font-medium text-gray-400 mb-1">Date Range</label>
              <div className="flex gap-2">
                <Input type="date" className="bg-sidebar border-sidebar-border text-white" />
                <Input type="date" className="bg-sidebar border-sidebar-border text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Vote Count</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="Min" className="bg-sidebar border-sidebar-border text-white" />
                <Input type="number" placeholder="Max" className="bg-sidebar border-sidebar-border text-white" />
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filters</Button>
            </div>
          </div>
        )}
      </Card>
      
      {/* ==== PROPOSALS LIST ==== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => (
            <Card key={proposal.id} className="p-4 border-sidebar-border hover:border-primary/50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-gray-400">{proposal.id}</span>
                <Badge className={`bg-primary/10 text-primary`}>
                  {proposal.status}
                </Badge>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-2">{proposal.title}</h3>
              
              <p className="text-sm text-gray-300 mb-3">{proposal.description}</p>
              
              <div className="mb-3">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span>For: {proposal.votesFor}%</span>
                  <span>Against: {proposal.votesAgainst}%</span>
                </div>
                <Progress value={proposal.votesFor} className="h-2" />
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <VoteIcon className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{proposal.totalVotes} Votes</span>
                </div>
                <Button variant="outline" size="sm">
                  {proposal.voted ? "View Details" : "Vote Now"}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-3 py-10 text-center text-gray-400">
            {t("noProposalsFound")}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VotingPage;
