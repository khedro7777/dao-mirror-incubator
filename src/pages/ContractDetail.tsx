
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router-dom";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle 
} from "lucide-react";

const ContractDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data for demonstration
  const contract = {
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
      { id: 1, name: "TechCorp", role: "Supplier", avatar: "TC" },
      { id: 2, name: "Acme Inc", role: "Buyer", avatar: "AI" },
      { id: 3, name: "Globex", role: "Buyer", avatar: "GL" },
    ],
    terms: [
      { 
        id: 1, 
        content: "All participants agree to purchase a minimum of 100 units each", 
        votes: { yes: 12, no: 2, abstain: 1 },
        status: "Approved"
      },
      { 
        id: 2, 
        content: "Payment terms: Net 30 from delivery date", 
        votes: { yes: 10, no: 3, abstain: 2 },
        status: "Approved"
      },
      { 
        id: 3, 
        content: "Supplier will offer a 15% discount if total order exceeds 500 units", 
        votes: { yes: 14, no: 1, abstain: 0 },
        status: "Approved"
      },
      { 
        id: 4, 
        content: "All items will be delivered within 14 days of order confirmation", 
        votes: { yes: 7, no: 8, abstain: 0 },
        status: "Rejected"
      },
    ]
  };
  
  const [userVotes, setUserVotes] = useState<Record<number, "yes" | "no" | "abstain" | null>>({});
  
  const handleVote = (termId: number, vote: "yes" | "no" | "abstain") => {
    setUserVotes({
      ...userVotes,
      [termId]: vote
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gray-300 mb-2">
          <a href="/explore" className="hover:text-primary">Contracts</a>
          <span>/</span>
          <span className="text-white">{contract.title}</span>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">{contract.title}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-sidebar-accent px-3 py-1 rounded-full text-xs font-medium">
                {contract.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                contract.status === "Active" ? "bg-green-900 text-green-300" :
                contract.status === "Pending" ? "bg-yellow-900 text-yellow-300" :
                "bg-red-900 text-red-300"
              }`}>
                {contract.status}
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
              <p className="text-gray-300">{contract.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-400">Created By</p>
                  <p className="text-white">{contract.author}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Creator Role</p>
                  <p className="text-white">{contract.authorRole}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Created On</p>
                  <p className="text-white">{contract.createdAt}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">End Date</p>
                  <p className="text-white">{contract.endDate}</p>
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
                      {contract.terms.filter(t => t.status === "Approved").length}/{contract.terms.length}
                    </span>
                  </div>
                  <Progress 
                    value={(contract.terms.filter(t => t.status === "Approved").length / contract.terms.length) * 100} 
                    className="h-2" 
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Participants Joined</span>
                    <span className="text-sm text-gray-300">
                      {contract.participants.length}/10 (Target)
                    </span>
                  </div>
                  <Progress 
                    value={(contract.participants.length / 10) * 100} 
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
                    <a href="#" onClick={() => setActiveTab("activity")}>View All</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Globex joined the contract</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Term #3 was approved by majority vote</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <XCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Term #4 was rejected by majority vote</p>
                      <p className="text-xs text-gray-400">3 days ago</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Participants</h2>
                  <Button variant="ghost" size="sm" asChild>
                    <a href="#" onClick={() => setActiveTab("participants")}>View All</a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {contract.participants.map(participant => (
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
                {contract.terms.map(term => (
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
                            term.status === "Approved" ? "text-green-300" : "text-red-300"
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
                        >
                          Yes
                        </Button>
                        <Button 
                          variant={userVotes[term.id] === "no" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(term.id, "no")}
                          className={userVotes[term.id] === "no" ? "bg-red-600 hover:bg-red-700" : ""}
                        >
                          No
                        </Button>
                        <Button 
                          variant={userVotes[term.id] === "abstain" ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(term.id, "abstain")}
                          className={userVotes[term.id] === "abstain" ? "bg-gray-600 hover:bg-gray-700" : ""}
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
                    {contract.participants.map(participant => (
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
                <div className="border-l-2 border-sidebar-border pl-4 pb-6 relative">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="text-xs text-gray-400 mb-1">May 26, 2023</p>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Globex joined the contract</p>
                      <p className="text-xs text-gray-400">As Buyer</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-2 border-sidebar-border pl-4 pb-6 relative">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="text-xs text-gray-400 mb-1">May 25, 2023</p>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Term #3 was approved by majority vote</p>
                      <p className="text-xs text-gray-400">14 Yes, 1 No, 0 Abstain</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-2 border-sidebar-border pl-4 pb-6 relative">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="text-xs text-gray-400 mb-1">May 25, 2023</p>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <XCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Term #4 was rejected by majority vote</p>
                      <p className="text-xs text-gray-400">7 Yes, 8 No, 0 Abstain</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-2 border-sidebar-border pl-4 pb-6 relative">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="text-xs text-gray-400 mb-1">May 23, 2023</p>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Acme Inc joined the contract</p>
                      <p className="text-xs text-gray-400">As Buyer</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-2 border-sidebar-border pl-4 relative">
                  <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                  <p className="text-xs text-gray-400 mb-1">May 15, 2023</p>
                  <div className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-sidebar-accent flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-white">Contract was created by TechCorp</p>
                      <p className="text-xs text-gray-400">As Supplier</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ContractDetail;
