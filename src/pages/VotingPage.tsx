
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { contracts, voting } from "@/services";
import { useAuth } from "@/contexts/AuthContext"; 

const VotingPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Check if user can vote and see voting section
  const canAccessVoting = () => {
    if (!user || !user.roles) return false;
    const allowedRoles = ['supplier', 'investor', 'buyer'];
    return user.roles.some(role => allowedRoles.includes(role));
  };
  
  // Mock data for active votes
  const activeVotes = [
    {
      id: "1",
      title: "100 Tons of Raw Plastic Material",
      description: "Group purchase of industrial plastic for manufacturing",
      votingEnds: "2024-05-15",
      contractType: "group-buying",
      progress: {
        yes: 40,
        no: 20,
        abstain: 10,
        remaining: 30
      },
      contractId: "c1"
    },
    {
      id: "2",
      title: "Quarterly Budget Allocation",
      description: "Vote on the proposed Q2 2024 budget allocation",
      votingEnds: "2024-05-10",
      contractType: "funding",
      progress: {
        yes: 60,
        no: 15,
        abstain: 5,
        remaining: 20
      },
      contractId: "c2"
    },
    {
      id: "3",
      title: "New Supplier Agreement",
      description: "Approval for agreement with new electronics component supplier",
      votingEnds: "2024-05-20",
      contractType: "group-buying",
      progress: {
        yes: 25,
        no: 35,
        abstain: 15,
        remaining: 25
      },
      contractId: "c3"
    }
  ];
  
  // Filter votes based on user role
  const getRelevantVotes = () => {
    if (!user || !user.roles) return [];
    
    return activeVotes.filter(vote => {
      // Filter based on contract type
      if (user.roles.includes('supplier') || user.roles.includes('buyer')) {
        if (vote.contractType === 'group-buying') return true;
      }
      
      if (user.roles.includes('investor')) {
        if (vote.contractType === 'funding') return true;
      }
      
      return false;
    });
  };
  
  // Apply both role filtering and search filtering
  const filteredVotes = searchQuery.trim() === "" 
    ? getRelevantVotes() 
    : getRelevantVotes().filter(vote => 
        vote.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        vote.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Voting</h1>
        <p className="text-gray-300">
          Cast your vote on active proposals and track voting progress
        </p>
      </div>

      {!canAccessVoting() ? (
        <Card className="p-6">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-white mb-4">Access Restricted</h2>
            <p className="text-gray-300 mb-6">
              The voting section is only available for suppliers, investors, and buyers.
            </p>
            <Button onClick={() => navigate('/explore')}>
              Explore Available Contracts
            </Button>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <Input 
                placeholder="Search votes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-sidebar border-sidebar-border text-white"
              />
            </div>
            <div className="w-full md:w-1/3">
              <div className="flex justify-end">
                <Button>Create New Proposal</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredVotes.length > 0 ? (
              filteredVotes.map(vote => (
                <Card key={vote.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-white">{vote.title}</h2>
                      <p className="text-gray-300">{vote.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400">Voting ends:</span>
                        <span className="text-white">{new Date(vote.votingEnds).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col md:items-end gap-2 mt-2 md:mt-0">
                      <Button asChild>
                        <a href={`/contracts/${vote.contractId}`}>Vote Now</a>
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <div className="flex justify-between text-sm mb-2">
                      <div className="space-x-4">
                        <span className="text-green-400">Yes: {vote.progress.yes}%</span>
                        <span className="text-red-400">No: {vote.progress.no}%</span>
                        <span className="text-gray-400">Abstain: {vote.progress.abstain}%</span>
                      </div>
                      <span className="text-gray-400">Remaining: {vote.progress.remaining}%</span>
                    </div>
                    
                    <div className="h-2 w-full bg-sidebar-border rounded-full overflow-hidden">
                      <div className="flex h-full">
                        <div className="bg-green-500" style={{ width: `${vote.progress.yes}%` }}></div>
                        <div className="bg-red-500" style={{ width: `${vote.progress.no}%` }}></div>
                        <div className="bg-gray-500" style={{ width: `${vote.progress.abstain}%` }}></div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No voting proposals found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default VotingPage;
