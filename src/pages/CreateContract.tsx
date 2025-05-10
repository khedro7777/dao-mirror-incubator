
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, FileText, Users, Send, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

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
      <div className="mb-6 bg-gradient-to-r from-primary/20 to-secondary/20 p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-gradient-primary mb-2">
          {t('createContract')}
        </h1>
        <p className="text-gray-300">
          {t('createContractDesc')}
        </p>
      </div>

      <div className="space-y-6">
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="border-b border-primary/10 pb-4">
            <CardTitle className="text-xl text-gradient-primary">
              <FileText className="inline mr-2 h-5 w-5" />
              {t('contractType')}
            </CardTitle>
            <CardDescription>
              {t('selectContractType')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="group-buying" className="w-full" onValueChange={setContractType}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="group-buying" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t('groupBuying')}
                </TabsTrigger>
                <TabsTrigger value="funding" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t('funding')}
                </TabsTrigger>
                <TabsTrigger value="freelance" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t('freelance')}
                </TabsTrigger>
                <TabsTrigger value="group-marketing" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  {t('groupMarketing')}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="group-buying" className="space-y-4">
                <div className="bg-sidebar/30 p-4 rounded-lg border border-primary/10">
                  <p className="text-white text-sm leading-relaxed">
                    {t('groupBuyingDesc')}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="funding" className="space-y-4">
                <div className="bg-sidebar/30 p-4 rounded-lg border border-primary/10">
                  <p className="text-white text-sm leading-relaxed">
                    {t('fundingDesc')}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="freelance" className="space-y-4">
                <div className="bg-sidebar/30 p-4 rounded-lg border border-primary/10">
                  <p className="text-white text-sm leading-relaxed">
                    {t('freelanceDesc')}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="group-marketing" className="space-y-4">
                <div className="bg-sidebar/30 p-4 rounded-lg border border-primary/10">
                  <p className="text-white text-sm leading-relaxed">
                    {t('groupMarketingDesc')}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="border-b border-primary/10 pb-4">
            <CardTitle className="text-xl text-gradient-primary">
              {t('basicInformation')}
            </CardTitle>
            <CardDescription>
              {t('fillBasicInfo')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-white mb-2">
                  {t('contractTitle')}
                </label>
                <Input 
                  type="text" 
                  className="w-full bg-sidebar/50 text-white border-primary/30 focus:border-primary focus-visible:ring-primary"
                  placeholder={t('enterTitle')}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-white mb-2">
                  {t('category')}
                </label>
                <select 
                  className="w-full bg-sidebar/50 rounded-lg border border-primary/30 px-4 py-2 text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <option value="">{t('selectCategory')}</option>
                  <option value="technology">{t('technology')}</option>
                  <option value="retail">{t('retail')}</option>
                  <option value="manufacturing">{t('manufacturing')}</option>
                  <option value="services">{t('services')}</option>
                  <option value="marketing">{t('marketing')}</option>
                  <option value="advertising">{t('advertising')}</option>
                  <option value="other">{t('other')}</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white mb-2">
                  {t('description')}
                </label>
                <Textarea 
                  className="w-full bg-sidebar/50 rounded-lg border border-primary/30 px-4 py-2 text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder={t('describeContract')}
                  rows={4}
                />
              </div>
            </div>
            
            <div className="mt-6 flex items-center p-3 bg-sidebar/30 rounded-lg border border-primary/10">
              <Switch
                checked={web3Enabled}
                onCheckedChange={setWeb3Enabled}
                id="web3-toggle"
              />
              <label htmlFor="web3-toggle" className="ml-2 text-sm text-white">
                {t('web3Based')}
                <span className="ml-2 text-xs px-2 py-0.5 bg-accent/80 text-white rounded-full">
                  {t('comingSoon')}
                </span>
              </label>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="border-b border-primary/10 pb-4">
            <CardTitle className="text-xl text-gradient-primary">
              {t('contractTerms')}
            </CardTitle>
            <CardDescription>
              {t('defineTerms')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {terms.map((term) => (
                <div key={term.id} className="flex items-start gap-3 bg-sidebar/30 p-3 rounded-lg border border-primary/10">
                  <div className="flex-grow">
                    <div className="text-xs text-white/70 mb-1">
                      {t('term')} {term.id}
                    </div>
                    <Textarea 
                      className="w-full bg-sidebar/50 rounded-lg border border-primary/30 px-4 py-2 text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                      placeholder={`${t('defineTerm')}...`}
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
                    className="flex-shrink-0 mt-6"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Button 
                variant="outline" 
                className="w-full mt-4 border-primary/30 hover:bg-primary/20 text-white" 
                onClick={handleAddTerm}
              >
                <Plus className="h-4 w-4 mr-2" />
                {t('addTerm')}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader className="border-b border-primary/10 pb-4">
            <CardTitle className="text-xl text-gradient-primary">
              <Users className="inline mr-2 h-5 w-5" />
              {t('participants')}
            </CardTitle>
            <CardDescription>
              {t('inviteParticipants')}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-white mb-2">
                  {t('emailAddresses')}
                </label>
                <Textarea 
                  className="w-full bg-sidebar/50 rounded-lg border border-primary/30 px-4 py-2 text-white focus:outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-primary"
                  placeholder={t('enterEmails')}
                  rows={3}
                />
                <p className="text-xs text-gray-400 mt-2">
                  {t('participantsWillReceive')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between gap-4 mt-8">
          <Button variant="outline" className="border-primary/30 hover:bg-primary/20 text-white">
            {t('saveAsDraft')}
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white px-8">
            <Send className="h-4 w-4 mr-2" />
            {t('createContract')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateContract;
