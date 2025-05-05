
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const CreateContract = () => {
  const { t } = useTranslation();
  const [contractType, setContractType] = useState("group-buying");
  const [terms, setTerms] = useState([{ id: 1, content: "" }]);
  const [web3Enabled, setWeb3Enabled] = useState(false);
  
  const handleAddTerm = () => {
    const newId = terms.length > 0 ? Math.max(...terms.map(t => t.id)) + 1 : 1;
    setTerms([...terms, { id: newId, content: "" }]);
  };
  
  const handleRemoveTerm = (id: number) => {
    setTerms(terms.filter(term => term.id !== id));
  };
  
  const handleTermChange = (id: number, content: string) => {
    setTerms(terms.map(term => term.id === id ? { ...term, content } : term));
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Create New Contract</h1>
        <p className="text-gray-300">
          Define your contract details, terms, and invite participants
        </p>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contract Type</h2>
          <Tabs defaultValue="group-buying" className="w-full" onValueChange={setContractType}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="group-buying">Group Buying</TabsTrigger>
              <TabsTrigger value="funding">Funding</TabsTrigger>
              <TabsTrigger value="freelance">Freelance</TabsTrigger>
              <TabsTrigger value="group-marketing">Group Marketing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="group-buying" className="space-y-4">
              <p className="text-gray-300 text-sm">
                Create a group buying contract to pool resources with other participants and negotiate better deals with suppliers.
              </p>
            </TabsContent>
            
            <TabsContent value="funding" className="space-y-4">
              <p className="text-gray-300 text-sm">
                Create a funding contract to gather investments for your project with clear terms and goals.
              </p>
            </TabsContent>
            
            <TabsContent value="freelance" className="space-y-4">
              <p className="text-gray-300 text-sm">
                Create a freelance contract to define work terms, deliverables, and payment schedules.
              </p>
            </TabsContent>
            
            <TabsContent value="group-marketing" className="space-y-4">
              <p className="text-gray-300 text-sm">
                Create a group marketing contract to collaborate with other businesses on marketing campaigns and share costs.
              </p>
            </TabsContent>
          </Tabs>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Contract Title
              </label>
              <input 
                type="text" 
                className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter a descriptive title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Category
              </label>
              <select 
                className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a category</option>
                <option value="technology">Technology</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
                <option value="marketing">Marketing</option>
                <option value="advertising">Advertising</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea 
                className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe the purpose and goals of this contract"
                rows={4}
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center">
            <Switch
              checked={web3Enabled}
              onCheckedChange={setWeb3Enabled}
              id="web3-toggle"
            />
            <label htmlFor="web3-toggle" className="ml-2 text-sm text-gray-300">
              This contract is Web3-based (coming soon)
            </label>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contract Terms</h2>
          <p className="text-gray-300 text-sm mb-4">
            Define the terms that participants will vote on. Each term can be individually approved or rejected.
          </p>
          
          <div className="space-y-4">
            {terms.map((term) => (
              <div key={term.id} className="flex items-start gap-4">
                <div className="flex-grow">
                  <textarea 
                    className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={`Term ${term.id}: Define this contract term...`}
                    rows={2}
                    value={term.content}
                    onChange={(e) => handleTermChange(term.id, e.target.value)}
                  />
                </div>
                <Button 
                  variant="destructive" 
                  size="icon"
                  onClick={() => handleRemoveTerm(term.id)}
                  disabled={terms.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-2" 
              onClick={handleAddTerm}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Term
            </Button>
          </div>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Participants</h2>
          <p className="text-gray-300 text-sm mb-4">
            Invite participants to join this contract. You can add more participants later.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Addresses
              </label>
              <textarea 
                className="w-full bg-sidebar rounded-lg border border-sidebar-border px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter email addresses, separated by commas"
                rows={3}
              />
              <p className="text-xs text-gray-400 mt-1">
                Participants will receive an invitation email to join this contract
              </p>
            </div>
          </div>
        </Card>
        
        <div className="flex justify-end gap-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Contract</Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateContract;
