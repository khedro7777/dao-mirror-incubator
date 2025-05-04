
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useQuery, useMutation } from "@tanstack/react-query";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { contracts, voting } from "@/services";

// Define vote type
type Vote = "yes" | "no" | "abstain" | null;

const ContractDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [userVotes, setUserVotes] = useState<Record<string, Vote>>({});
  
  // Fetch contract data
  const { data: contractData, isLoading: isContractLoading, error: contractError } = useQuery({
    queryKey: ["contract", id],
    queryFn: () => contracts.getContract(id || ""),
  });

  // Handle contract data
  const contract = contractData?.success ? contractData.data : null;

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: (voteData: { termId: string, vote: Vote }) => {
      if (!id || !voteData.vote) return Promise.reject("Missing contract ID or vote");
      
      return voting.submitVote({
        userId: "current-user-id", // In a real app, get this from AuthContext
        contractTermId: voteData.termId,
        vote: voteData.vote
      });
    },
    onSuccess: (data, variables) => {
      if (data.success) {
        // Update local state to reflect the user's vote
        setUserVotes(prev => ({
          ...prev,
          [variables.termId]: variables.vote
        }));
        
        toast({
          title: "Vote submitted",
          description: `Your ${variables.vote} vote has been recorded.`,
        });
      } else {
        toast({
          title: "Vote failed",
          description: "There was an error submitting your vote. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      console.error("Vote error:", error);
      toast({
        title: "Vote failed",
        description: "There was an error submitting your vote. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleVote = (termId: string, vote: Vote) => {
    if (!vote) return;
    
    voteMutation.mutate({
      termId,
      vote
    });
  };

  // Mock data for demonstration - replace with real data when backend is connected
  const mockContract = {
    id: id || "1",
    title: "Office Supplies Group Purchase",
    author: "TechCorp",
    authorRole: "Supplier",
    description: "Joint purchase of office supplies for Q3 2023. Looking for 5 more participants to reach volume discount.",
    status: "Active",
    category: "Group Buying",
    createdAt: "2023-05-15",
    endDate: "2023-06-15",
    participants: [
      { id: "1", name: "TechCorp", role: "Supplier", avatar: "TC" },
      { id: "2", name: "Acme Inc", role: "Buyer", avatar: "AI" },
      { id: "3", name: "Globex", role: "Buyer", avatar: "GL" },
    ],
    terms: [
      { 
        id: "1", 
        content: "All participants agree to purchase a minimum of 100 units each", 
        votes: { yes: 12, no: 2, abstain: 1 },
        status: "Approved"
      },
      { 
        id: "2", 
        content: "Payment terms: Net 30 from delivery date", 
        votes: { yes: 10, no: 3, abstain: 2 },
        status: "Approved"
      },
      { 
        id: "3", 
        content: "Supplier will offer a 15% discount if total order exceeds 500 units", 
        votes: { yes: 14, no: 1, abstain: 0 },
        status: "Approved"
      },
      { 
        id: "4", 
        content: "All items will be delivered within 14 days of order confirmation", 
        votes: { yes: 7, no: 8, abstain: 0 },
        status: "Rejected"
      },
    ],
    activities: [
      {
        id: "1",
        date: "2023-05-26",
        type: "join",
        icon: <Users className="h-4 w-4" />,
        title: "Globex joined the contract",
        details: "As Buyer"
      },
      {
        id: "2",
        date: "2023-05-25",
        type: "approve",
        icon: <CheckCircle className="h-4 w-4" />,
        title: "Term #3 was approved by majority vote",
        details: "14 Yes, 1 No, 0 Abstain"
      },
      {
        id: "3",
        date: "2023-05-25",
        type: "reject",
        icon: <XCircle className="h-4 w-4" />,
        title: "Term #4 was rejected by majority vote",
        details: "7 Yes, 8 No, 0 Abstain"
      },
      {
        id: "4",
        date: "2023-05-23",
        type: "join",
        icon: <Users className="h-4 w-4" />,
        title: "Acme Inc joined the contract",
        details: "As Buyer"
      },
      {
        id: "5",
        date: "2023-05-15",
        type: "create",
        icon: <FileText className="h-4 w-4" />,
        title: "Contract was created by TechCorp",
        details: "As Supplier"
      }
    ]
  };

  // Use mock data until backend is connected
  const displayContract = contract || mockContract;

  if (isContractLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading contract details...</div>
        </div>
      </Layout>
    );
  }

  if (contractError || !id) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64 flex-col">
          <div className="text-red-400 mb-4">There was an error loading the contract.</div>
          <Button asChild>
            <a href="/explore">Back to All Contracts</a>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <a href="/explore" className="hover:text-primary">Contracts</a>
          <span>/</span>
          <span className="text-white">{displayContract.title}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{displayContract.title}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-sidebar-accent px-3 py-1 rounded-full text-xs font-medium">
                {displayContract.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                displayContract.status === "Active" ? "bg-green-900 text-green-300" :
                displayContract.status === "Pending" ? "bg-yellow-900 text-yellow-300" :
                "bg-red-900 text-red-300"
              }`}>
                {displayContract.status}
              </span>
            </div>
          </div>
          
          <Button>Join Contract</Button>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="terms">Terms</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-300">{displayContract.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-400">Created By</p>
                  <p className="text-white">{displayContract.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creator Role</p>
                  <p className="text-white">{displayContract.authorRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created On</p>
                  <p className="text-white">{displayContract.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">End Date</p>
                  <p className="text-white">{displayContract.endDate}</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contract Progress</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Terms Approved</span>
                    <span className="text-sm text-gray-300">
                      {displayContract.terms.filter(t => t.status === "Approved").length}/{displayContract.terms.length}
                    </span>
                  </div>
                  <Progress 
                    value={(displayContract.terms.filter(t => t.status === "Approved").length / displayContract.terms.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Participants Joined</span>
                    <span className="text-sm text-gray-300">
                      {displayContract.participants.length}/10 (Target)
                    </span>
                  </div>
                  <Progress 
                    value={(displayContract.participants.length / 10) * 100} 
                    className="h-2" 
                  />
                </div>
              </div>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab("activity")}}>View All</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {displayContract.activities?.slice(0, 3).map(activity => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-white">{activity.title}</p>
                        <p className="text-xs text-gray-400">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Participants</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" onClick={(e) => {e.preventDefault(); setActiveTab("participants")}}>View All</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {displayContract.participants.map(participant => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{participant.avatar}</span>
                        </div>
                        <div>
                          <p className="text-white">{participant.name}</p>
                          <p className="text-xs text-gray-400">{participant.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="terms" className="space-y-6 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contract Terms</h2>
              <p className="text-gray-300 text-sm mb-6">
                Review and vote on contract terms. Each term requires majority approval to be included in the final contract.
              </p>
              
              <div className="space-y-6">
                {displayContract.terms.map(term => (
                  <div key={term.id} className="border border-sidebar-border rounded-lg p-4">
                    <div className="mb-3">
                      <p className="text-white">{term.content}</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-green-300">Yes: {term.votes.yes}</span>
                            <span className="text-xs text-red-300">No: {term.votes.no}</span>
                            <span className="text-xs text-gray-400">Abstain: {term.votes.abstain}</span>
                          </div>
                          <span className={`text-xs font-medium ${
                            term.status === "Approved" ? "text-green-300" : 
                            term.status === "Rejected" ? "text-red-300" : "text-yellow-300"
                          }`}>
                            {term.status}
                          </span>
                        </div>
                        <div className="h-1.5 bg-sidebar-border rounded-full w-full overflow-hidden">
                          <div className="flex h-full">
                            <div 
                              className="bg-green-500" 
                              style={{ width: `${(term.votes.yes / (term.votes.yes + term.votes.no + term.votes.abstain)) * 100}%` }}
                            />
                            <div 
                              className="bg-red-500" 
                              style={{ width: `${(term.votes.no / (term.votes.yes + term.votes.no + term.votes.abstain)) * 100}%` }}
                            />
                            <div 
                              className="bg-gray-500" 
                              style={{ width: `${(term.votes.abstain / (term.votes.yes + term.votes.no + term.votes.abstain)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant={userVotes[term.id] === "yes" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(term.id, "yes")}
                          className={userVotes[term.id] === "yes" ? "bg-green-600 hover:bg-green-700" : ""}
                          disabled={voteMutation.isPending}
                        >
                          Yes
                        </Button>
                        <Button 
                          variant={userVotes[term.id] === "no" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(term.id, "no")}
                          className={userVotes[term.id] === "no" ? "bg-red-600 hover:bg-red-700" : ""}
                          disabled={voteMutation.isPending}
                        >
                          No
                        </Button>
                        <Button 
                          variant={userVotes[term.id] === "abstain" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(term.id, "abstain")}
                          className={userVotes[term.id] === "abstain" ? "bg-gray-600 hover:bg-gray-700" : ""}
                          disabled={voteMutation.isPending}
                        >
                          Abstain
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="participants" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Participants</h2>
                <Button>Invite Participants</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-sidebar-border">
                    <tr>
                      <th className="text-left py-3 text-gray-300 font-medium">Name</th>
                      <th className="text-left py-3 text-gray-300 font-medium">Role</th>
                      <th className="text-left py-3 text-gray-300 font-medium">Joined Date</th>
                      <th className="text-left py-3 text-gray-300 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sidebar-border">
                    {displayContract.participants.map(participant => (
                      <tr key={participant.id}>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                              <span className="text-white text-sm font-medium">{participant.avatar}</span>
                            </div>
                            <span className="text-white">{participant.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-gray-300">{participant.role}</td>
                        <td className="py-4 text-gray-300">May 15, 2023</td>
                        <td className="py-4">
                          <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6 mt-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Activity Log</h2>
              
              <div className="space-y-6">
                {displayContract.activities?.map((activity, index) => (
                  <div key={activity.id} className={`border-l-2 border-sidebar-border pl-4 ${index < displayContract.activities.length - 1 ? 'pb-6' : ''} relative`}>
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                    <p className="text-xs text-gray-400 mb-1">{activity.date}</p>
                    <div className="flex gap-4">
                      <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="text-white">{activity.title}</p>
                        <p className="text-xs text-gray-400">{activity.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ContractDetail;
