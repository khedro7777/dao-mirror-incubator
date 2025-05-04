
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Faq = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("general");

  const generalFaqs = [
    {
      question: "What is Mirror DAO?",
      answer: "Mirror DAO is a decentralized platform that facilitates group buying, project funding, and freelance contracts through transparent, democratic processes. It enables businesses and individuals to collaborate efficiently with clear terms and governance."
    },
    {
      question: "How does Mirror DAO work?",
      answer: "Mirror DAO operates through three main gateways: Group Buying (for collective purchasing), Funding (for project investments), and Freelance (for work contracts). Users can create or join contracts, with all terms being voted on democratically by participants."
    },
    {
      question: "Is Mirror DAO based on blockchain?",
      answer: "Currently, Mirror DAO simulates DAO functionality in a Web2 environment. While we plan to implement blockchain technology in the future, our current focus is on providing the benefits of transparent governance without the technical complexities of Web3."
    },
    {
      question: "Do I need cryptocurrency to use Mirror DAO?",
      answer: "No. Mirror DAO currently operates without cryptocurrency. All transactions and voting mechanisms use traditional authentication methods like email OTP verification."
    },
    {
      question: "What is KYC and why is it required?",
      answer: "KYC (Know Your Customer) is a verification process to confirm user identities. It's required to ensure security, prevent fraud, and establish trust among contract participants. We offer both individual (KYCE) and business (KYCB) verification options."
    }
  ];

  const groupBuyingFaqs = [
    {
      question: "How does group buying work on Mirror DAO?",
      answer: "Group buying allows multiple businesses to pool their purchasing power to negotiate better deals with suppliers. A contract creator sets the terms, invites participants, and once enough join and approve the terms, the collective purchase is executed."
    },
    {
      question: "What types of products can be purchased through group buying?",
      answer: "Nearly any business product or service can be purchased through group buying, including office supplies, software licenses, manufacturing materials, marketing services, and more."
    },
    {
      question: "How are suppliers selected for group buying contracts?",
      answer: "Suppliers can either initiate a group buying contract or be selected by the contract creator. All suppliers undergo verification to ensure they can fulfill the contract requirements."
    }
  ];

  const fundingFaqs = [
    {
      question: "How does project funding work on Mirror DAO?",
      answer: "Project creators can submit funding proposals with clear goals, terms, and expected returns. Investors can review these proposals, join the contract, and vote on terms before committing funds."
    },
    {
      question: "What types of projects can be funded?",
      answer: "Mirror DAO supports funding for a wide range of projects including startups, product development, creative endeavors, and business expansions. Each project is categorized for easy discovery by relevant investors."
    },
    {
      question: "How are returns distributed to investors?",
      answer: "Return distribution is defined in the contract terms and voted on by all participants. The platform supports various models including equity, revenue sharing, and fixed returns."
    }
  ];

  const freelanceFaqs = [
    {
      question: "How does the freelance gateway work?",
      answer: "The freelance gateway connects businesses with skilled professionals. Contracts clearly define the scope of work, deliverables, payment terms, and timelines, with all participants voting to approve these terms."
    },
    {
      question: "How are payments handled for freelance contracts?",
      answer: "Payments can be structured according to the contract terms, including milestone-based payments, hourly rates, or fixed project fees. The platform ensures transparency and timely payments."
    },
    {
      question: "Can I hire teams through the freelance gateway?",
      answer: "Yes, you can create contracts for individual freelancers or entire teams, depending on your project needs."
    }
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-300">
          Find answers to common questions about Mirror DAO and how to use our platform
        </p>
      </div>

      <Card className="p-6">
        <Tabs defaultValue="general" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="group-buying">Group Buying</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="freelance">Freelance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {generalFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="group-buying" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {groupBuyingFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="funding" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {fundingFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="freelance" className="space-y-6">
            <Accordion type="single" collapsible className="w-full">
              {freelanceFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-white text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">How Mirror DAO Works</h2>
        
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-sidebar-accent mb-6">
          {/* Video placeholder - would be replaced with an actual video */}
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-lg text-white mb-2">Video Tutorial</p>
              <p className="text-sm text-gray-300">Coming soon</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Process Flow</h3>
        
        <div className="space-y-8">
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">1</span>
            </div>
            <div className="ml-4">
              <h4 className="text-white font-medium mb-2">Sign Up & Verify</h4>
              <p className="text-gray-300">
                Create an account and complete the KYC verification process to gain full access to platform features.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">2</span>
            </div>
            <div className="ml-4">
              <h4 className="text-white font-medium mb-2">Choose a Gateway</h4>
              <p className="text-gray-300">
                Select from Group Buying, Funding, or Freelance based on your needs.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">3</span>
            </div>
            <div className="ml-4">
              <h4 className="text-white font-medium mb-2">Create or Join a Contract</h4>
              <p className="text-gray-300">
                Create your own contract with custom terms or join an existing one that matches your interests.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">4</span>
            </div>
            <div className="ml-4">
              <h4 className="text-white font-medium mb-2">Vote on Terms</h4>
              <p className="text-gray-300">
                Participate in the democratic governance process by voting on contract terms.
              </p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-medium">5</span>
            </div>
            <div className="ml-4">
              <h4 className="text-white font-medium mb-2">Execute the Contract</h4>
              <p className="text-gray-300">
                Once terms are approved and all conditions are met, the contract is executed with full transparency.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Faq;
